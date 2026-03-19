"use client";

import { useState, useCallback } from "react";
import { outfitPieces } from "@/lib/content";

type SlotKey = keyof typeof outfitPieces;
const slots: SlotKey[] = ["head", "top", "bottom", "feet", "accessory"];
const slotLabels: Record<SlotKey, string> = {
  head: "Headgear",
  top: "Top",
  bottom: "Bottom",
  feet: "Footwear",
  accessory: "Accessory",
};

export default function FitCheck() {
  const [selected, setSelected] = useState<Record<SlotKey, number>>({
    head: 0,
    top: 0,
    bottom: 0,
    feet: 0,
    accessory: 0,
  });

  const randomize = useCallback(() => {
    const newSelection: Record<string, number> = {};
    for (const slot of slots) {
      newSelection[slot] = Math.floor(
        Math.random() * outfitPieces[slot].length
      );
    }
    setSelected(newSelection as Record<SlotKey, number>);
  }, []);

  const cycle = (slot: SlotKey, dir: number) => {
    setSelected((prev) => ({
      ...prev,
      [slot]:
        (prev[slot] + dir + outfitPieces[slot].length) %
        outfitPieces[slot].length,
    }));
  };

  const totalVibe = slots.reduce((sum, slot) => {
    const piece = outfitPieces[slot][selected[slot]];
    const match = piece.vibe.match(/\+(\d+)/);
    return sum + (match ? parseInt(match[1]) : 0);
  }, 0);

  return (
    <section className="relative overflow-hidden rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-gray-900 via-gray-900 to-cyan-950/30 p-6 md:p-8">
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-black mb-1">
          WW3 Fit Check
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Build your combat couture look
        </p>

        <div className="space-y-3">
          {slots.map((slot) => {
            const piece = outfitPieces[slot][selected[slot]];
            return (
              <div
                key={slot}
                className="flex items-center gap-3 bg-gray-800/50 rounded-xl p-3 border border-gray-700/50"
              >
                <span className="text-2xl w-10 text-center">{piece.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-[10px] uppercase tracking-wider text-gray-500">
                    {slotLabels[slot]}
                  </div>
                  <div className="font-semibold text-sm truncate">
                    {piece.name}
                  </div>
                  <div className="text-xs text-cyan-400">{piece.vibe}</div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => cycle(slot, -1)}
                    className="w-7 h-7 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center text-xs transition-colors"
                  >
                    ◀
                  </button>
                  <button
                    onClick={() => cycle(slot, 1)}
                    className="w-7 h-7 rounded-lg bg-gray-700/50 hover:bg-gray-600/50 flex items-center justify-center text-xs transition-colors"
                  >
                    ▶
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500">Total Vibe Score: </span>
            <span className="text-lg font-black text-cyan-400">
              +{totalVibe}
            </span>
          </div>
          <button
            onClick={randomize}
            className="px-5 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-sm font-semibold hover:bg-cyan-500/30 transition-colors"
          >
            🎲 Randomize Fit
          </button>
        </div>
      </div>
    </section>
  );
}
