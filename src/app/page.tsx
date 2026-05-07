import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";
import { Nav } from "@/components/Nav";
import { CommandPalette } from "@/components/CommandPalette";

export default function Home() {
  return (
    <div id="top" className="relative min-h-screen bg-background">
      <Nav />
      <CommandPalette />
      <main className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-28 md:pt-36">
        <Hero />
        <Work />
        <Contact />
      </main>
    </div>
  );
}
