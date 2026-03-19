"use client";

import { useState } from "react";
import { useTheme } from "@/lib/ThemeContext";

interface WeaponType {
  id: string;
  name: string;
  milName: string;
  desc: string;
  funFact: string;
  icon: string; // only chaos mode
}

const weaponTypes: WeaponType[] = [
  { id: "tanks", name: "Tanks", milName: "Main Battle Tanks", desc: "Heavily armored ground vehicles with large-caliber guns. The backbone of ground warfare since WW1. Modern tanks like the US M1 Abrams or Russian T-90 weigh ~60 tons and can hit targets 3+ miles away.", funFact: "A single M1 Abrams costs $10M — or about 2 million Stanley cups", icon: "xe" },
  { id: "fighters", name: "Fighter Jets", milName: "Fighter/Interceptor Aircraft", desc: "Fast combat aircraft designed for air-to-air combat and ground strikes. An F-35 can fly at 1,200 mph (Mach 1.6) and costs $80M per unit. The F-22 Raptor is nearly invisible to radar.", funFact: "One F-35 costs more than every influencer's ring light combined", icon: "xj" },
  { id: "helis", name: "Attack Helicopters", milName: "Rotary-Wing Attack Aircraft", desc: "Armed helicopters like the AH-64 Apache carry Hellfire missiles and a 30mm chain gun. They can hover, fly nap-of-the-earth, and engage armor from miles away.", funFact: "An Apache's targeting system can track 128 targets simultaneously — more than your following list", icon: "xh" },
  { id: "carriers", name: "Aircraft Carriers", milName: "Fleet Carriers", desc: "Floating cities that launch jets from the ocean. A US Nimitz-class carrier is 1,092 feet long, carries 60+ aircraft, and has a crew of 5,000. It's nuclear-powered and never needs to refuel.", funFact: "An aircraft carrier has its own zip code, Starbucks, and more square footage than your apartment building", icon: "xc" },
  { id: "subs", name: "Submarines", milName: "Submarine Fleet", desc: "Underwater warships. Nuclear subs can stay submerged for months and carry ballistic missiles that can hit targets 7,000+ miles away. They're the ultimate stealth weapon.", funFact: "A submarine crew goes months without sunlight — basically gamers with missiles", icon: "xs" },
  { id: "destroyers", name: "Destroyers", milName: "Guided-Missile Destroyers", desc: "Fast, heavily armed warships that protect carrier groups. An Arleigh Burke destroyer carries 90+ Tomahawk cruise missiles and advanced Aegis radar that tracks hundreds of targets.", funFact: "A destroyer's radar can track a baseball-sized object from 100+ miles — no sneaking snacks", icon: "xd" },
  { id: "aircraft", name: "Total Aircraft", milName: "Total Military Aircraft", desc: "Everything that flies — fighters, bombers, transports, trainers, drones, helicopters. Air superiority often decides wars. The US has more military aircraft than the next 5 countries combined.", funFact: "The US military has more aircraft than most countries have cars in their capital", icon: "xa" },
  { id: "armor", name: "Armored Vehicles", milName: "Armored Fighting Vehicles", desc: "Everything from APCs (troop carriers) to IFVs (infantry fighting vehicles). These move troops safely under fire. The US has 400,000+ — more than some countries have regular cars.", funFact: "The US has so many armored vehicles they could give one to every resident of Miami", icon: "xv" },
];

interface CountryData {
  id: string;
  name: string;
  flag: string;
  rank: number;
  powerIndex: number;
  personnel: number;
  budget: number; // billions USD
  stats: Record<string, number>;
}

const countries: CountryData[] = [
  { id: "us", name: "United States", flag: "\ud83c\uddfa\ud83c\uddf8", rank: 1, powerIndex: 0.0741, personnel: 1328000, budget: 895, stats: { tanks: 4666, fighters: 1791, helis: 1024, carriers: 11, subs: 66, destroyers: 83, aircraft: 13032, armor: 409660 } },
  { id: "ru", name: "Russia", flag: "\ud83c\uddf7\ud83c\uddfa", rank: 2, powerIndex: 0.0745, personnel: 1320000, budget: 126, stats: { tanks: 5630, fighters: 861, helis: 556, carriers: 1, subs: 66, destroyers: 13, aircraft: 4237, armor: 126512 } },
  { id: "cn", name: "China", flag: "\ud83c\udde8\ud83c\uddf3", rank: 3, powerIndex: 0.0919, personnel: 2035000, budget: 267, stats: { tanks: 5870, fighters: 1443, helis: 281, carriers: 3, subs: 61, destroyers: 53, aircraft: 3529, armor: 152040 } },
  { id: "in", name: "India", flag: "\ud83c\uddee\ud83c\uddf3", rank: 4, powerIndex: 0.1045, personnel: 1455000, budget: 74, stats: { tanks: 3913, fighters: 476, helis: 79, carriers: 2, subs: 18, destroyers: 13, aircraft: 2183, armor: 163554 } },
  { id: "kr", name: "South Korea", flag: "\ud83c\uddf0\ud83c\uddf7", rank: 5, powerIndex: 0.1416, personnel: 600000, budget: 50, stats: { tanks: 1831, fighters: 242, helis: 113, carriers: 0, subs: 22, destroyers: 14, aircraft: 1540, armor: 117460 } },
  { id: "uk", name: "United Kingdom", flag: "\ud83c\uddec\ud83c\udde7", rank: 6, powerIndex: 0.1443, personnel: 148500, budget: 72, stats: { tanks: 288, fighters: 103, helis: 50, carriers: 2, subs: 10, destroyers: 6, aircraft: 625, armor: 94064 } },
  { id: "fr", name: "France", flag: "\ud83c\uddeb\ud83c\uddf7", rank: 7, powerIndex: 0.1588, personnel: 205000, budget: 64, stats: { tanks: 427, fighters: 223, helis: 67, carriers: 1, subs: 9, destroyers: 11, aircraft: 974, armor: 110784 } },
  { id: "il", name: "Israel", flag: "\ud83c\uddee\ud83c\uddf1", rank: 17, powerIndex: 0.2757, personnel: 170000, budget: 24, stats: { tanks: 1300, fighters: 239, helis: 48, carriers: 0, subs: 6, destroyers: 0, aircraft: 597, armor: 62380 } },
  { id: "ir", name: "Iran", flag: "\ud83c\uddee\ud83c\uddf7", rank: 14, powerIndex: 0.2269, personnel: 580000, budget: 10, stats: { tanks: 2675, fighters: 188, helis: 13, carriers: 0, subs: 25, destroyers: 0, aircraft: 551, armor: 75939 } },
  { id: "sa", name: "Saudi Arabia", flag: "\ud83c\uddf8\ud83c\udde6", rank: 22, powerIndex: 0.3872, personnel: 257000, budget: 76, stats: { tanks: 1062, fighters: 243, helis: 39, carriers: 0, subs: 0, destroyers: 0, aircraft: 897, armor: 12480 } },
];

function formatNumber(n: number): string {
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(n >= 10000 ? 0 : 1) + "K";
  return n.toLocaleString();
}

function BarChart({ value, max, color, isMil }: { value: number; max: number; color: string; isMil: boolean }) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div className={`h-5 w-full ${isMil ? "bg-[#f0f0f0] border border-[#dfe1e2] rounded-sm" : "bg-gray-800 border border-gray-700"}`}>
      <div
        className="h-full transition-all duration-700 rounded-sm flex items-center justify-end pr-1"
        style={{ width: `${Math.max(pct, 2)}%`, background: color }}
      >
        {pct > 15 && (
          <span className={`text-[9px] font-bold ${isMil ? "text-white" : "text-black"}`}>
            {formatNumber(value)}
          </span>
        )}
      </div>
    </div>
  );
}

export default function ArsenalGuide() {
  const { isMil } = useTheme();
  const [selectedWeapon, setSelectedWeapon] = useState<WeaponType>(weaponTypes[0]);
  const [compareMode, setCompareMode] = useState(false);
  const [selectedCountries, setSelectedCountries] = useState<string[]>(["us", "ru", "cn"]);

  const toggleCountry = (id: string) => {
    setSelectedCountries((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : prev.length < 5 ? [...prev, id] : prev
    );
  };

  const maxVal = Math.max(...countries.map((c) => c.stats[selectedWeapon.id] || 0), 1);

  const visibleCountries = compareMode
    ? countries.filter((c) => selectedCountries.includes(c.id))
    : countries;

  const barColor = isMil ? "#005ea2" : "#FF2D78";

  return (
    <section>
      <div className={isMil ? "" : "max-w-4xl mx-auto"}>
        {!isMil && (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-black">KNOW YOUR ARSENAL</h2>
            <p className="text-gray-400 text-sm font-mono mt-1">Because you should probably know what&apos;s out there</p>
          </div>
        )}

        {/* Weapon type selector */}
        <div className={`flex flex-wrap gap-1.5 mb-6 ${isMil ? "" : "justify-center"}`}>
          {weaponTypes.map((w) => (
            <button
              key={w.id}
              onClick={() => setSelectedWeapon(w)}
              className={isMil
                ? `px-3 py-1.5 text-xs font-semibold rounded transition-colors ${selectedWeapon.id === w.id ? "bg-[#005ea2] text-white" : "bg-[#f0f0f0] text-[#005ea2] border border-[#dfe1e2] hover:bg-[#d9e8f6]"}`
                : `px-3 py-1.5 text-xs font-black border-2 transition-colors ${selectedWeapon.id === w.id ? "bg-[#FF2D78] text-black border-[#FF2D78]" : "border-gray-700 text-gray-400 hover:border-gray-500"}`
              }
            >
              {isMil ? w.milName : w.name}
            </button>
          ))}
        </div>

        {/* Description card */}
        <div className={isMil
          ? "bg-[#f0f0f0] border border-[#dfe1e2] rounded p-4 mb-6"
          : "bg-gray-900/50 border-2 border-gray-800 p-4 mb-6"
        }>
          <h3 className={`font-black text-lg mb-1 ${isMil ? "text-[#1b1b1b]" : "text-white"}`}>
            {isMil ? selectedWeapon.milName : selectedWeapon.name}
          </h3>
          <p className={`text-sm leading-relaxed ${isMil ? "text-[#3d4551]" : "text-gray-400"}`}>
            {selectedWeapon.desc}
          </p>
          {!isMil && (
            <p className="text-xs text-[#FF2D78] mt-2 italic">
              {selectedWeapon.funFact}
            </p>
          )}
        </div>

        {/* Compare toggle */}
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs uppercase tracking-wider font-semibold ${isMil ? "text-[#71767a]" : "text-gray-500 font-mono"}`}>
            {isMil ? "Equipment Count by Nation" : "WHO HAS WHAT"}
          </span>
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={isMil
              ? `text-xs px-3 py-1 rounded border ${compareMode ? "bg-[#005ea2] text-white border-[#005ea2]" : "border-[#dfe1e2] text-[#005ea2] hover:bg-[#d9e8f6]"}`
              : `text-xs px-3 py-1 border font-mono ${compareMode ? "bg-[#4D4DFF] text-white border-[#4D4DFF]" : "border-gray-700 text-gray-400 hover:text-white"}`
            }
          >
            {compareMode ? "Show All" : "Compare Mode"}
          </button>
        </div>

        {/* Country selector (compare mode) */}
        {compareMode && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {countries.map((c) => (
              <button
                key={c.id}
                onClick={() => toggleCountry(c.id)}
                className={isMil
                  ? `px-2.5 py-1 text-xs rounded border transition-colors ${selectedCountries.includes(c.id) ? "bg-[#162e51] text-white border-[#162e51]" : "border-[#dfe1e2] text-[#3d4551] hover:border-[#005ea2]"}`
                  : `px-2.5 py-1 text-xs border font-mono transition-colors ${selectedCountries.includes(c.id) ? "bg-white/10 text-white border-white/30" : "border-gray-800 text-gray-600 hover:text-gray-400"}`
                }
              >
                {!isMil && <span className="mr-1">{c.flag}</span>}
                {c.name}
              </button>
            ))}
            <span className={`text-[10px] self-center ${isMil ? "text-[#a9aeb1]" : "text-gray-600"}`}>
              (select up to 5)
            </span>
          </div>
        )}

        {/* Bar chart */}
        <div className="space-y-2">
          {visibleCountries
            .sort((a, b) => (b.stats[selectedWeapon.id] || 0) - (a.stats[selectedWeapon.id] || 0))
            .map((country) => {
              const val = country.stats[selectedWeapon.id] || 0;
              return (
                <div key={country.id} className="flex items-center gap-2">
                  <div className={`w-28 flex-shrink-0 flex items-center gap-1.5 ${isMil ? "" : ""}`}>
                    {!isMil && <span className="text-sm">{country.flag}</span>}
                    <span className={`text-xs font-semibold truncate ${isMil ? "text-[#1b1b1b]" : "text-gray-300"}`}>
                      {country.name}
                    </span>
                  </div>
                  <div className="flex-1">
                    <BarChart value={val} max={maxVal} color={barColor} isMil={isMil} />
                  </div>
                  <span className={`text-xs font-bold w-16 text-right ${isMil ? "text-[#1b1b1b] font-mono" : "text-white font-mono"}`}>
                    {formatNumber(val)}
                  </span>
                </div>
              );
            })}
        </div>

        {/* Quick stats for #1 */}
        {!compareMode && (
          <div className={`mt-6 grid grid-cols-2 md:grid-cols-4 gap-2`}>
            {visibleCountries.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className={isMil
                  ? "bg-[#f0f0f0] border border-[#dfe1e2] rounded p-3 text-center"
                  : "bg-gray-900/50 border border-gray-800 p-3 text-center"
                }
              >
                {!isMil && <div className="text-lg mb-0.5">{c.flag}</div>}
                <div className={`text-xs ${isMil ? "text-[#71767a]" : "text-gray-500"}`}>{c.name}</div>
                <div className={`text-xs mt-1 ${isMil ? "text-[#71767a]" : "text-gray-500"}`}>
                  Rank #{c.rank}
                </div>
                <div className={`text-sm font-black ${isMil ? "text-[#1b1b1b]" : "text-white"}`}>
                  {formatNumber(c.personnel)} troops
                </div>
                <div className={`text-xs ${isMil ? "text-[#005ea2]" : "text-[#00FF66]"}`}>
                  ${c.budget}B budget
                </div>
              </div>
            ))}
          </div>
        )}

        <div className={`mt-4 text-[10px] ${isMil ? "text-[#a9aeb1]" : "text-gray-600"}`}>
          Source: GlobalFirepower.com 2026 Military Strength Rankings. Data reflects active inventory estimates.
        </div>
      </div>
    </section>
  );
}
