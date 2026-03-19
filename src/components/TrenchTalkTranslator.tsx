"use client";

import { useState } from "react";
import { militaryToGenz, genzToMilitary } from "@/lib/content";

type Mode = "mil-to-genz" | "genz-to-mil";

export default function TrenchTalkTranslator() {
  const [mode, setMode] = useState<Mode>("mil-to-genz");
  const [input, setInput] = useState("");

  const dict = mode === "mil-to-genz" ? militaryToGenz : genzToMilitary;

  const translate = (text: string): string => {
    if (!text.trim()) return "";
    const lower = text.toLowerCase().trim();

    // Direct match
    if (dict[lower]) return dict[lower];

    // Try to find and replace known phrases within the text
    let result = lower;
    const entries = Object.entries(dict).sort(
      (a, b) => b[0].length - a[0].length
    );
    for (const [key, val] of entries) {
      const regex = new RegExp(`\\b${key.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`, "gi");
      result = result.replace(regex, `«${val}»`);
    }

    // Clean up markers
    result = result.replace(/«/g, "").replace(/»/g, "");

    if (result === lower) {
      return mode === "mil-to-genz"
        ? `idk what "${text}" means but it sounds stressful bestie`
        : `*static* — command does not recognize "${text}" — requesting clarification, over`;
    }

    return result;
  };

  const translated = translate(input);

  const examples =
    mode === "mil-to-genz"
      ? ["oscar mike", "fubar", "sitrep", "danger close", "exfil", "mre"]
      : ["no cap", "it's giving", "slay", "lowkey", "yeet", "vibe check"];

  return (
    <section className="max-w-2xl mx-auto">
      <div className="bg-black border-4 border-[#00FF66] p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-black mb-1">
          Trench Talk Translator
        </h2>
        <p className="text-gray-400 text-sm mb-4">
          Bridging the generational communication gap since WW3
        </p>

        {/* Mode toggle */}
        <div className="flex border-2 border-gray-700 mb-4">
          <button
            onClick={() => {
              setMode("mil-to-genz");
              setInput("");
            }}
            className={`flex-1 py-2 text-sm font-black transition-colors ${
              mode === "mil-to-genz"
                ? "bg-[#00FF66] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Military → Gen Z
          </button>
          <button
            onClick={() => {
              setMode("genz-to-mil");
              setInput("");
            }}
            className={`flex-1 py-2 text-sm font-black transition-colors ${
              mode === "genz-to-mil"
                ? "bg-[#00FF66] text-black"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Gen Z → Military
          </button>
        </div>

        {/* Input */}
        <div className="space-y-3">
          <div>
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">
              {mode === "mil-to-genz" ? "MILITARY SPEAK" : "GEN Z SPEAK"}
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                mode === "mil-to-genz"
                  ? "Type military jargon..."
                  : "Type gen z slang..."
              }
              className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#00FF66] outline-none transition-colors"
            />
          </div>

          {/* Output */}
          <div>
            <label className="text-[10px] font-mono text-gray-500 uppercase tracking-wider block mb-1">
              {mode === "mil-to-genz" ? "GEN Z TRANSLATION" : "MILITARY TRANSLATION"}
            </label>
            <div className="w-full px-4 py-3 bg-gray-900/50 border-2 border-gray-800 font-mono min-h-[48px]">
              {translated ? (
                <span
                  className="font-bold"
                  style={{ color: "#00FF66" }}
                >
                  {translated}
                </span>
              ) : (
                <span className="text-gray-600">Translation appears here...</span>
              )}
            </div>
          </div>
        </div>

        {/* Quick examples */}
        <div className="mt-4">
          <div className="text-[10px] font-mono text-gray-600 uppercase tracking-wider mb-2">
            Try these:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {examples.map((ex) => (
              <button
                key={ex}
                onClick={() => setInput(ex)}
                className="px-2.5 py-1 text-xs font-mono bg-gray-900 border border-gray-700 text-gray-400 hover:border-[#00FF66] hover:text-[#00FF66] transition-colors"
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
