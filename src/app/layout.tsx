import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GenZ vs WW3 — The Ultimate Survival Guide",
  description:
    "Draft excuse generator, WW3 fit check, battlefield bingo, and more. Gen Z copes with WW3 the only way they know how.",
  openGraph: {
    title: "GenZ vs WW3 — The Ultimate Survival Guide",
    description:
      "Draft excuses, combat couture, battlefield bingo. Gen Z is NOT getting drafted.",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white noise`}
      >
        {children}
      </body>
    </html>
  );
}
