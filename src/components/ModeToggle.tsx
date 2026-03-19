"use client";

import { useTheme } from "@/lib/ThemeContext";

export default function ModeToggle() {
  const { isMil, toggle } = useTheme();

  return (
    <button
      onClick={toggle}
      className={`fixed top-3 right-3 z-[200] flex items-center gap-2 px-3 py-1.5 text-xs font-bold transition-all ${
        isMil
          ? "bg-[#162e51] text-white border border-[#005ea2] rounded shadow-md font-[\'Source_Sans_3\',sans-serif]"
          : "bg-black text-[#00FF66] border-2 border-[#00FF66] font-mono"
      }`}
    >
      {isMil ? (
        <>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-[#ffbe2e]">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
          MILITARY MODE
        </>
      ) : (
        <>
          <span>⚡</span>
          CHAOS MODE
        </>
      )}
    </button>
  );
}
