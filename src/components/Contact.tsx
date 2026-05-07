"use client";

import { Reveal } from "./motion";

const channels = [
  {
    label: "Email",
    value: "nikhil.paruchuri@gmail.com",
    href: "mailto:nikhil.paruchuri@gmail.com",
  },
  {
    label: "LinkedIn",
    value: "in/nikhil-paruchuri",
    href: "https://www.linkedin.com/in/nikhil-paruchuri/",
    external: true,
  },
];

export function Contact() {
  return (
    <Reveal id="contact" className="scroll-mt-28 mt-24">
      <div className="rounded-3xl border border-border-strong bg-gradient-to-br from-background-elev/60 to-background p-8 md:p-10">
        <p className="eyebrow mb-4">Contact</p>
        <h2 className="font-serif text-3xl italic leading-tight text-foreground-strong md:text-4xl">
          Let&apos;s talk.
        </h2>
        <p className="mt-2 max-w-prose text-muted-strong">
          Recruiting, collaborating, or just want to argue about whether Drake&apos;s
          verse on <em>Jungle</em> holds up? My inbox is open.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-2 md:grid-cols-2">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.href}
              target={c.external ? "_blank" : undefined}
              rel={c.external ? "noopener noreferrer" : undefined}
              className="group flex items-center justify-between gap-3 rounded-xl border border-border bg-background/40 px-4 py-3 transition-colors hover:border-muted"
            >
              <div className="min-w-0">
                <p className="eyebrow">{c.label}</p>
                <p className="mt-0.5 truncate text-sm text-foreground-strong">
                  {c.value}
                </p>
              </div>
              <span className="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground-strong">
                ↗
              </span>
            </a>
          ))}
        </div>

        <p className="mt-8 flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-muted">
          <span suppressHydrationWarning>© {new Date().getFullYear()} Nikhil Paruchuri</span>
          <span>Built from scratch. No templates.</span>
        </p>
      </div>
    </Reveal>
  );
}
