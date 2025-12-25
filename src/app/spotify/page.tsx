"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Stagger, StaggerItem, AnimatedLink } from "@/components/motion";

interface Track {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
}

function formatTimeAgo(dateString: string) {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function SpotifyPage() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await fetch("/api/spotify-history");
        if (res.ok) {
          const data = await res.json();
          setTracks(data.tracks || []);
        }
      } catch (error) {
        console.error("Failed to load spotify history", error);
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-xl mx-auto px-6 py-24 md:py-32">
        <Stagger className="mb-12 text-center">
          <StaggerItem>
            <AnimatedLink href="/" className="text-muted text-xs uppercase tracking-wide mb-8 hover:text-foreground transition-colors">
              ← Back
            </AnimatedLink>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-foreground text-xl mb-2 mt-8">Recent Listening</h1>
            <p className="text-muted text-sm">A look at what I&apos;ve been jamming to.</p>
          </StaggerItem>
        </Stagger>

        {loading ? (
          <div className="flex justify-center py-12">
            <div className="w-6 h-6 border-2 border-muted border-t-foreground rounded-full animate-spin" />
          </div>
        ) : (
          <Stagger className="space-y-6">
            {tracks.map((track, i) => (
              <StaggerItem key={track.playedAt + i}>
                <a 
                  href={track.songUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group p-2 -mx-2 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <div className="relative w-12 h-12 flex-shrink-0 bg-muted/20 rounded-md overflow-hidden">
                    {track.albumImageUrl && (
                      <Image
                        src={track.albumImageUrl}
                        alt={track.album}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground text-sm font-medium truncate group-hover:text-foreground-strong transition-colors">
                      {track.title}
                    </p>
                    <p className="text-muted text-xs truncate">
                      {track.artist}
                    </p>
                  </div>
                  <div className="text-muted/50 text-xs whitespace-nowrap">
                    {formatTimeAgo(track.playedAt)}
                  </div>
                </a>
              </StaggerItem>
            ))}
          </Stagger>
        )}
      </main>
    </div>
  );
}
