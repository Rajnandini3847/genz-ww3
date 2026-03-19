"use client";

import DoomscrollTicker from "@/components/DoomscrollTicker";
import RealNewsBanner from "@/components/RealNewsBanner";
import DraftLetterGenerator from "@/components/DraftLetterGenerator";
import CharacterSelect from "@/components/CharacterSelect";
import TrenchTalkTranslator from "@/components/TrenchTalkTranslator";
import SurvivalCalculator from "@/components/SurvivalCalculator";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#030712]">
      {/* Top ticker */}
      <DoomscrollTicker />

      {/* Hero */}
      <header className="relative overflow-hidden px-4 py-16 md:py-24 text-center border-b-4 border-gray-800">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-1/4 w-64 h-64 bg-[#FF2D78]/8 rounded-full blur-[120px]" />
          <div className="absolute top-10 right-1/4 w-64 h-64 bg-[#4D4DFF]/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-[#00FF66]/5 blur-[100px]" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="inline-block px-3 py-1 border-2 border-red-600 text-red-500 text-xs font-black uppercase tracking-widest mb-8 animate-pulse">
            SITUATION: IT&apos;S GIVING APOCALYPSE
          </div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-[0.85]">
            <span className="glitch-text block">
              GEN<span className="text-[#FF2D78]">Z</span>
            </span>
            <span className="text-2xl md:text-4xl text-gray-600 block my-2">
              vs
            </span>
            <span className="glitch-text block">
              W<span className="text-[#4D4DFF]">W</span>
              <span className="text-[#00FF66]">3</span>
            </span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mt-6 font-mono">
            The generation that can&apos;t open a PDF is expected to fight a
            world war. Here&apos;s how that&apos;s going.
          </p>

          <nav className="flex flex-wrap justify-center gap-2 mt-8">
            {[
              { href: "#news", label: "Real News", color: "#ef4444" },
              { href: "#draft", label: "Draft Letter", color: "#FF2D78" },
              { href: "#characters", label: "Character Select", color: "#4D4DFF" },
              { href: "#translate", label: "Trench Talk", color: "#00FF66" },
              { href: "#survival", label: "Survival Quiz", color: "#EEFF00" },
            ].map(({ href, label, color }) => (
              <a
                key={href}
                href={href}
                className="px-3 py-1.5 text-xs font-black border-2 transition-colors hover:text-black"
                style={{
                  borderColor: color,
                  color: color,
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.background = color;
                  (e.target as HTMLElement).style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.background = "transparent";
                  (e.target as HTMLElement).style.color = color;
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Real news */}
      <div id="news">
        <RealNewsBanner />
      </div>

      {/* Interactive sections */}
      <main className="space-y-16 md:space-y-24 py-16 md:py-24 px-4">
        {/* Draft Letter */}
        <div id="draft">
          <DraftLetterGenerator />
        </div>

        {/* Divider */}
        <div className="max-w-4xl mx-auto border-t-2 border-gray-800" />

        {/* Character Select */}
        <div id="characters">
          <CharacterSelect />
        </div>

        <div className="max-w-4xl mx-auto border-t-2 border-gray-800" />

        {/* Translator */}
        <div id="translate">
          <TrenchTalkTranslator />
        </div>

        <div className="max-w-4xl mx-auto border-t-2 border-gray-800" />

        {/* Survival */}
        <div id="survival">
          <SurvivalCalculator />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t-4 border-gray-800 py-8 text-center px-4">
        <p className="text-gray-500 text-sm font-mono">
          This is satire. We cope through humor because the alternative is
          crying.
        </p>
        <p className="text-gray-700 text-xs mt-2">
          The news above is real. The rest is how Gen Z processes it.
        </p>
        <p className="text-gray-800 text-[10px] mt-4 font-mono">
          &copy; 2026 &middot; made with existential dread &amp; WiFi
        </p>
      </footer>

      {/* Bottom ticker */}
      <DoomscrollTicker />
    </div>
  );
}
