"use client";

import { useState, useCallback } from "react";
import { draftExcuses } from "@/lib/content";

export default function DraftExcuseGenerator() {
  const [excuse, setExcuse] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);

  const spin = useCallback(() => {
    if (isSpinning) return;
    setIsSpinning(true);
    setRotation((r) => r + 720 + Math.random() * 720);

    const cycles = 8 + Math.floor(Math.random() * 10);
    let count = 0;
    const interval = setInterval(() => {
      setExcuse(draftExcuses[Math.floor(Math.random() * draftExcuses.length)]);
      count++;
      if (count >= cycles) {
        clearInterval(interval);
        const final =
          draftExcuses[Math.floor(Math.random() * draftExcuses.length)];
        setExcuse(final);
        setIsSpinning(false);
      }
    }, 100);
  }, [isSpinning]);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-pink-500/20 bg-gradient-to-br from-gray-900 via-gray-900 to-pink-950/30 p-6 md:p-8">
      <div className="absolute top-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-black mb-1">
          Draft Excuse Generator
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Uncle Sam wants YOU but you have plans
        </p>

        <div className="flex flex-col items-center gap-6">
          <button
            onClick={spin}
            disabled={isSpinning}
            className="group relative"
          >
            <div
              className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-pink-500/25 transition-transform duration-1000 ease-out"
              style={{ transform: `rotate(${rotation}deg)` }}
            >
              <span className="text-4xl md:text-5xl">🎰</span>
            </div>
            <div className="absolute inset-0 rounded-full bg-white/0 group-hover:bg-white/5 transition-colors" />
          </button>

          <div
            className={`min-h-[80px] flex items-center justify-center text-center px-4 transition-all duration-300 ${
              isSpinning ? "scale-95 opacity-70" : "scale-100 opacity-100"
            }`}
          >
            {excuse ? (
              <p className="text-xl md:text-2xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                &ldquo;{excuse}&rdquo;
              </p>
            ) : (
              <p className="text-gray-500 text-lg">
                Tap the wheel to generate your excuse
              </p>
            )}
          </div>

          <button
            onClick={spin}
            disabled={isSpinning}
            className="px-6 py-2.5 rounded-full bg-pink-500/20 border border-pink-500/40 text-pink-300 text-sm font-semibold hover:bg-pink-500/30 transition-colors disabled:opacity-50"
          >
            {isSpinning ? "Generating..." : "🎲 Spin Again"}
          </button>
        </div>
      </div>
    </section>
  );
}
