"use client";

import { ThemeProvider, useTheme } from "@/lib/ThemeContext";
import ModeToggle from "@/components/ModeToggle";
import GovBanner from "@/components/GovBanner";
import DoomscrollTicker from "@/components/DoomscrollTicker";
import RealNewsBanner from "@/components/RealNewsBanner";
import DraftLetterGenerator from "@/components/DraftLetterGenerator";
import CharacterSelect from "@/components/CharacterSelect";
import TrenchTalkTranslator from "@/components/TrenchTalkTranslator";
import SurvivalCalculator from "@/components/SurvivalCalculator";

function ChaosHero() {
  return (
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
          <span className="text-2xl md:text-4xl text-gray-600 block my-2">vs</span>
          <span className="glitch-text block">
            W<span className="text-[#4D4DFF]">W</span>
            <span className="text-[#00FF66]">3</span>
          </span>
        </h1>
        <p className="text-gray-500 text-sm md:text-base max-w-md mx-auto mt-6 font-mono">
          The generation that can&apos;t open a PDF is expected to fight a world war. Here&apos;s how that&apos;s going.
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
              className="px-3 py-1.5 text-xs font-black border-2 transition-colors"
              style={{ borderColor: color, color }}
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
  );
}

function MilitaryHero() {
  return (
    <header>
      {/* Dark navy header bar */}
      <div className="bg-[#162e51] text-white">
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center gap-4">
          {/* Seal */}
          <div className="w-14 h-14 rounded-full border-2 border-[#d4bf91] flex items-center justify-center text-2xl flex-shrink-0 bg-[#1a4480]">
            ★
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-black tracking-tight">
              SELECTIVE SERVICE SYSTEM
            </h1>
            <p className="text-[#aebfd4] text-xs mt-0.5">
              Generation Z Readiness Assessment &amp; Classification Portal
            </p>
          </div>
        </div>
      </div>
      {/* Nav bar */}
      <nav className="bg-[#1a4480] border-t border-[#254367]">
        <div className="max-w-5xl mx-auto px-4 flex gap-0 overflow-x-auto">
          {[
            { href: "#news", label: "Situation Reports" },
            { href: "#draft", label: "Draft Registration" },
            { href: "#characters", label: "Personnel Classification" },
            { href: "#translate", label: "Communications" },
            { href: "#survival", label: "Readiness Assessment" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="px-4 py-2.5 text-sm text-[#d9e8f6] hover:bg-[#162e51] hover:text-white transition-colors whitespace-nowrap border-r border-[#254367]"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>
      {/* Hero content */}
      <div className="bg-[#f0f0f0] border-b border-[#dfe1e2]">
        <div className="max-w-5xl mx-auto px-4 py-8">
          <p className="text-[#b50909] text-xs font-bold uppercase tracking-wider mb-2">
            ALERT — ACTIVE GEOPOLITICAL CRISIS
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-[#1b1b1b] leading-tight">
            Generation Z Wartime Readiness Portal
          </h2>
          <p className="text-[#71767a] mt-2 max-w-2xl text-sm leading-relaxed">
            The Selective Service System has prepared this portal to assess the readiness
            of Generation Z citizens for potential conscription. All tools below are
            provided for informational and coping purposes.
          </p>
          <div className="flex gap-3 mt-4">
            <a
              href="#draft"
              className="px-5 py-2 bg-[#005ea2] text-white text-sm font-bold rounded hover:bg-[#1a4480] transition-colors"
            >
              Begin Registration
            </a>
            <a
              href="#survival"
              className="px-5 py-2 bg-white text-[#005ea2] text-sm font-bold rounded border border-[#005ea2] hover:bg-[#d9e8f6] transition-colors"
            >
              Take Assessment
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

function ChaosFooter() {
  return (
    <footer className="border-t-4 border-gray-800 py-8 text-center px-4">
      <p className="text-gray-500 text-sm font-mono">
        This is satire. We cope through humor because the alternative is crying.
      </p>
      <p className="text-gray-700 text-xs mt-2">
        The news above is real. The rest is how Gen Z processes it.
      </p>
      <p className="text-gray-800 text-[10px] mt-4 font-mono">
        &copy; 2026 &middot; made with existential dread &amp; WiFi
      </p>
    </footer>
  );
}

function MilitaryFooter() {
  return (
    <footer className="bg-[#1b1b1b] text-white mt-8">
      <div className="max-w-5xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
          <div>
            <h3 className="font-bold text-[#dfe1e2] text-xs uppercase tracking-wider mb-2">
              About This Portal
            </h3>
            <p className="text-[#a9aeb1] text-xs leading-relaxed">
              This is a satirical website. It is not affiliated with any government agency.
              We cope through humor because the alternative is crying.
            </p>
          </div>
          <div>
            <h3 className="font-bold text-[#dfe1e2] text-xs uppercase tracking-wider mb-2">
              Portal Sections
            </h3>
            <ul className="text-xs space-y-1">
              <li><a href="#news" className="text-[#73b3e7] hover:text-white">Situation Reports</a></li>
              <li><a href="#draft" className="text-[#73b3e7] hover:text-white">Draft Registration</a></li>
              <li><a href="#characters" className="text-[#73b3e7] hover:text-white">Personnel Classification</a></li>
              <li><a href="#translate" className="text-[#73b3e7] hover:text-white">Communications</a></li>
              <li><a href="#survival" className="text-[#73b3e7] hover:text-white">Readiness Assessment</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-[#dfe1e2] text-xs uppercase tracking-wider mb-2">
              Disclaimer
            </h3>
            <p className="text-[#a9aeb1] text-xs leading-relaxed">
              The news headlines are real. Everything else is how Generation Z
              processes the geopolitical situation. No actual military value here.
            </p>
          </div>
        </div>
        <div className="border-t border-[#3d4551] mt-6 pt-4 text-[10px] text-[#71767a] text-center">
          &copy; 2026 &middot; Not a .gov website &middot; Satire &amp; coping
        </div>
      </div>
    </footer>
  );
}

/* ─── Section wrapper that adapts to theme ─── */
function Section({
  id,
  milTitle,
  children,
}: {
  id: string;
  milTitle: string;
  children: React.ReactNode;
}) {
  const { isMil } = useTheme();

  return (
    <div id={id} className={isMil ? "bg-white border border-[#dfe1e2] rounded p-6 md:p-8 shadow-sm" : ""}>
      {isMil && (
        <div className="flex items-center gap-2 mb-4 pb-3 border-b border-[#dfe1e2]">
          <div className="w-1 h-6 bg-[#005ea2] rounded-full" />
          <h2 className="text-lg font-black text-[#1b1b1b] uppercase tracking-wide">
            {milTitle}
          </h2>
        </div>
      )}
      {children}
    </div>
  );
}

function PageContent() {
  const { isMil } = useTheme();

  return (
    <div className={isMil ? "mil-mode bg-white text-[#1b1b1b]" : "bg-[#030712] text-white noise"}>
      <ModeToggle />

      {/* .gov banner — only in military mode */}
      {isMil && <GovBanner />}

      {/* Ticker — only in chaos mode */}
      {!isMil && <DoomscrollTicker />}

      {/* Hero */}
      {isMil ? <MilitaryHero /> : <ChaosHero />}

      {/* Real news */}
      <div id="news" className={isMil ? "max-w-5xl mx-auto px-4 py-8" : ""}>
        {isMil ? (
          <Section id="" milTitle="Situation Reports — Active Conflicts">
            <RealNewsBanner />
          </Section>
        ) : (
          <RealNewsBanner />
        )}
      </div>

      {/* Interactive sections */}
      <main
        className={
          isMil
            ? "max-w-5xl mx-auto px-4 space-y-8 pb-12"
            : "space-y-16 md:space-y-24 py-16 md:py-24 px-4"
        }
      >
        <Section id="draft" milTitle="Selective Service — Draft Registration Form">
          <DraftLetterGenerator />
        </Section>

        {!isMil && <div className="max-w-4xl mx-auto border-t-2 border-gray-800" />}

        <Section id="characters" milTitle="Personnel Classification — MOS Assignment">
          <CharacterSelect />
        </Section>

        {!isMil && <div className="max-w-4xl mx-auto border-t-2 border-gray-800" />}

        <Section id="translate" milTitle="Communications — Language Bridge Protocol">
          <TrenchTalkTranslator />
        </Section>

        {!isMil && <div className="max-w-4xl mx-auto border-t-2 border-gray-800" />}

        <Section id="survival" milTitle="Readiness Assessment — Fitness for Duty Evaluation">
          <SurvivalCalculator />
        </Section>
      </main>

      {/* Footer */}
      {isMil ? <MilitaryFooter /> : <ChaosFooter />}

      {/* Bottom ticker — only chaos */}
      {!isMil && <DoomscrollTicker />}
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PageContent />
    </ThemeProvider>
  );
}
