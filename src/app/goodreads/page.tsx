"use client";

import { Stagger, StaggerItem, AnimatedLink } from "@/components/motion";

export default function GoodreadsPage() {
  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-xl mx-auto px-6 py-24 md:py-32">
        <Stagger className="mb-12 text-center">
          <StaggerItem>
            <AnimatedLink href="/" className="text-muted text-xs uppercase tracking-wide mb-8 hover:text-foreground transition-colors">
              ← Back
            </AnimatedLink>
          </StaggerItem>
          
          <StaggerItem>
            <h1 className="text-foreground text-xl mb-2 mt-8">Good Reads</h1>
            <p className="text-muted text-sm">Books and articles that have shaped my thinking.</p>
          </StaggerItem>
        </Stagger>

        <Stagger className="space-y-6 text-center">
          <StaggerItem>
            <p className="text-muted text-sm">Coming soon...</p>
          </StaggerItem>
        </Stagger>
      </main>
    </div>
  );
}
