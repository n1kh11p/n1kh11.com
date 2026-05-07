"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Cmd = {
  id: string;
  label: string;
  hint?: string;
  group: "Go" | "Open" | "Contact" | "Fun";
  icon: string;
  keywords?: string[];
  run: () => void;
};

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const goto = (hash: string) => {
    const el = document.querySelector(hash);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const commands: Cmd[] = useMemo(
    () => [
      { id: "work", label: "Go to Work", group: "Go", icon: "→", keywords: ["experience", "jobs"], run: () => goto("#work") },
      { id: "projects", label: "Go to Projects", group: "Go", icon: "→", keywords: ["build"], run: () => goto("#projects") },
      { id: "writing", label: "Go to Writing", group: "Go", icon: "→", keywords: ["poetry", "poems", "prose"], run: () => goto("#writing") },
      { id: "contact", label: "Go to Contact", group: "Go", icon: "→", run: () => goto("#contact") },
      { id: "top", label: "Back to top", group: "Go", icon: "↑", run: () => window.scrollTo({ top: 0, behavior: "smooth" }) },

      { id: "linkedin-open", label: "Open LinkedIn", group: "Open", icon: "↗", hint: "new tab", keywords: ["resume", "cv", "profile"], run: () => window.open("https://www.linkedin.com/in/nikhil-paruchuri/", "_blank") },
      { id: "spotify", label: "Recent Spotify plays", group: "Open", icon: "↗", keywords: ["music", "listening"], run: () => (window.location.href = "/spotify") },
      { id: "poems", label: "Read poems & prose", group: "Open", icon: "↗", keywords: ["writing"], run: () => (window.location.href = "/writing") },

      { id: "email", label: "Copy email", group: "Contact", icon: "⎘", hint: "nikhil.paruchuri@gmail.com", run: async () => { await navigator.clipboard.writeText("nikhil.paruchuri@gmail.com"); } },
      { id: "mailto", label: "Email me", group: "Contact", icon: "✉", run: () => (window.location.href = "mailto:nikhil.paruchuri@gmail.com") },
      { id: "linkedin", label: "LinkedIn", group: "Contact", icon: "↗", run: () => window.open("https://www.linkedin.com/in/nikhil-paruchuri/", "_blank") },

      { id: "lakers", label: "Go Lakers", group: "Fun", icon: "🏀", hint: "purple & gold", run: () => {
        const root = document.documentElement;
        root.animate(
          [
            { filter: "hue-rotate(0deg)" },
            { filter: "hue-rotate(280deg)" },
            { filter: "hue-rotate(0deg)" },
          ],
          { duration: 1400, easing: "ease-in-out" }
        );
      } },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => {
      const hay = [c.label, c.hint, c.group, ...(c.keywords ?? [])].join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [commands, query]);

  // Group filtered by group
  const grouped = useMemo(() => {
    const map = new Map<string, Cmd[]>();
    filtered.forEach((c) => {
      const arr = map.get(c.group) ?? [];
      arr.push(c);
      map.set(c.group, arr);
    });
    return Array.from(map.entries());
  }, [filtered]);

  const openPalette = () => {
    setQuery("");
    setCursor(0);
    setOpen(true);
    setTimeout(() => inputRef.current?.focus(), 50);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) setOpen(false);
        else openPalette();
      }
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(c + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(c - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const cmd = filtered[cursor];
      if (cmd) {
        cmd.run();
        setOpen(false);
      }
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="palette"
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.div
            initial={{ y: -8, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-border-strong bg-background-elev/95 shadow-2xl shadow-black/50 backdrop-blur-xl"
            role="dialog"
            aria-modal="true"
          >
            <div className="flex items-center gap-3 border-b border-border px-4 py-3">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-muted">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.6" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setCursor(0);
                }}
                onKeyDown={onKeyDown}
                placeholder="Type a command, or try 'linkedin'…"
                className="flex-1 bg-transparent text-sm text-foreground-strong placeholder:text-muted focus:outline-none"
              />
              <kbd className="rounded border border-border-strong bg-background px-1.5 py-0.5 font-mono text-[10px] text-muted">
                esc
              </kbd>
            </div>

            <div ref={listRef} className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length === 0 ? (
                <p className="px-4 py-10 text-center text-sm text-muted">
                  Nothing matches. Try &ldquo;poems&rdquo; or &ldquo;linkedin&rdquo;.
                </p>
              ) : (
                grouped.map(([group, cmds]) => (
                  <div key={group} className="mb-1.5">
                    <p className="px-3 pb-1 pt-2 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {group}
                    </p>
                    {cmds.map((c) => {
                      const idx = filtered.indexOf(c);
                      const isActive = idx === cursor;
                      return (
                        <button
                          key={c.id}
                          onMouseEnter={() => setCursor(idx)}
                          onClick={() => {
                            c.run();
                            setOpen(false);
                          }}
                          className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition-colors ${
                            isActive
                              ? "bg-white/[0.06] text-foreground-strong"
                              : "text-foreground"
                          }`}
                        >
                          <span className="flex h-5 w-5 items-center justify-center text-muted">
                            {c.icon}
                          </span>
                          <span className="flex-1">{c.label}</span>
                          {c.hint && (
                            <span className="font-mono text-[11px] text-muted">
                              {c.hint}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            <div className="flex items-center justify-between border-t border-border bg-background/50 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-muted">
              <span className="flex items-center gap-3">
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border-strong bg-background px-1 py-0.5">↑</kbd>
                  <kbd className="rounded border border-border-strong bg-background px-1 py-0.5">↓</kbd>
                  navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-border-strong bg-background px-1 py-0.5">↵</kbd>
                  run
                </span>
              </span>
              <span>⌘ K</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
