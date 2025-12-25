import { Hero } from "@/components/Hero";
import { Work } from "@/components/Work";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-xl mx-auto px-6 py-24 md:py-32">
        <Hero />
        <Work />
        <Contact />
      </main>
    </div>
  );
}
