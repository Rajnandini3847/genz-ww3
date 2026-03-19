"use client";

import { useState } from "react";

export default function GovBanner() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#f0f0f0] border-b border-[#dfe1e2]">
      <div className="max-w-5xl mx-auto px-4 py-1.5">
        <div className="flex items-center gap-2 text-[12px]">
          <svg width="16" height="11" viewBox="0 0 16 11" fill="none" className="flex-shrink-0">
            <rect width="16" height="11" fill="#002868" />
            <rect y="0" width="16" height="0.85" fill="#BF0A30" />
            <rect y="1.7" width="16" height="0.85" fill="#BF0A30" />
            <rect y="3.4" width="16" height="0.85" fill="#BF0A30" />
            <rect y="5.1" width="16" height="0.85" fill="#BF0A30" />
            <rect y="6.8" width="16" height="0.85" fill="#BF0A30" />
            <rect y="8.5" width="16" height="0.85" fill="#BF0A30" />
            <rect y="10.15" width="16" height="0.85" fill="#BF0A30" />
            <rect width="6.5" height="5.1" fill="#002868" />
          </svg>
          <span className="text-[#1b1b1b]">
            An official website of the United States government
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-[#005ea2] underline ml-1 hover:text-[#1a4480]"
          >
            Here&apos;s how you know
          </button>
        </div>
        {expanded && (
          <div className="mt-2 pb-2 text-[11px] text-[#71767a] grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex gap-2">
              <span className="text-lg">🏛️</span>
              <div>
                <strong className="text-[#1b1b1b] block">Official websites use .gov</strong>
                A .gov website belongs to an official government organization
                in the United States. (This one doesn&apos;t. This is satire.)
              </div>
            </div>
            <div className="flex gap-2">
              <span className="text-lg">🔒</span>
              <div>
                <strong className="text-[#1b1b1b] block">Secure .gov websites use HTTPS</strong>
                A lock or https:// means you&apos;ve safely connected.
                (We use HTTPS too. The content is still unhinged.)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
