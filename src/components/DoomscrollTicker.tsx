"use client";

import { tickerHeadlines } from "@/lib/content";

export default function DoomscrollTicker() {
  // Double the headlines for seamless loop
  const doubled = [...tickerHeadlines, ...tickerHeadlines];

  return (
    <div className="w-full overflow-hidden bg-red-950/40 border-y border-red-500/20 py-2">
      <div className="flex animate-scroll whitespace-nowrap">
        {doubled.map((headline, i) => (
          <span key={i} className="inline-flex items-center mx-6 text-sm">
            <span className="text-red-400 font-bold mr-2 text-xs px-1.5 py-0.5 bg-red-500/20 rounded">
              LIVE
            </span>
            <span className="text-gray-300">{headline}</span>
            <span className="mx-6 text-red-500/40">|</span>
          </span>
        ))}
      </div>
    </div>
  );
}
