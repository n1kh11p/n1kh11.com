export async function onRequest(context) {
  const { env } = context;
  const client_id = env.SPOTIFY_CLIENT_ID;
  const client_secret = env.SPOTIFY_CLIENT_SECRET;
  const refresh_token = env.SPOTIFY_REFRESH_TOKEN;

  if (!client_id || !client_secret || !refresh_token) {
    return new Response(JSON.stringify({ error: "Missing env vars" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const basic = btoa(`${client_id}:${client_secret}`);
  const TOKEN_ENDPOINT = `https://accounts.spotify.com/api/token`;

  try {
    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basic}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token,
      }),
    });

    const tokenData = await response.json();
    const { access_token } = tokenData;

    // Fetch recently played tracks
    const RECENTLY_PLAYED_ENDPOINT = `https://api.spotify.com/v1/me/player/recently-played?limit=20`;
    const recentlyPlayedRes = await fetch(RECENTLY_PLAYED_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!recentlyPlayedRes.ok) {
      return new Response(JSON.stringify({ error: "Failed to fetch from Spotify" }), {
        status: recentlyPlayedRes.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const data = await recentlyPlayedRes.json();
    
    const tracks = data.items.map((item) => ({
      title: item.track.name,
      artist: item.track.artists.map((_artist) => _artist.name).join(", "),
      album: item.track.album.name,
      albumImageUrl: item.track.album.images[0]?.url,
      songUrl: item.track.external_urls.spotify,
      playedAt: item.played_at,
    }));

    return new Response(JSON.stringify({ tracks }), {
      headers: {
        "Content-Type": "application/json",
        // Cache for 60 seconds to avoid hitting rate limits
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=30",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
