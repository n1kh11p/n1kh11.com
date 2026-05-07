import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nikhil Paruchuri — Software Engineer",
  description:
    "CS @ Maryland. Incoming SWE at Microsoft & LinkedIn. Previously Capital One, Chipotle, UMD HPC research. Writing poetry on the side.",
  openGraph: {
    title: "Nikhil Paruchuri",
    description:
      "Software engineer interested in product, infra, and parallel systems. Writing poetry on the side.",
    type: "website",
    url: "https://n1kh11.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nikhil Paruchuri",
    description: "Software engineer. Product + infra. Writing poetry on the side.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground grain`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
