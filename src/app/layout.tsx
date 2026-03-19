import type { Metadata } from "next";
import { Space_Grotesk, Space_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const spaceMono = Space_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "GenZ vs WW3 — The Unsolicited Survival Guide",
  description:
    "Real news, draft letter generator, WW3 character select, trench talk translator, and survival calculator. Gen Z processes World War 3 the only way they know how.",
  openGraph: {
    title: "GenZ vs WW3",
    description: "The generation that can't open a PDF is expected to fight a world war.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${spaceGrotesk.variable} ${spaceMono.variable} antialiased bg-[#030712] text-white noise`}
      >
        {children}
      </body>
    </html>
  );
}
