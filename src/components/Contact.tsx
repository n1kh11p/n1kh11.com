"use client";

import { Reveal, AnimatedLink } from "./motion";

export function Contact() {
  return (
    <Reveal className="text-center">
      <p className="text-muted text-xs uppercase tracking-wide mb-4">Contact</p>
      <div className="space-y-1 text-sm flex flex-col items-center">
        <AnimatedLink href="mailto:nikhil.paruchuri@gmail.com" className="text-muted hover:text-foreground-strong">
          email
        </AnimatedLink>
        <AnimatedLink href="https://www.linkedin.com/in/nikhil-paruchuri/" external className="text-muted hover:text-foreground-strong">
          linkedin
        </AnimatedLink>
      </div>
    </Reveal>
  );
}
