"use client";

import { tickerHeadlines } from "@/lib/content";

export default function DoomscrollTicker() {
  const doubled = [...tickerHeadlines, ...tickerHeadlines];

  return (
    <div className="w-full overflow-hidden bg-black border-y-2 border-red-600 py-1.5">
      <div className="flex animate-scroll whitespace-nowrap">
        {doubled.map((headline, i) => (
          <span key={i} className="inline-flex items-center mx-6 text-xs font-mono">
            <span className="text-red-500 font-black mr-2 text-[10px] px-1 py-0.5 border border-red-500">
              BREAKING
            </span>
            <span className="text-gray-300">{headline}</span>
            <span className="mx-6 text-red-900">///</span>
          </span>
        ))}
      </div>
    </div>
  );
}
