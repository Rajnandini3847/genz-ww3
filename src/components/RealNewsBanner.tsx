"use client";

import { realNews } from "@/lib/content";
import { useTheme } from "@/lib/ThemeContext";

export default function RealNewsBanner() {
  const { isMil } = useTheme();

  if (isMil) {
    return (
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {realNews.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3 border border-[#dfe1e2] hover:border-[#005ea2] bg-[#f0f0f0] rounded transition-colors"
            >
              <p className="text-sm font-semibold text-[#1b1b1b] group-hover:text-[#005ea2] leading-snug">
                {item.headline}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[10px] text-[#71767a]">{item.source}</span>
                <span className="text-[#dfe1e2]">|</span>
                <span className="text-[10px] text-[#71767a]">{item.date}</span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-[10px] text-[#71767a] mt-3 text-center italic">
          Intelligence sourced from open media. Classification: UNCLASSIFIED // SATIRE
        </p>
      </div>
    );
  }

  return (
    <section className="border-b-4 border-black bg-[#0a0a0a]">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="px-2 py-1 bg-red-600 text-white text-xs font-black uppercase tracking-wider">
            LIVE
          </span>
          <span className="text-xs text-gray-400 uppercase tracking-widest font-mono">
            What&apos;s actually happening — Day 19 of US-Israel strikes on Iran
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {realNews.map((item, i) => (
            <a
              key={i}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-3 bg-gray-900 border-2 border-gray-800 hover:border-red-500/50 transition-colors"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-gray-200 group-hover:text-white leading-snug line-clamp-2">
                  {item.headline}
                </p>
                <svg className="w-3 h-3 mt-1 flex-shrink-0 text-gray-600 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-[10px] font-mono text-gray-500">{item.source}</span>
                <span className="text-gray-700">|</span>
                <span className="text-[10px] font-mono text-gray-600">{item.date}</span>
              </div>
            </a>
          ))}
        </div>
        <p className="text-[10px] text-gray-600 mt-3 text-center">
          This is real. The memes below are how we cope.
        </p>
      </div>
    </section>
  );
}
