"use client";

import { useState } from "react";
import { useTheme } from "@/lib/ThemeContext";
import { survivalQuestions, survivalRatings } from "@/lib/content";

export default function SurvivalCalculator() {
  const { isMil } = useTheme();
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);
    if (currentQ + 1 >= survivalQuestions.length) setShowResult(true);
    else setCurrentQ(currentQ + 1);
  };

  const reset = () => { setCurrentQ(0); setAnswers([]); setShowResult(false); };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const rating = survivalRatings.find((r) => totalScore >= r.min && totalScore <= r.max) || survivalRatings[0];
  const pct = Math.round((totalScore / (survivalQuestions.length * 10)) * 100);

  /* ═══ RESULT ═══ */
  if (showResult) {
    return (
      <section className="max-w-lg mx-auto">
        <div className={isMil
          ? "bg-white border border-[#dfe1e2] rounded overflow-hidden"
          : "bg-black border-4 border-[#EEFF00] p-6 md:p-8 text-center"
        }>
          {isMil ? (
            <>
              <div className="bg-[#162e51] text-white px-6 py-3">
                <div className="text-xs text-[#aebfd4] uppercase tracking-widest">Readiness Assessment</div>
                <div className="font-bold">Evaluation Complete</div>
              </div>
              <div className="p-6">
                <div className={`text-center mb-4 px-4 py-3 rounded ${pct > 50 ? "bg-[#ecf3ec] border border-[#00a91c]" : pct > 25 ? "bg-[#fef0c8] border border-[#ffbe2e]" : "bg-[#f4e3db] border border-[#d54309]"}`}>
                  <div className="text-2xl font-black text-[#1b1b1b]">{rating.title}</div>
                  <div className={`text-sm font-bold ${pct > 50 ? "text-[#00a91c]" : pct > 25 ? "text-[#c05600]" : "text-[#d54309]"}`}>
                    Fitness Score: {pct}%
                  </div>
                </div>

                <p className="text-sm text-[#3d4551] mb-4 leading-relaxed">{rating.desc}</p>

                <div className="w-full mb-4">
                  <div className="flex justify-between text-[10px] text-[#71767a] font-semibold uppercase mb-1">
                    <span>Unfit</span><span>Combat Ready</span>
                  </div>
                  <div className="h-4 bg-[#f0f0f0] border border-[#dfe1e2] rounded overflow-hidden">
                    <div className="h-full transition-all duration-1000 rounded" style={{ width: `${pct}%`, background: pct > 50 ? "#00a91c" : pct > 25 ? "#ffbe2e" : "#d54309" }} />
                  </div>
                </div>

                <table className="w-full text-sm mb-4">
                  <tbody>
                    <tr className="border-b border-[#dfe1e2]">
                      <td className="py-1.5 text-xs text-[#71767a] font-semibold uppercase">Assigned MOS</td>
                      <td className="py-1.5 text-[#1b1b1b] font-semibold">{rating.role}</td>
                    </tr>
                    <tr className="border-b border-[#dfe1e2]">
                      <td className="py-1.5 text-xs text-[#71767a] font-semibold uppercase">Raw Score</td>
                      <td className="py-1.5 text-[#1b1b1b]">{totalScore} / {survivalQuestions.length * 10}</td>
                    </tr>
                  </tbody>
                </table>

                <button onClick={reset} className="px-5 py-2 bg-[#005ea2] text-white text-sm font-bold rounded hover:bg-[#1a4480] transition-colors">
                  Retake Evaluation
                </button>
              </div>
            </>
          ) : (
            <>
              <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">WW3 Survival Assessment</div>
              <div className="text-6xl mb-3">{rating.emoji}</div>
              <div className="text-3xl font-black text-[#EEFF00] mb-2">{rating.title}</div>
              <p className="text-gray-400 text-sm max-w-md mx-auto mb-4 leading-relaxed">{rating.desc}</p>
              <div className="max-w-xs mx-auto mb-4">
                <div className="flex justify-between text-[10px] font-mono text-gray-600 mb-1"><span>COOKED</span><span>MAIN CHARACTER</span></div>
                <div className="h-4 bg-gray-900 border-2 border-gray-700 overflow-hidden">
                  <div className="h-full transition-all duration-1000" style={{ width: `${pct}%`, background: "linear-gradient(90deg, #ef4444, #eab308, #22c55e)" }} />
                </div>
                <div className="text-center mt-1.5"><span className="text-2xl font-black font-mono text-white">{pct}%</span><span className="text-xs text-gray-500 ml-1">survival chance</span></div>
              </div>
              <div className="bg-gray-900 border-2 border-gray-800 p-3 mb-4">
                <span className="text-[10px] font-mono text-gray-500">ASSIGNED ROLE:</span>
                <div className="font-black text-sm text-white mt-0.5">{rating.role}</div>
              </div>
              <div className="text-[10px] text-gray-600 mb-4">genz-ww3.vercel.app</div>
              <button onClick={reset} className="px-6 py-2 bg-[#EEFF00] text-black font-black text-sm hover:bg-[#ddee00] transition-colors">RETAKE ASSESSMENT</button>
            </>
          )}
        </div>
      </section>
    );
  }

  /* ═══ QUIZ ═══ */
  const question = survivalQuestions[currentQ];

  return (
    <section className="max-w-lg mx-auto">
      <div className={isMil
        ? "bg-white border border-[#dfe1e2] rounded p-6"
        : "bg-black border-4 border-[#EEFF00] p-6 md:p-8"
      }>
        {!isMil && (
          <>
            <h2 className="text-3xl md:text-4xl font-black mb-1">Survival Calculator</h2>
            <p className="text-gray-400 text-sm mb-6">Would you survive? (spoiler: probably not)</p>
          </>
        )}

        {/* Progress */}
        <div className="flex gap-1 mb-4">
          {survivalQuestions.map((_, i) => (
            <div key={i} className={`h-1.5 flex-1 rounded-sm transition-colors ${
              i < currentQ
                ? (isMil ? "bg-[#005ea2]" : "bg-[#EEFF00]")
                : i === currentQ
                ? (isMil ? "bg-[#73b3e7]" : "bg-[#EEFF00]/40")
                : (isMil ? "bg-[#dfe1e2]" : "bg-gray-800")
            }`} />
          ))}
        </div>

        <div className={`text-[10px] uppercase tracking-wider mb-2 ${isMil ? "text-[#71767a] font-semibold text-xs" : "font-mono text-gray-500"}`}>
          {isMil ? `Evaluation item ${currentQ + 1} of ${survivalQuestions.length}` : `QUESTION ${currentQ + 1} OF ${survivalQuestions.length}`}
        </div>

        <h3 className={`text-xl font-black mb-4 ${isMil ? "text-[#1b1b1b]" : ""}`}>{question.question}</h3>

        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i} onClick={() => handleAnswer(opt.score)}
              className={isMil
                ? "w-full text-left px-4 py-3 bg-[#f0f0f0] border border-[#dfe1e2] rounded text-sm text-[#1b1b1b] hover:border-[#005ea2] hover:bg-[#d9e8f6] transition-colors"
                : "w-full text-left px-4 py-3 bg-gray-900 border-2 border-gray-800 hover:border-[#EEFF00] font-mono text-sm transition-colors"
              }
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
