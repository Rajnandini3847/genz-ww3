"use client";

import { useState } from "react";
import { useTheme } from "@/lib/ThemeContext";
import { militaryToGenz, genzToMilitary } from "@/lib/content";

type Mode = "mil-to-genz" | "genz-to-mil";

export default function TrenchTalkTranslator() {
  const { isMil } = useTheme();
  const [mode, setMode] = useState<Mode>("mil-to-genz");
  const [input, setInput] = useState("");

  const dict = mode === "mil-to-genz" ? militaryToGenz : genzToMilitary;

  const translate = (text: string): string => {
    if (!text.trim()) return "";
    const lower = text.toLowerCase().trim();
    if (dict[lower]) return dict[lower];
    let result = lower;
    const entries = Object.entries(dict).sort((a, b) => b[0].length - a[0].length);
    for (const [key, val] of entries) {
      const regex = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      result = result.replace(regex, val);
    }
    if (result === lower) {
      return mode === "mil-to-genz"
        ? `idk what "${text}" means but it sounds stressful bestie`
        : `*static* — command does not recognize "${text}" — requesting clarification, over`;
    }
    return result;
  };

  const translated = translate(input);
  const examples = mode === "mil-to-genz"
    ? ["oscar mike", "fubar", "sitrep", "danger close", "exfil", "mre"]
    : ["no cap", "it's giving", "slay", "lowkey", "yeet", "vibe check"];

  return (
    <section className={isMil ? "max-w-2xl mx-auto" : "max-w-2xl mx-auto"}>
      <div className={isMil
        ? "bg-white border border-[#dfe1e2] rounded p-6"
        : "bg-black border-4 border-[#00FF66] p-6 md:p-8"
      }>
        {!isMil && (
          <>
            <h2 className="text-3xl md:text-4xl font-black mb-1">Trench Talk Translator</h2>
            <p className="text-gray-400 text-sm mb-4">Bridging the generational communication gap since WW3</p>
          </>
        )}

        {/* Mode toggle */}
        <div className={`flex mb-4 ${isMil ? "border border-[#dfe1e2] rounded overflow-hidden" : "border-2 border-gray-700"}`}>
          <button
            onClick={() => { setMode("mil-to-genz"); setInput(""); }}
            className={isMil
              ? `flex-1 py-2 text-sm font-semibold transition-colors ${mode === "mil-to-genz" ? "bg-[#005ea2] text-white" : "text-[#005ea2] hover:bg-[#d9e8f6]"}`
              : `flex-1 py-2 text-sm font-black transition-colors ${mode === "mil-to-genz" ? "bg-[#00FF66] text-black" : "text-gray-400 hover:text-white"}`
            }
          >
            {isMil ? "Military to Civilian" : "Military \u2192 Gen Z"}
          </button>
          <button
            onClick={() => { setMode("genz-to-mil"); setInput(""); }}
            className={isMil
              ? `flex-1 py-2 text-sm font-semibold transition-colors ${mode === "genz-to-mil" ? "bg-[#005ea2] text-white" : "text-[#005ea2] hover:bg-[#d9e8f6]"}`
              : `flex-1 py-2 text-sm font-black transition-colors ${mode === "genz-to-mil" ? "bg-[#00FF66] text-black" : "text-gray-400 hover:text-white"}`
            }
          >
            {isMil ? "Civilian to Military" : "Gen Z \u2192 Military"}
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className={`text-[10px] uppercase tracking-wider block mb-1 ${isMil ? "text-[#1b1b1b] font-semibold text-xs" : "font-mono text-gray-500"}`}>
              {mode === "mil-to-genz" ? (isMil ? "INPUT — MILITARY TERMINOLOGY" : "MILITARY SPEAK") : (isMil ? "INPUT — CIVILIAN TERMINOLOGY" : "GEN Z SPEAK")}
            </label>
            <input
              type="text" value={input} onChange={(e) => setInput(e.target.value)}
              placeholder={mode === "mil-to-genz" ? "Type military jargon..." : (isMil ? "Type civilian slang..." : "Type gen z slang...")}
              className={isMil
                ? "w-full px-4 py-2.5 bg-white border border-[#565c65] rounded text-[#1b1b1b] focus:border-[#005ea2] focus:ring-1 focus:ring-[#005ea2] outline-none text-sm"
                : "w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#00FF66] outline-none transition-colors"
              }
            />
          </div>
          <div>
            <label className={`text-[10px] uppercase tracking-wider block mb-1 ${isMil ? "text-[#1b1b1b] font-semibold text-xs" : "font-mono text-gray-500"}`}>
              {mode === "mil-to-genz" ? (isMil ? "OUTPUT — CIVILIAN TRANSLATION" : "GEN Z TRANSLATION") : (isMil ? "OUTPUT — MILITARY TRANSLATION" : "MILITARY TRANSLATION")}
            </label>
            <div className={isMil
              ? "w-full px-4 py-2.5 bg-[#f0f0f0] border border-[#dfe1e2] rounded min-h-[44px] text-sm"
              : "w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 font-mono min-h-[48px]"
            }>
              {translated ? (
                <span className={`font-bold ${isMil ? "text-[#005ea2]" : ""}`} style={isMil ? {} : { color: "#00FF66" }}>
                  {translated}
                </span>
              ) : (
                <span className={isMil ? "text-[#a9aeb1]" : "text-gray-600"}>Translation appears here...</span>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className={`text-[10px] uppercase tracking-wider mb-2 ${isMil ? "text-[#71767a] font-semibold text-xs" : "font-mono text-gray-600"}`}>
            {isMil ? "Quick references:" : "Try these:"}
          </div>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex) => (
              <button
                key={ex} onClick={() => setInput(ex)}
                className={isMil
                  ? "px-2.5 py-1 text-xs bg-[#f0f0f0] border border-[#dfe1e2] rounded text-[#005ea2] hover:bg-[#d9e8f6] transition-colors"
                  : "px-2.5 py-1 text-xs font-mono bg-gray-900 border border-gray-700 text-gray-400 hover:border-[#00FF66] hover:text-[#00FF66] transition-colors"
                }
              >
                {ex}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
