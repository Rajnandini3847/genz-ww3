"use client";

import { useState, useMemo } from "react";
import { bingoItems } from "@/lib/content";

function shuffleAndPick(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default function BattlefieldBingo() {
  const [cells, setCells] = useState<string[]>(() => {
    const picked = shuffleAndPick(bingoItems, 24);
    picked.splice(12, 0, "FREE: Existential Crisis");
    return picked;
  });
  const [marked, setMarked] = useState<Set<number>>(new Set([12]));

  const toggle = (i: number) => {
    setMarked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  const reset = () => {
    const picked = shuffleAndPick(bingoItems, 24);
    picked.splice(12, 0, "FREE: Existential Crisis");
    setCells(picked);
    setMarked(new Set([12]));
  };

  const hasBingo = useMemo(() => {
    // Check rows
    for (let r = 0; r < 5; r++) {
      let row = true;
      for (let c = 0; c < 5; c++) {
        if (!marked.has(r * 5 + c)) { row = false; break; }
      }
      if (row) return true;
    }
    // Check cols
    for (let c = 0; c < 5; c++) {
      let col = true;
      for (let r = 0; r < 5; r++) {
        if (!marked.has(r * 5 + c)) { col = false; break; }
      }
      if (col) return true;
    }
    // Diagonals
    if ([0, 6, 12, 18, 24].every((i) => marked.has(i))) return true;
    if ([4, 8, 12, 16, 20].every((i) => marked.has(i))) return true;
    return false;
  }, [marked]);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-yellow-500/20 bg-gradient-to-br from-gray-900 via-gray-900 to-yellow-950/30 p-6 md:p-8">
      <div className="absolute top-0 left-1/2 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl -translate-x-1/2" />
      <div className="relative">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black">
              Battlefield Bingo
            </h2>
            <p className="text-gray-400 text-sm">
              How many can you check off?
            </p>
          </div>
          {hasBingo && (
            <div className="px-4 py-1.5 rounded-full bg-yellow-500/20 border border-yellow-500 text-yellow-300 text-sm font-bold animate-bounce">
              BINGO! 🎉
            </div>
          )}
        </div>

        <div className="grid grid-cols-5 gap-1.5 md:gap-2">
          {cells.map((cell, i) => (
            <button
              key={`${cell}-${i}`}
              onClick={() => toggle(i)}
              className={`aspect-square rounded-lg p-1 md:p-2 text-[9px] md:text-[11px] leading-tight font-medium transition-all flex items-center justify-center text-center border ${
                marked.has(i)
                  ? "bg-yellow-500/30 border-yellow-500/60 text-yellow-200 scale-95"
                  : "bg-gray-800/60 border-gray-700/40 text-gray-300 hover:bg-gray-700/60"
              } ${i === 12 ? "bg-yellow-500/20 border-yellow-500/40" : ""}`}
            >
              {marked.has(i) && i !== 12 && (
                <span className="absolute text-lg opacity-30">✓</span>
              )}
              <span className="relative">{cell}</span>
            </button>
          ))}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={reset}
            className="px-5 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/40 text-yellow-300 text-sm font-semibold hover:bg-yellow-500/30 transition-colors"
          >
            🔄 New Card
          </button>
        </div>
      </div>
    </section>
  );
}
