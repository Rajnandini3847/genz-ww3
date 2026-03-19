"use client";

import { useState } from "react";
import { useTheme } from "@/lib/ThemeContext";
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
  serialNo: string;
  orderNo: string;
  reportTime: string;
  app: string;
  age: string;
  dob: string;
  occupation: string;
  employer: string;
  dependents: string;
  exemption: string;
}

const occupations = [
  "Content Creator", "Professional Doomscroller", "Vibe Curator",
  "Emotional Support Friend", "Unpaid Intern (3rd year)", "Freelance Overthinker",
  "TikTok Analyst", "Astrology Consultant", "Stanley Cup Influencer",
  "Unemployed (but manifesting)",
];
const employers = [
  "Self (technically)", "My parents' WiFi", "The Algorithm",
  "Nobody (I'm between situations)", "A startup that pays in exposure",
  "Uber Eats (on and off)", "The gig economy bestie",
];
const dependents = [
  "emotional support cat", "3 houseplants (barely alive)",
  "Spotify Premium subscription", "student loan debt",
  "a Squishmallow collection", "my therapist (mutual dependency)",
  "None, I can barely support myself",
];
const exemptions = [
  "Anxiety (diagnosed + self-diagnosed)",
  "Chronically online — liability to operational security",
  "Cannot wake up before noon under any circumstances",
  "Scoliosis from phone posture", "Emotional damage (generalized)",
  "My crystals said no", "Mercury is in retrograde (permanent claim)",
  "I literally cannot",
];
const reportTimes = [
  "0-whenever-you-wake-up-hundred hours", "vibes o'clock sharp",
  "before your afternoon anxiety nap", "right after your 3rd snooze alarm",
  "when Mercury exits retrograde (approximate)",
];

function genSerial(): string {
  return `WW3-${Math.floor(Math.random() * 9000) + 1000}`;
}
function genOrder(): string {
  return `${Math.floor(Math.random() * 90) + 10}-${Math.floor(Math.random() * 9) + 1}-${Math.floor(Math.random() * 90) + 10} ${String.fromCharCode(65 + Math.floor(Math.random() * 6))}`;
}

function Field({ value, small }: { value: string; small?: boolean }) {
  return (
    <span className={`handwritten inline ${small ? "text-base" : "text-lg"} text-[#1a1a3a]`}>
      {value}
    </span>
  );
}

/* ═══ MILITARY MODE: Gov form row ═══ */
function GovRow({ label, value }: { label: string; value: string }) {
  return (
    <tr className="border-b border-[#dfe1e2]">
      <td className="py-2 pr-4 text-xs text-[#71767a] font-semibold uppercase tracking-wide align-top w-40">{label}</td>
      <td className="py-2 text-sm text-[#1b1b1b] font-semibold">{value}</td>
    </tr>
  );
}

export default function DraftLetterGenerator() {
  const { isMil } = useTheme();
  const [name, setName] = useState("");
  const [zodiac, setZodiac] = useState("");
  const [app, setApp] = useState("");
  const [letter, setLetter] = useState<DraftLetter | null>(null);

  const generate = () => {
    if (!name.trim()) return;
    setLetter({
      name: name.trim(),
      zodiac: zodiac || pick(zodiacSigns),
      battalion: pick(battalions),
      weapon: pick(weapons),
      rank: pick(ranks),
      serialNo: genSerial(),
      orderNo: genOrder(),
      reportTime: pick(reportTimes),
      app: app.trim() || "TikTok",
      age: String(Math.floor(Math.random() * 8) + 19),
      dob: `${Math.floor(Math.random() * 12) + 1}/${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 6) + 1998}`,
      occupation: pick(occupations),
      employer: pick(employers),
      dependents: pick(dependents),
      exemption: pick(exemptions),
    });
  };

  /* ═══ MILITARY MODE RESULT ═══ */
  if (letter && isMil) {
    return (
      <section className="max-w-2xl mx-auto">
        <div className="bg-white border border-[#dfe1e2] rounded">
          {/* Header strip */}
          <div className="bg-[#162e51] text-white px-6 py-3 flex items-center justify-between">
            <div>
              <div className="text-xs text-[#aebfd4] uppercase tracking-widest">Selective Service System</div>
              <div className="font-bold text-sm">REGISTRATION CARD — FORM WW3</div>
            </div>
            <div className="text-right text-xs text-[#aebfd4]">
              <div>Serial: {letter.serialNo}</div>
              <div>Order: {letter.orderNo}</div>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 py-4">
            <div className="bg-[#fef0c8] border-l-4 border-[#ffbe2e] px-4 py-2 mb-4 text-xs text-[#3d4551]">
              <strong>NOTICE:</strong> This registration has been processed. Registrant details below.
            </div>

            <table className="w-full">
              <tbody>
                <GovRow label="Full Name" value={letter.name} />
                <GovRow label="Zodiac Classification" value={letter.zodiac} />
                <GovRow label="Date of Birth" value={letter.dob} />
                <GovRow label="Age" value={letter.age} />
                <GovRow label="Occupation" value={letter.occupation} />
                <GovRow label="Employer" value={letter.employer} />
                <GovRow label="Primary Screen" value={`${letter.app} (avg. 14 hrs/day)`} />
                <GovRow label="Dependents" value={letter.dependents} />
                <GovRow label="Assigned Rank" value={letter.rank} />
                <GovRow label="Assigned Unit" value={letter.battalion} />
                <GovRow label="Issued Equipment" value={letter.weapon} />
                <GovRow label="Report Time" value={letter.reportTime} />
                <GovRow label="Exemption Claim" value={letter.exemption} />
              </tbody>
            </table>

            <div className="mt-4 pt-3 border-t border-[#dfe1e2] text-xs text-[#71767a]">
              <p>I affirm that the above information is true. I also affirm that this will not stop me from posting about it.</p>
              <div className="mt-3 flex justify-between items-end">
                <div>
                  <div className="border-b border-[#71767a] min-w-[160px] pb-1 text-sm text-[#1b1b1b] font-semibold">{letter.name}</div>
                  <div className="text-[10px] text-[#a9aeb1] mt-0.5">Registrant Signature</div>
                </div>
                <div className="text-[10px] text-[#a9aeb1]">D.S.S. Form WW3 (Rev. 3-19-26)</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <button onClick={() => setLetter(null)} className="px-5 py-2 bg-[#005ea2] text-white text-sm font-bold rounded hover:bg-[#1a4480] transition-colors">
            Generate New Registration
          </button>
        </div>
      </section>
    );
  }

  /* ═══ CHAOS MODE RESULT ═══ */
  if (letter) {
    return (
      <section className="relative max-w-2xl mx-auto">
        <div
          className="relative bg-[#e8e0cf] text-[#1a1a1a] p-5 md:p-8 border-[3px] border-[#2a2a2a] shadow-[4px_4px_0px_#000] overflow-hidden"
          style={{
            backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(180,160,120,0.3) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(160,140,100,0.2) 0%, transparent 50%),
              url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          }}
        >
          <div className="absolute top-6 right-8 w-20 h-20 rounded-full border-2 border-[#c4a86e]/30 opacity-40" />
          <div className="flex items-start justify-between mb-4">
            <div><span className="text-[9px] text-[#666]">Form 1 </span><span className="text-[9px] text-[#666] ml-2">{letter.serialNo}</span></div>
            <div className="text-right"><span className="text-[9px] text-[#666]">ORDER NUMBER</span><div className="text-sm font-bold border border-[#555] px-2 py-0.5 mt-0.5">{letter.orderNo}</div></div>
          </div>
          <div className="text-center mb-5">
            <h2 className="text-xl md:text-2xl font-black tracking-[0.15em] uppercase border-b-2 border-t-2 border-[#333] py-1.5">REGISTRATION CARD</h2>
            <p className="text-[8px] text-[#777] mt-1 tracking-wider">(Persons born on or after Jan 1, 1997 and on or before Dec 31, 2006)</p>
          </div>
          <div className="space-y-3 text-[11px] leading-relaxed">
            {[
              { n: "1", l: "Name in full", v: letter.name },
              { n: "2", l: "Zodiac Sign", v: letter.zodiac, sub: "(critical intel)" },
              { n: "4", l: "Occupation or trade", v: letter.occupation },
              { n: "5", l: "By whom employed", v: letter.employer, s: true },
              { n: "6", l: "Primary screen", v: letter.app, sub: "(avg. 14 hrs/day)", s: true },
              { n: "7", l: "Dependents", v: letter.dependents, s: true },
              { n: "8", l: "Assigned rank", v: letter.rank },
              { n: "9", l: "Assigned unit", v: letter.battalion, s: true },
              { n: "10", l: "Standard-issue weapon", v: letter.weapon, s: true },
              { n: "11", l: "Report at", v: letter.reportTime, s: true },
              { n: "12", l: "Do you claim exemption from draft?", v: letter.exemption, s: true },
            ].map((r) => (
              <div key={r.n} className="flex items-end gap-1">
                <span className="font-bold text-xs w-5 flex-shrink-0">{r.n}.</span>
                <span className="text-[9px] uppercase text-[#555] flex-shrink-0">{r.l}</span>
                <span className="flex-1 border-b border-[#888] pb-0.5 ml-1"><Field value={r.v} small={r.s} /></span>
                {r.sub && <span className="text-[8px] text-[#777] italic ml-1">{r.sub}</span>}
              </div>
            ))}
            {/* Row 3 inline */}
            <div className="flex items-end gap-1 flex-wrap -mt-1" style={{ order: -1 }}>
              <span className="font-bold text-xs w-5 flex-shrink-0">3.</span>
              <span className="text-[9px] uppercase text-[#555]">Date of birth</span>
              <span className="border-b border-[#888] pb-0.5 ml-1 min-w-[80px]"><Field value={letter.dob} small /></span>
              <span className="text-[9px] uppercase text-[#555] ml-3">Age</span>
              <span className="border-b border-[#888] pb-0.5 ml-1 min-w-[30px]"><Field value={letter.age} small /></span>
            </div>
          </div>
          <div className="mt-5 pt-3 border-t border-[#999]">
            <p className="text-[9px] text-[#555] mb-3">I affirm that I have verified above answers and that they are true. I also affirm that this will not stop me from posting about it.</p>
            <div className="flex items-end justify-between">
              <div>
                <span className="border-b border-[#888] inline-block min-w-[160px] pb-0.5"><span className="handwritten text-xl text-[#1a1a3a]">{letter.name}</span></span>
                <div className="text-[8px] text-[#777] text-center mt-0.5">(Signature or mark)</div>
              </div>
              <div className="text-right">
                <span className="border-b border-[#888] inline-block min-w-[100px] pb-0.5"><span className="handwritten text-base text-[#1a1a3a]">March 19, 2026</span></span>
                <div className="text-[8px] text-[#777] mt-0.5">(Date)</div>
              </div>
            </div>
          </div>
          <div className="mt-4 flex justify-between text-[8px] text-[#999]"><div>D.S.S. Form WW3<br />(Revised 3-19-26)</div><div>genz-ww3.vercel.app</div></div>
        </div>
        <div className="flex justify-center gap-3 mt-4">
          <button onClick={() => setLetter(null)} className="px-5 py-2 bg-black text-white border-2 border-black font-black text-sm hover:bg-gray-900 transition-colors">GENERATE ANOTHER</button>
        </div>
      </section>
    );
  }

  /* ═══ INPUT FORM ═══ */
  return (
    <section className={isMil ? "max-w-lg mx-auto" : "max-w-lg mx-auto"}>
      <div className={isMil
        ? "bg-white border border-[#dfe1e2] rounded p-6"
        : "bg-black border-4 border-[#FF2D78] p-6 md:p-8"
      }>
        {!isMil && (
          <>
            <h2 className="text-3xl md:text-4xl font-black mb-1">Draft Registration Card</h2>
            <p className="text-gray-400 text-sm mb-6">Just like WW1 &amp; WW2 — but make it Gen Z</p>
          </>
        )}

        <div className="space-y-4">
          <div>
            <label className={`text-xs uppercase tracking-wider block mb-1 ${isMil ? "text-[#1b1b1b] font-semibold" : "font-mono text-gray-500"}`}>
              {isMil ? "Full Legal Name" : "1. Name in full"}
            </label>
            <input
              type="text" value={name} onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className={isMil
                ? "w-full px-4 py-2.5 bg-white border border-[#565c65] rounded text-[#1b1b1b] focus:border-[#005ea2] focus:ring-1 focus:ring-[#005ea2] outline-none text-sm"
                : "w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#FF2D78] outline-none transition-colors"
              }
            />
          </div>
          <div>
            <label className={`text-xs uppercase tracking-wider block mb-1 ${isMil ? "text-[#1b1b1b] font-semibold" : "font-mono text-gray-500"}`}>
              {isMil ? "Astrological Classification" : "2. Zodiac sign (critical intel)"}
            </label>
            <select
              value={zodiac} onChange={(e) => setZodiac(e.target.value)}
              className={isMil
                ? "w-full px-4 py-2.5 bg-white border border-[#565c65] rounded text-[#1b1b1b] focus:border-[#005ea2] focus:ring-1 focus:ring-[#005ea2] outline-none text-sm"
                : "w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#FF2D78] outline-none transition-colors"
              }
            >
              <option value="">Select classification...</option>
              {zodiacSigns.map((z) => (<option key={z} value={z}>{z}</option>))}
            </select>
          </div>
          <div>
            <label className={`text-xs uppercase tracking-wider block mb-1 ${isMil ? "text-[#1b1b1b] font-semibold" : "font-mono text-gray-500"}`}>
              {isMil ? "Primary Digital Platform (Optional)" : "3. Primary screen (optional)"}
            </label>
            <input
              type="text" value={app} onChange={(e) => setApp(e.target.value)}
              placeholder={isMil ? "e.g., TikTok, Instagram" : "TikTok, Instagram, etc."}
              className={isMil
                ? "w-full px-4 py-2.5 bg-white border border-[#565c65] rounded text-[#1b1b1b] focus:border-[#005ea2] focus:ring-1 focus:ring-[#005ea2] outline-none text-sm"
                : "w-full px-4 py-3 bg-gray-900 border-2 border-gray-700 text-white font-mono focus:border-[#FF2D78] outline-none transition-colors"
              }
            />
          </div>
          <button
            onClick={generate} disabled={!name.trim()}
            className={isMil
              ? "w-full py-2.5 bg-[#005ea2] text-white font-bold text-sm rounded hover:bg-[#1a4480] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              : "w-full py-3 bg-[#FF2D78] text-white font-black text-lg border-2 border-[#FF2D78] hover:bg-[#ff1566] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            }
          >
            {isMil ? "Submit Registration" : "GENERATE MY DRAFT CARD"}
          </button>
        </div>
      </div>
    </section>
  );
}
