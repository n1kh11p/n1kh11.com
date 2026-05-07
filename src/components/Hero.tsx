"use client";

import Image from "next/image";
import { Stagger, StaggerItem } from "./motion";
import { NowPlaying } from "./NowPlaying";

export function Hero() {
  return (
    <Stagger className="mb-24 md:mb-32">
      <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:gap-10">
        <StaggerItem className="relative">
          <div className="absolute -inset-3 -z-10 rounded-full bg-gradient-to-br from-white/[0.06] via-transparent to-transparent blur-xl" />
          <Image
            src="/profile.jpg"
            alt="Nikhil Paruchuri"
            width={112}
            height={112}
            className="aspect-square rounded-full object-cover ring-1 ring-border-strong"
            priority
          />
        </StaggerItem>

        <div className="flex-1 space-y-4">
          <StaggerItem>
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background-elev/60 px-2.5 py-1 text-[11px] font-mono tracking-tight text-muted-strong backdrop-blur-sm">
              <span className="status-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span>
                <span className="text-muted">next up</span>
                <span className="mx-1.5 text-muted/50">·</span>
                <span className="text-foreground-strong">SWE Intern @ LinkedIn</span>
              </span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-tight text-foreground-strong md:text-6xl">
              Nikhil Paruchuri<span className="text-muted">.</span>
            </h1>
          </StaggerItem>

          <StaggerItem className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="https://www.linkedin.com/in/nikhil-paruchuri/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground-strong px-4 py-2 text-sm text-background transition-opacity hover:opacity-90"
            >
              LinkedIn
              <svg width="11" height="11" viewBox="0 0 10 10" fill="none" className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px">
                <path d="M2 8L8 2M8 2H3M8 2V7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <a
              href="mailto:nikhil.paruchuri@gmail.com"
              className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-4 py-2 text-sm text-foreground transition-colors hover:border-muted hover:text-foreground-strong"
            >
              Get in touch
            </a>
            <span className="hidden text-muted/40 sm:inline">·</span>
            <span className="hidden text-xs text-muted sm:inline">or press <kbd className="rounded border border-border-strong bg-background-elev px-1.5 py-0.5 font-mono text-[10px]">⌘ K</kbd></span>
          </StaggerItem>

          <StaggerItem className="pt-2">
            <NowPlaying />
          </StaggerItem>
        </div>
      </div>
    </Stagger>
  );
}
