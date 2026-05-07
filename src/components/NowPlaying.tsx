"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

interface Track {
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
  playedAt: string;
}

export function NowPlaying() {
  const [track, setTrack] = useState<Track | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchTrack() {
      try {
        const res = await fetch("/api/spotify-history");
        if (!res.ok) return;
        const data = await res.json();
        if (!cancelled && data.tracks?.[0]) setTrack(data.tracks[0]);
      } catch {
        /* fail silently */
      }
    }
    fetchTrack();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <AnimatePresence>
      {track && (
        <motion.a
          key={track.songUrl}
          href={track.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.4 }}
          className="group inline-flex max-w-full items-center gap-3 rounded-full border border-border-strong bg-background-elev/60 px-3 py-2 text-xs backdrop-blur-sm transition-colors hover:border-muted hover:bg-background-elev"
        >
          <span className="relative flex h-8 w-8 flex-shrink-0 items-center justify-center">
            <Image
              src={track.albumImageUrl}
              alt={track.album}
              width={32}
              height={32}
              className="h-8 w-8 rounded-md object-cover"
            />
            <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
          </span>
          <span className="flex min-w-0 items-center gap-1.5 font-mono text-xs tracking-tight">
            <span className="text-muted">recently playing</span>
            <span className="text-muted-strong">·</span>
            <span className="truncate text-foreground-strong">
              {track.title} — {track.artist}
            </span>
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
}
