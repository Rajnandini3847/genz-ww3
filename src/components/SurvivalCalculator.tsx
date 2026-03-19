"use client";

import { useState } from "react";
import { survivalQuestions, survivalRatings } from "@/lib/content";

export default function SurvivalCalculator() {
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (score: number) => {
    const newAnswers = [...answers, score];
    setAnswers(newAnswers);

    if (currentQ + 1 >= survivalQuestions.length) {
      setShowResult(true);
    } else {
      setCurrentQ(currentQ + 1);
    }
  };

  const reset = () => {
    setCurrentQ(0);
    setAnswers([]);
    setShowResult(false);
  };

  const totalScore = answers.reduce((a, b) => a + b, 0);
  const rating =
    survivalRatings.find((r) => totalScore >= r.min && totalScore <= r.max) ||
    survivalRatings[0];
  const pct = Math.round(
    (totalScore / (survivalQuestions.length * 10)) * 100
  );

  if (showResult) {
    return (
      <section className="max-w-lg mx-auto">
        {/* Shareable result card */}
        <div className="bg-black border-4 border-[#EEFF00] p-6 md:p-8 text-center">
          <div className="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-4">
            WW3 Survival Assessment
          </div>

          <div className="text-6xl mb-3">{rating.emoji}</div>

          <div className="text-3xl font-black text-[#EEFF00] mb-2">
            {rating.title}
          </div>

          <p className="text-gray-400 text-sm max-w-md mx-auto mb-4 leading-relaxed">
            {rating.desc}
          </p>

          {/* Survival bar */}
          <div className="max-w-xs mx-auto mb-4">
            <div className="flex justify-between text-[10px] font-mono text-gray-600 mb-1">
              <span>COOKED</span>
              <span>MAIN CHARACTER</span>
            </div>
            <div className="h-4 bg-gray-900 border-2 border-gray-700 overflow-hidden">
              <div
                className="h-full transition-all duration-1000"
                style={{
                  width: `${pct}%`,
                  background: `linear-gradient(90deg, #ef4444, #eab308, #22c55e)`,
                }}
              />
            </div>
            <div className="text-center mt-1.5">
              <span className="text-2xl font-black font-mono text-white">
                {pct}%
              </span>
              <span className="text-xs text-gray-500 ml-1">survival chance</span>
            </div>
          </div>

          <div className="bg-gray-900 border-2 border-gray-800 p-3 mb-4">
            <span className="text-[10px] font-mono text-gray-500">
              ASSIGNED ROLE:
            </span>
            <div className="font-black text-sm text-white mt-0.5">
              {rating.role}
            </div>
          </div>

          <div className="text-[10px] text-gray-600 mb-4">
            genz-ww3.vercel.app
          </div>

          <button
            onClick={reset}
            className="px-6 py-2 bg-[#EEFF00] text-black font-black text-sm hover:bg-[#ddee00] transition-colors"
          >
            RETAKE ASSESSMENT
          </button>
        </div>
      </section>
    );
  }

  const question = survivalQuestions[currentQ];

  return (
    <section className="max-w-lg mx-auto">
      <div className="bg-black border-4 border-[#EEFF00] p-6 md:p-8">
        <h2 className="text-3xl md:text-4xl font-black mb-1">
          Survival Calculator
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Would you survive? (spoiler: probably not)
        </p>

        {/* Progress */}
        <div className="flex gap-1 mb-4">
          {survivalQuestions.map((_, i) => (
            <div
              key={i}
              className={`h-1.5 flex-1 transition-colors ${
                i < currentQ
                  ? "bg-[#EEFF00]"
                  : i === currentQ
                  ? "bg-[#EEFF00]/40"
                  : "bg-gray-800"
              }`}
            />
          ))}
        </div>

        <div className="text-[10px] font-mono text-gray-500 mb-2">
          QUESTION {currentQ + 1} OF {survivalQuestions.length}
        </div>

        <h3 className="text-xl font-black mb-4">{question.question}</h3>

        <div className="space-y-2">
          {question.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => handleAnswer(opt.score)}
              className="w-full text-left px-4 py-3 bg-gray-900 border-2 border-gray-800 hover:border-[#EEFF00] font-mono text-sm transition-colors"
            >
              {opt.text}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
