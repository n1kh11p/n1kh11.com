"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#writing", label: "Beyond" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = links.map((l) => l.href.slice(1));
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const o = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { rootMargin: "-40% 0px -55% 0px", threshold: 0 }
      );
      o.observe(el);
      observers.push(o);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 inset-x-0 z-50 flex justify-center px-4 pt-4"
    >
      <AnimatePresence>
        <motion.nav
          className={`flex items-center gap-1 rounded-full border px-1.5 py-1.5 text-sm backdrop-blur-md transition-colors ${
            scrolled
              ? "border-border-strong bg-background/70 shadow-[0_1px_0_0_rgba(255,255,255,0.04)_inset]"
              : "border-transparent bg-transparent"
          }`}
        >
          <a
            href="#top"
            className="px-3 py-1 font-serif text-base text-foreground-strong italic"
          >
            n.
          </a>
          <span className="mx-1 hidden h-4 w-px bg-border-strong sm:block" />
          <ul className="hidden items-center gap-0.5 sm:flex">
            {links.map((l) => {
              const isActive = active === l.href.slice(1);
              return (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={`relative rounded-full px-3 py-1 transition-colors ${
                      isActive
                        ? "text-foreground-strong"
                        : "text-muted hover:text-foreground"
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-full bg-white/5"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative">{l.label}</span>
                  </a>
                </li>
              );
            })}
          </ul>
          <span className="mx-1 hidden h-4 w-px bg-border-strong sm:block" />
          <a
            href="https://www.linkedin.com/in/nikhil-paruchuri/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1.5 rounded-full bg-foreground-strong px-3 py-1 text-background transition-opacity hover:opacity-90"
          >
            LinkedIn
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px"
            >
              <path
                d="M2 8L8 2M8 2H3M8 2V7"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.nav>
      </AnimatePresence>
    </motion.header>
  );
}
