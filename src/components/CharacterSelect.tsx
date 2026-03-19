"use client";

import { useState } from "react";
import { useTheme } from "@/lib/ThemeContext";
import { characters, WW3Character } from "@/lib/content";

function StatBar({ label, value, max, color, isMil }: { label: string; value: number; max: number; color: string; isMil: boolean }) {
  const pct = (value / max) * 100;
  return (
    <div className="flex items-center gap-2">
      <span className={`text-[10px] uppercase w-20 text-right ${isMil ? "text-[#71767a] font-semibold" : "font-mono text-gray-500"}`}>
        {label}
      </span>
      <div className={`flex-1 h-3 ${isMil ? "bg-[#f0f0f0] border border-[#dfe1e2] rounded-sm" : "bg-gray-900 border border-gray-700"}`}>
        <div className="h-full transition-all duration-500 rounded-sm" style={{ width: `${pct}%`, background: isMil ? "#005ea2" : color }} />
      </div>
      <span className={`text-xs font-bold w-6 ${isMil ? "text-[#1b1b1b]" : "font-mono"}`} style={isMil ? {} : { color }}>
        {value}
      </span>
    </div>
  );
}

export default function CharacterSelect() {
  const { isMil } = useTheme();
  const [selected, setSelected] = useState<WW3Character>(characters[0]);
  const [locked, setLocked] = useState(false);

  /* ═══ LOCKED VIEW ═══ */
  if (locked) {
    return (
      <section className="max-w-2xl mx-auto">
        <div className={isMil
          ? "bg-white border border-[#dfe1e2] rounded overflow-hidden"
          : "border-4 p-6 md:p-8 text-center"
        } style={isMil ? {} : { borderColor: selected.color, background: `${selected.color}08` }}>

          {isMil ? (
            <>
              <div className="bg-[#162e51] text-white px-6 py-3">
                <div className="text-xs text-[#aebfd4] uppercase tracking-widest">Personnel File</div>
                <div className="font-bold">{selected.name}</div>
              </div>
              <div className="p-6">
                <div className="bg-[#f0f0f0] border border-[#dfe1e2] rounded p-4 mb-4">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-[#dfe1e2]">
                        <td className="py-1.5 text-xs text-[#71767a] font-semibold uppercase w-36">Classification</td>
                        <td className="py-1.5 text-[#1b1b1b] font-semibold">{selected.archetype}</td>
                      </tr>
                      <tr className="border-b border-[#dfe1e2]">
                        <td className="py-1.5 text-xs text-[#71767a] font-semibold uppercase">Special Ability</td>
                        <td className="py-1.5 text-[#1b1b1b]">{selected.specialAbility}</td>
                      </tr>
                      <tr className="border-b border-[#dfe1e2]">
                        <td className="py-1.5 text-xs text-[#71767a] font-semibold uppercase">Known Weakness</td>
                        <td className="py-1.5 text-[#d54309]">{selected.weakness}</td>
                      </tr>
                      <tr>
                        <td className="py-1.5 text-xs text-[#71767a] font-semibold uppercase">Field Quote</td>
                        <td className="py-1.5 text-[#71767a] italic">&ldquo;{selected.quote}&rdquo;</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="space-y-1.5">
                  <StatBar label="Combat" value={selected.stats.combat} max={100} color="" isMil />
                  <StatBar label="Anxiety" value={selected.stats.anxiety} max={100} color="" isMil />
                  <StatBar label="Appearance" value={selected.stats.drip} max={100} color="" isMil />
                  <StatBar label="Screen" value={selected.stats.screenTime} max={100} color="" isMil />
                  <StatBar label="Survival" value={selected.stats.survivalInstinct} max={100} color="" isMil />
                </div>
                <div className="mt-4 flex justify-center">
                  <button onClick={() => setLocked(false)} className="px-5 py-2 bg-[#005ea2] text-white text-sm font-bold rounded hover:bg-[#1a4480] transition-colors">
                    Return to Selection
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="text-6xl mb-3">{selected.emoji}</div>
              <div className="text-3xl font-black mb-1" style={{ color: selected.color }}>{selected.name}</div>
              <div className="text-sm text-gray-400 font-mono mb-4">{selected.archetype}</div>
              <div className="bg-black border-2 border-gray-800 p-4 mb-4 text-left max-w-sm mx-auto space-y-1">
                <StatBar label="Combat" value={selected.stats.combat} max={100} color={selected.color} isMil={false} />
                <StatBar label="Anxiety" value={selected.stats.anxiety} max={100} color="#EEFF00" isMil={false} />
                <StatBar label="Drip" value={selected.stats.drip} max={100} color="#FF2D78" isMil={false} />
                <StatBar label="Screen" value={selected.stats.screenTime} max={100} color="#4D4DFF" isMil={false} />
                <StatBar label="Survival" value={selected.stats.survivalInstinct} max={100} color="#00FF66" isMil={false} />
              </div>
              <div className="space-y-2 text-sm">
                <p><span className="text-gray-500 font-mono text-xs">SPECIAL: </span><span className="text-white font-semibold">{selected.specialAbility}</span></p>
                <p><span className="text-gray-500 font-mono text-xs">WEAKNESS: </span><span className="text-red-400">{selected.weakness}</span></p>
              </div>
              <p className="mt-4 text-gray-400 italic text-sm">&ldquo;{selected.quote}&rdquo;</p>
              <button onClick={() => setLocked(false)} className="mt-6 px-6 py-2 bg-black border-2 font-black text-sm hover:opacity-80 transition-opacity" style={{ borderColor: selected.color, color: selected.color }}>
                BACK TO SELECT
              </button>
            </>
          )}
        </div>
      </section>
    );
  }

  /* ═══ SELECT VIEW ═══ */
  return (
    <section>
      <div className="max-w-4xl mx-auto">
        {!isMil && (
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-black">CHARACTER SELECT</h2>
            <p className="text-gray-400 text-sm font-mono">CHOOSE YOUR WW3 FIGHTER</p>
          </div>
        )}

        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 mb-6`}>
          {characters.map((char) => {
            const active = selected.name === char.name;
            return (
              <button
                key={char.name}
                onClick={() => setSelected(char)}
                className={isMil
                  ? `p-3 border rounded text-center transition-all ${active ? "border-[#005ea2] bg-[#d9e8f6]" : "border-[#dfe1e2] bg-[#f0f0f0] hover:border-[#005ea2]"}`
                  : `p-3 border-2 text-center transition-all ${active ? "scale-[1.02]" : "border-gray-800 hover:border-gray-600 opacity-60 hover:opacity-100"}`
                }
                style={!isMil && active ? { borderColor: char.color, boxShadow: `0 0 20px ${char.color}20` } : {}}
              >
                {!isMil && <div className="text-3xl mb-1">{char.emoji}</div>}
                <div className={`text-xs font-black truncate ${isMil ? "text-[#1b1b1b]" : ""}`}>{char.name}</div>
                <div className={`text-[9px] ${isMil ? "text-[#71767a]" : "text-gray-500 font-mono"}`}>{char.archetype}</div>
              </button>
            );
          })}
        </div>

        {/* Preview */}
        <div className={isMil
          ? "border border-[#dfe1e2] rounded p-4 md:p-6 flex flex-col md:flex-row gap-6 bg-white"
          : "border-2 p-4 md:p-6 flex flex-col md:flex-row gap-6"
        } style={isMil ? {} : { borderColor: selected.color }}>
          <div className="text-center md:text-left flex-shrink-0">
            {!isMil && <div className="text-5xl mb-2">{selected.emoji}</div>}
            <div className={`font-black text-lg ${isMil ? "text-[#1b1b1b]" : ""}`} style={isMil ? {} : { color: selected.color }}>
              {selected.name}
            </div>
            <div className={`text-xs ${isMil ? "text-[#71767a]" : "text-gray-500 font-mono"}`}>{selected.archetype}</div>
          </div>
          <div className="flex-1 space-y-1.5">
            <StatBar label="Combat" value={selected.stats.combat} max={100} color={selected.color} isMil={isMil} />
            <StatBar label="Anxiety" value={selected.stats.anxiety} max={100} color="#EEFF00" isMil={isMil} />
            <StatBar label={isMil ? "Appearance" : "Drip"} value={selected.stats.drip} max={100} color="#FF2D78" isMil={isMil} />
            <StatBar label="Screen" value={selected.stats.screenTime} max={100} color="#4D4DFF" isMil={isMil} />
            <StatBar label="Survival" value={selected.stats.survivalInstinct} max={100} color="#00FF66" isMil={isMil} />
          </div>
          <div className="flex-shrink-0 flex flex-col justify-between items-center md:items-end">
            <p className={`italic text-xs text-center md:text-right mb-3 ${isMil ? "text-[#71767a]" : "text-gray-500"}`}>
              &ldquo;{selected.quote}&rdquo;
            </p>
            <button
              onClick={() => setLocked(true)}
              className={isMil
                ? "px-6 py-2.5 bg-[#005ea2] text-white font-bold text-sm rounded hover:bg-[#1a4480] transition-colors"
                : "px-8 py-3 font-black text-sm tracking-wider"
              }
              style={isMil ? {} : { background: selected.color, color: "#000" }}
            >
              {isMil ? "Confirm Selection" : "LOCK IN"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
