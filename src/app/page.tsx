"use client";

import DoomscrollTicker from "@/components/DoomscrollTicker";
import DraftExcuseGenerator from "@/components/DraftExcuseGenerator";
import FitCheck from "@/components/FitCheck";
import BattlefieldBingo from "@/components/BattlefieldBingo";
import SurvivalCalculator from "@/components/SurvivalCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Ticker */}
      <DoomscrollTicker />

      {/* Hero */}
      <header className="relative overflow-hidden px-4 py-16 md:py-24 text-center">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-pink-500/10 rounded-full blur-[100px]" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px]" />

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 rounded-full bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-semibold mb-6 animate-pulse">
            SITUATION: IT&apos;S GIVING... APOCALYPSE
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-none mb-4">
            <span className="glitch-text">
              GEN<span className="text-pink-500">Z</span>
            </span>
            <br />
            <span className="text-3xl md:text-5xl lg:text-6xl text-gray-400">
              vs
            </span>
            <br />
            <span className="glitch-text">
              W<span className="text-cyan-400">W</span>3
            </span>
          </h1>

          <p className="text-gray-400 text-lg md:text-xl max-w-lg mx-auto mt-4">
            The generation that can&apos;t open a PDF is expected to fight a
            world war. Here&apos;s how that&apos;s going.
          </p>

          <div className="flex flex-wrap justify-center gap-3 mt-8 text-sm">
            <a
              href="#excuse"
              className="px-4 py-2 rounded-full bg-pink-500/20 border border-pink-500/30 text-pink-300 hover:bg-pink-500/30 transition-colors"
            >
              Draft Excuses
            </a>
            <a
              href="#fitcheck"
              className="px-4 py-2 rounded-full bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 hover:bg-cyan-500/30 transition-colors"
            >
              Fit Check
            </a>
            <a
              href="#bingo"
              className="px-4 py-2 rounded-full bg-yellow-500/20 border border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/30 transition-colors"
            >
              Battlefield Bingo
            </a>
            <a
              href="#survival"
              className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-300 hover:bg-green-500/30 transition-colors"
            >
              Survival Quiz
            </a>
          </div>
        </div>
      </header>

      {/* Sections */}
      <main className="max-w-4xl mx-auto px-4 pb-20 space-y-8">
        <div id="excuse">
          <DraftExcuseGenerator />
        </div>

        <div id="fitcheck">
          <FitCheck />
        </div>

        <div id="bingo">
          <BattlefieldBingo />
        </div>

        <div id="survival">
          <SurvivalCalculator />
        </div>

        {/* Footer */}
        <footer className="text-center pt-12 pb-8 border-t border-gray-800/50">
          <p className="text-gray-500 text-sm">
            This is satire. We cope through humor because the alternative is
            crying.
          </p>
          <p className="text-gray-600 text-xs mt-2">
            No wars were started in the making of this website.
          </p>
          <p className="text-gray-700 text-[10px] mt-4">
            &copy; 2026 &middot; made with existential dread &amp; WiFi
          </p>
        </footer>
      </main>

      {/* Bottom ticker */}
      <DoomscrollTicker />
    </div>
  );
}
