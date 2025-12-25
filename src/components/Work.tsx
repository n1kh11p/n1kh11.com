"use client";

import Image from "next/image";
import { Reveal, AnimatedLink } from "./motion";

const experience = [
  {
    period: "June 2025 - Aug 2025",
    role: "Software Engineer Intern",
    company: "Capital One",
    note: "Full-stack product engineering for Small Businesses",
    logo: "/CapitalOne.png",
  },
  {
    period: "Jan 2024 - Dec 2024",
    role: "Student Researcher",
    company: "University of Maryland",
    note: "Distributed Earth system simulations utilizing HPC",
    logo: "/umd.png",
  },
  {
    period: "June 2024 - Aug 2024",
    role: "Software Development Engineer Intern",
    company: "Chipotle",
    note: "Product engineering on Chipotle.com, full-stack+infra",
    logo: "/chipotle.png",
  },
];

const projects = [
  {
    name: "Nimbus",
    description: "Modern day AI platform for educators",
  },
  {
    name: "EzSplit",
    description: "Easy way to split bills with friends",
  },
  {
    name: "Rentli",
    description: "Peer-to-peer rental marketplace",
  },
];

export function Work() {
  return (
    <section className="mb-20 space-y-12">
      <Reveal className="text-center">
        <p className="text-muted text-xs uppercase tracking-wide mb-4">About</p>
        <p className="text-foreground leading-relaxed mb-3">
          Hi, I&apos;m Nikhil! I&apos;m a junior studying computer science at the University of Maryland interested in scalable systems, backend infra, and parallelized hpc. Outside of computer science, I&apos;m an avid fan of basketball, RnB/hiphop, running, and poetry.
        </p>
        <p className="text-muted text-sm">
          <span className="text-foreground">Nikhil&apos;s Picks</span>
          <br />
          Python, LA Lakers, Go, Drake, TypeScript, Robert Frost, Rust
          <br />
          JSN, Kubernetes, Gunna, distributed databases, A. H. Jerriod Avant
        </p>
      </Reveal>

      <Reveal>
        <p className="text-muted text-xs uppercase tracking-wide mb-6 text-center">Experience</p>
        <div className="space-y-6">
          {experience.map((exp) => (
            <div key={exp.company + exp.period} className="flex flex-col items-center text-center">
              {exp.logo && (
                <Image
                  src={exp.logo}
                  alt={exp.company}
                  width={56}
                  height={56}
                  className={`mb-3 object-contain ${exp.company === "Capital One" ? "rounded-full" : ""}`}
                />
              )}
              <span className="text-foreground">{exp.role}</span>
              <span className="text-muted">{exp.company}</span>
              <p className="text-muted text-sm mt-1">{exp.note}</p>
              <p className="text-muted text-xs">{exp.period}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal className="text-center">
        <p className="text-muted text-xs uppercase tracking-wide mb-4">Education</p>
        <Image
          src="/umd.png"
          alt="University of Maryland"
          width={56}
          height={56}
          className="mb-3 object-contain mx-auto"
        />
        <p className="text-foreground text-sm">University of Maryland</p>
        <p className="text-muted text-xs">Aug 2023 — May 2027</p>
        <p className="text-muted text-sm mt-2">
          B.S. Computer Science, Minor in Creative Writing
        </p>
        <p className="text-muted text-xs mt-4">
          <span className="text-foreground">Nikhil&apos;s Picks 2.0</span>
          <br />
          Parallel Computing, Advanced Poetry Workshop 
          <br />
          Great Thinkers on Public Policy, Computer Systems
          <br />
          Foundations of Programming Languages, Computer and Network Security
        </p>
      </Reveal>

      <Reveal className="text-center">
        <p className="text-muted text-xs uppercase tracking-wide mb-8">Nikhil&apos;s Picks 3.0</p>
        
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
          <div className="flex flex-col items-center space-y-1">
            <AnimatedLink href="/spotify" className="text-muted hover:text-foreground-strong">
              Spotify
            </AnimatedLink>
            <p className="text-muted text-xs opacity-50">My recent listening history</p>
          </div>
          
          <div className="flex flex-col items-center space-y-1">
            <AnimatedLink href="/goodreads" className="text-muted hover:text-foreground-strong">
              Good Reads
            </AnimatedLink>
            <p className="text-muted text-xs opacity-50">Literature that intrigues me</p>
          </div>
        </div>
      </Reveal>

      <Reveal>
        <p className="text-muted text-xs uppercase tracking-wide mb-4 text-center">Projects</p>
        <div className="space-y-2 text-sm text-center">
          {projects.map((project) => (
            <div key={project.name}>
              <span className="text-foreground">{project.name}</span>
              <span className="text-muted"> — {project.description}</span>
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
