"use client";

import { useState, useRef } from "react";
import { zodiacSigns, battalions, weapons, ranks } from "@/lib/content";

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

interface DraftLetter {
  name: string;
  zodiac: string;
  battalion: string;
  weapon: string;
  rank: string;
  reportTime: string;
  consequence: string;
}

const consequences = [
  "deletion of your Spotify Wrapped history",
  "permanent revocation of your oat milk privileges",
  "your screen time being read aloud at a public tribunal",
  "being added to a group chat you can never leave",
  "your Duolingo owl showing up in person",
  "losing your Wordle streak — permanently",
  "your ex seeing your camera roll",
  "automatic enrollment in a LinkedIn motivational posting course",
];

const reportTimes = [
  "0-whenever-you-wake-up-hundred hours",
  "vibes o'clock sharp",
  "before your afternoon anxiety nap",
  "right after your 3rd snooze alarm",
  "when Mercury exits retrograde (approximate)",
];

export default function DraftLetterGenerator() {
  const [name, setName] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [app, setApp] = useState("");
  const [letter, setLetter] = useState<DraftLetter | null>(null);
  const letterRef = useRef<HTMLDivElement>(null);

  const generate = () => {
    if (!name.trim()) return;
    setLetter({
      name: name.trim(),
      zodiac: zodiac || pick(zodiacSigns),
      battalion: pick(battalions),
      weapon: pick(weapons),
      rank: pick(ranks),
      reportTime: pick(reportTimes),
      consequence: pick(consequences),
    });
  };

  if (letter) {
    return (
      <section className="relative">
        <div
          ref={letterRef}
          className="bg-[#f5f0e8] text-black p-6 md:p-10 border-4 border-black font-mono max-w-2xl mx-auto"
        >
          {/* Header */}
          <div className="text-center border-b-2 border-black pb-4 mb-6">
            <div className="text-[10px] tracking-[0.3em] uppercase text-gray-600">
              United States Selective Service System
            </div>
            <div className="text-2xl font-black mt-1 tracking-tight">
              NOTICE OF CONSCRIPTION
            </div>
            <div className="text-[10px] text-gray-500 mt-1">
              Form WW3-69 | Classification: UNSERIOUS
            </div>
          </div>

          {/* Body */}
          <div className="space-y-4 text-sm leading-relaxed">
            <p>
              Dear <span className="font-black underline">{letter.name}</span>,
              a <span className="font-black">{letter.zodiac}</span>,
            </p>

            <p>
              You have been selected for active duty in the armed forces of the
              United States. We understand this may conflict with your plans.
              We don&apos;t care.
            </p>

            <div className="bg-white/50 border-2 border-black p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">RANK:</span>
                <span className="font-black">{letter.rank}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">UNIT:</span>
                <span className="font-black text-right text-xs">{letter.battalion}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">WEAPON:</span>
                <span className="font-black text-right text-xs">{letter.weapon}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 text-xs">REPORT:</span>
                <span className="font-black text-right text-xs">{letter.reportTime}</span>
              </div>
            </div>

            {app && (
              <p className="text-xs">
                P.S. Your {app} usage of approximately 47 hours/day has been
                noted. This will not exempt you. If anything, it makes you
                ideal for the Psychological Operations Division.
              </p>
            )}

            <p className="text-xs">
              Failure to comply will result in the{" "}
              <span className="font-black">{letter.consequence}</span>.
            </p>

            <p className="text-xs text-gray-600 italic">
              This is satire. But the anxiety you felt reading it? That was real.
            </p>
          </div>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t-2 border-black flex justify-between items-end">
            <div>
              <div className="text-xs text-gray-600">Signed,</div>
              <div className="font-black text-sm">Gen. Theodore &quot;Boomer&quot; McYellsalot</div>
              <div className="text-[10px] text-gray-500">
                Commander, Fort TikTok
              </div>
            </div>
            <div className="text-[10px] text-gray-400">
              genz-ww3.vercel.app
            </div>
          </div>
        </div>

        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={() => setLetter(null)}
            className="px-5 py-2 bg-black text-white border-2 border-black font-black text-sm hover:bg-gray-900 transition-colors"
          >
            GENERATE ANOTHER
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-lg mx-auto">
      <div className="bg-black border-4 border-[#FF2D78] p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-black mb-1">
          Draft Letter Generator
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Get your personalized conscription notice
        </p>

        <div className="space-y-4">
          <div>
            <label className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-1">
              Your name, soldier
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#FF2D78] outline-none transition-colors"
            />
          </div>

          <div>
            <label className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-1">
              Zodiac sign (critical intel)
            </label>
            <select
              value={zodiac}
              onChange={(e) => setZodiac(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#FF2D78] outline-none transition-colors"
            >
              <option value="">Pick your sign...</option>
              {zodiacSigns.map((z) => (
                <option key={z} value={z}>
                  {z}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-gray-500 uppercase tracking-wider block mb-1">
              Most-used app (optional)
            </label>
            <input
              type="text"
              value={app}
              onChange={(e) => setApp(e.target.value)}
              placeholder="TikTok, Instagram, etc."
              className="w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#FF2D78] outline-none transition-colors"
            />
          </div>

          <button
            onClick={generate}
            disabled={!name.trim()}
            className="w-full py-3 bg-[#FF2D78] text-white font-black text-lg border-2 border-[#FF2D78] hover:bg-[#ff1566] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          >
            GENERATE MY DRAFT LETTER
          </button>
        </div>
      </div>
    </section>
  );
}
