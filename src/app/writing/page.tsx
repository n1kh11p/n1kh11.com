"use client";

import { useState } from "react";
import Link from "next/link";
import { Stagger, StaggerItem, Reveal } from "@/components/motion";

type Piece = {
  title: string;
  kind: "poem" | "prose";
  date: string;
  body: string[]; // paragraphs / stanzas (use "" for stanza break)
  note?: string;
};

const pieces: Piece[] = [
  {
    title: "Instructions for Growing Something That Wants to Live",
    kind: "poem",
    date: "Winter 2025",
    body: [
      "Planting Contents:",
      "Fifteen ground brown seeds, visually dainty to see",
      "Enough for a singular, certainly uncertain season.",
      "",
      "Planting Requisites:",
      "A soil that forgives mistakes brings about the best harvest",
      "Loam works too",
      "So does Memory, if treated with care",
      "",
      "Planting Directions:",
      "Press each seed one knuckle deep.",
      "Any deeper and they forget the way they came.",
      "Any shallower and",
      "they dry into little husks of what-could've-been.",
      "Water lightly, till the thirst of dirt is fulfilled.",
      "Then stop, and start again,",
      "only finishing when the ground asks.",
      "Remember, drowning feels no kinder in a garden",
      "than anywhere else on the planet.",
      "Provide sunlight in regular-sized meals.",
      "Too much burns the fledgling tea green leaves.",
      "Too little and they grow too beyond,",
      "growing thin, and anticipating",
      "Yearning for a warmth that never arrives.",
      "Fertilize sparingly.",
      "Excess nitrogen scorches the roots.",
      "Just as excess expectation scorches the soul.",
      "Growth needs space and time, and distant pressure.",
      "Avoid pesticides unless it's too far gone.",
      "They attack indiscriminately, whether that's a threat",
      "Or a foreign blessing hiding in plain sight.",
      "",
      "Planting Maintenance:",
      "Check for wilt, overgrowth, and nutrition.",
      "But most important of all,",
      "Check for the quiet ways a plant will tell you",
      "That you've done too much",
      "Or not quite enough.",
      "Or maybe just the right amount",
      "",
      "Planting Harvest:",
      "If all instructions were followed",
      "In a balanced way of affection,",
      "You may see green in your garden.",
      "Not a miracle and not perfection.",
      "But proof that care, when applied properly,",
      "can coax anything to grow towards light.",
    ],
  },
  {
    title: "Grandfather",
    kind: "poem",
    date: "Fall 2025",
    body: [
      "His voice travels through the heavy, arid corridors",
      "The old house raising its fading voice",
      "తాతయ్య clears dust from his throat",
      "\u201CRemember గుడివాడ\u201D",
      "He rasps as I reminisce on our glory days of old",
      "",
      "ఒకప్పుడు, he carried me",
      "His courtyard was vast and ripe",
      "with mango, bananas, and creepers decorating a lively home",
      "His ceiling was shoulders",
      "supportive of my lineage since long ago",
      "",
      "The beige marble walls were littered with memories",
      "Some black and white and some color photos",
      "While the pink walls of my thatha\u2019s room",
      "Protecting clothes, jewelry, records, and memories",
      "Some brand new and some antiquated",
      "Yet all were alive and well",
      "",
      "Now his remains are fevered, smoldering",
      "Like the cigarettes, we told him to stop smoking",
      "His stone skin, formerly smooth and cool",
      "Peels beneath the beating Andhra sun",
      "The smooth asphalt road that was his backbone",
      "Now a crooked gravel mess, decaying and old",
      "",
      "Inside his heart fades, desperately pumping life",
      "The rooms where my family\u2019s voice reverberated sag like tired lungs",
      "The kitchen once filled with పండు, కూరగాయల, and వాసన",
      "Now reek of mildew and pests",
      "The prayer room, formerly adorned with దీపం and విగ్రహాలు",
      "Has a coat of ash as its only decoration",
      "",
      "My tears flood my home that is no more",
      "As I offer comfort when there isn\u2019t a need for more",
      "Yet he still calls,",
      "Remaining steadfast as the walls of his bones",
      "Decay on the floor",
      "Don\u2019t forget your roots and what was",
      "And in your soul know",
      "\u201Cగుడివాడ will always be home.\u201D",
    ],
  },
];

const PREVIEW_THRESHOLD = 12;

function Piece({ piece, index }: { piece: Piece; index: number }) {
  const isPoem = piece.kind === "poem";
  const isLong = piece.body.length > PREVIEW_THRESHOLD;
  const [expanded, setExpanded] = useState(!isLong);

  const firstBreak = piece.body.indexOf("");
  const previewLines =
    isLong && !expanded
      ? piece.body.slice(0, firstBreak > 0 ? firstBreak : PREVIEW_THRESHOLD)
      : piece.body;

  return (
    <Reveal className="group relative">
      <div className="grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-10">
        <div className="pt-2">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            {String(index + 1).padStart(2, "0")}
          </p>
        </div>
        <article>
          <header className="mb-6">
            <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
              {piece.kind} · {piece.date}
            </p>
            <h2 className="mt-1 font-serif text-3xl italic leading-tight text-foreground-strong md:text-4xl">
              {piece.title}
            </h2>
            {piece.note && (
              <p className="mt-2 text-xs text-muted">{piece.note}</p>
            )}
          </header>

          <div className="relative">
            {isPoem ? (
              <div className="font-serif text-lg leading-[1.7] text-foreground md:text-xl">
                {previewLines.map((line, i) =>
                  line === "" ? (
                    <div key={i} className="h-4" aria-hidden />
                  ) : (
                    <p key={i}>{line}</p>
                  )
                )}
              </div>
            ) : (
              <div className="space-y-4 font-serif text-base leading-[1.8] text-foreground md:text-lg">
                {previewLines.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}

            {isLong && !expanded && (
              <div className="relative mt-2">
                <div className="pointer-events-none absolute -top-16 left-0 right-0 h-16 bg-gradient-to-t from-background to-transparent" />
                <button
                  onClick={() => setExpanded(true)}
                  className="font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground-strong"
                >
                  Read more ↓
                </button>
              </div>
            )}

            {isLong && expanded && (
              <button
                onClick={() => setExpanded(false)}
                className="mt-4 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:text-foreground-strong"
              >
                Show less ↑
              </button>
            )}
          </div>
        </article>
      </div>
    </Reveal>
  );
}

export default function WritingPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <main className="relative z-10 mx-auto max-w-2xl px-6 py-20 md:py-28">
        <Stagger className="mb-16">
          <StaggerItem>
            <Link
              href="/"
              className="group inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-muted transition-colors hover:text-foreground-strong"
            >
              <span className="transition-transform group-hover:-translate-x-0.5">←</span>
              Back
            </Link>
          </StaggerItem>
          <StaggerItem>
            <p className="eyebrow mt-12">Writing</p>
          </StaggerItem>
          <StaggerItem>
            <h1 className="mt-3 font-serif text-5xl italic leading-[1.05] text-foreground-strong md:text-6xl">
              My Collection.
            </h1>
          </StaggerItem>
          <StaggerItem>
            <p className="mt-4 max-w-prose text-muted-strong">
              Some of my writing I&apos;ve shared.
              Nothing here is perfect; everything here is honest.
            </p>
          </StaggerItem>
        </Stagger>

        <div className="space-y-20">
          {pieces.map((p, i) => (
            <Piece key={p.title} piece={p} index={i} />
          ))}
        </div>

        <Reveal className="mt-24 border-t border-border pt-8">
          <p className="font-mono text-[11px] uppercase tracking-wider text-muted">
            More coming as I finish them. If something here lands, I&apos;d love to hear it —{" "}
            <a
              href="mailto:nikhil.paruchuri@gmail.com"
              className="text-foreground hover:text-foreground-strong"
            >
              nikhil.paruchuri@gmail.com
            </a>
            .
          </p>
        </Reveal>
      </main>
    </div>
  );
}
