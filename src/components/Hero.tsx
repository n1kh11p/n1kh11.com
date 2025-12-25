"use client";

import Image from "next/image";
import { Stagger, StaggerItem } from "./motion";

export function Hero() {
  return (
    <Stagger className="mb-20 text-center">
      <StaggerItem className="mb-6 flex justify-center">
        <Image
          src="/profile.jpg"
          alt="Nikhil Paruchuri"
          width={120}
          height={120}
          className="rounded-full object-cover aspect-square"
          priority
        />
      </StaggerItem>
      <StaggerItem>
        <h1 className="text-foreground-strong mb-3">
          Nikhil Paruchuri
        </h1>
      </StaggerItem>
      <StaggerItem>
        <p className="text-muted">
          Software engineer. Interested in anything product and infra.
        </p>
      </StaggerItem>
    </Stagger>
  );
}
