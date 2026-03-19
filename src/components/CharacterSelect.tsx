"use client";

import { useState } from "react";
import { characters, WW3Character } from "@/lib/content";

function StatBar({ label, value, max, color }: { label: string; value: number; max: number; color: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-[10px] font-mono uppercase text-gray-500 w-20 text-right">
        {label}
      </span>
      <div className="flex-1 h-3 bg-gray-900 border border-gray-700">
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${(value / max) * 100}%`, background: color }}
        />
      </div>
      <span className="text-xs font-mono font-bold w-6" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

export default function CharacterSelect() {
  const [selected, setSelected] = useState<WW3Character>(characters[0]);
  const [locked, setLocked] = useState(false);

  if (locked) {
    return (
      <section className="max-w-2xl mx-auto">
        <div
          className="border-4 p-6 md:p-8 text-center"
          style={{ borderColor: selected.color, background: `${selected.color}08` }}
        >
          <div className="text-6xl mb-3">{selected.emoji}</div>
          <div
            className="text-3xl font-black mb-1"
            style={{ color: selected.color }}
          >
            {selected.name}
          </div>
          <div className="text-sm text-gray-400 font-mono mb-4">
            {selected.archetype}
          </div>

          <div className="bg-black border-2 border-gray-800 p-4 mb-4 text-left max-w-sm mx-auto space-y-1">
            <StatBar label="Combat" value={selected.stats.combat} max={100} color={selected.color} />
            <StatBar label="Anxiety" value={selected.stats.anxiety} max={100} color="#EEFF00" />
            <StatBar label="Drip" value={selected.stats.drip} max={100} color="#FF2D78" />
            <StatBar label="Screen" value={selected.stats.screenTime} max={100} color="#4D4DFF" />
            <StatBar label="Survival" value={selected.stats.survivalInstinct} max={100} color="#00FF66" />
          </div>

          <div className="space-y-2 text-sm">
            <p>
              <span className="text-gray-500 font-mono text-xs">SPECIAL: </span>
              <span className="text-white font-semibold">{selected.specialAbility}</span>
            </p>
            <p>
              <span className="text-gray-500 font-mono text-xs">WEAKNESS: </span>
              <span className="text-red-400">{selected.weakness}</span>
            </p>
          </div>

          <p className="mt-4 text-gray-400 italic text-sm">
            &ldquo;{selected.quote}&rdquo;
          </p>

          <button
            onClick={() => setLocked(false)}
            className="mt-6 px-6 py-2 bg-black border-2 font-black text-sm hover:opacity-80 transition-opacity"
            style={{ borderColor: selected.color, color: selected.color }}
          >
            BACK TO SELECT
          </button>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl md:text-4xl font-black">
            CHARACTER SELECT
          </h2>
          <p className="text-gray-400 text-sm font-mono">
            CHOOSE YOUR WW3 FIGHTER
          </p>
        </div>

        {/* Character grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
          {characters.map((char) => (
            <button
              key={char.name}
              onClick={() => setSelected(char)}
              className={`p-3 border-2 text-center transition-all ${
                selected.name === char.name
                  ? "scale-[1.02]"
                  : "border-gray-800 hover:border-gray-600 opacity-60 hover:opacity-100"
              }`}
              style={
                selected.name === char.name
                  ? { borderColor: char.color, boxShadow: `0 0 20px ${char.color}20` }
                  : {}
              }
            >
              <div className="text-3xl mb-1">{char.emoji}</div>
              <div className="text-xs font-black truncate">{char.name}</div>
              <div className="text-[9px] text-gray-500 font-mono">
                {char.archetype}
              </div>
            </button>
          ))}
        </div>

        {/* Selected preview */}
        <div
          className="border-2 p-4 md:p-6 flex flex-col md:flex-row gap-6"
          style={{ borderColor: selected.color }}
        >
          <div className="text-center md:text-left flex-shrink-0">
            <div className="text-5xl mb-2">{selected.emoji}</div>
            <div className="font-black text-lg" style={{ color: selected.color }}>
              {selected.name}
            </div>
            <div className="text-xs text-gray-500 font-mono">
              {selected.archetype}
            </div>
          </div>

          <div className="flex-1 space-y-1.5">
            <StatBar label="Combat" value={selected.stats.combat} max={100} color={selected.color} />
            <StatBar label="Anxiety" value={selected.stats.anxiety} max={100} color="#EEFF00" />
            <StatBar label="Drip" value={selected.stats.drip} max={100} color="#FF2D78" />
            <StatBar label="Screen" value={selected.stats.screenTime} max={100} color="#4D4DFF" />
            <StatBar label="Survival" value={selected.stats.survivalInstinct} max={100} color="#00FF66" />
          </div>

          <div className="flex-shrink-0 flex flex-col justify-between items-center md:items-end">
            <p className="text-gray-500 italic text-xs text-center md:text-right mb-3">
              &ldquo;{selected.quote}&rdquo;
            </p>
            <button
              onClick={() => setLocked(true)}
              className="px-8 py-3 font-black text-sm tracking-wider"
              style={{ background: selected.color, color: "#000" }}
            >
              LOCK IN
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
