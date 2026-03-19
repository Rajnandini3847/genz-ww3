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
  const rating = survivalRatings.find(
    (r) => totalScore >= r.min && totalScore <= r.max
  ) || survivalRatings[0];
  const pct = Math.round(
    (totalScore / (survivalQuestions.length * 10)) * 100
  );

  if (showResult) {
    return (
      <section className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-gray-900 via-gray-900 to-green-950/30 p-6 md:p-8">
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
        <div className="relative text-center">
          <h2 className="text-2xl md:text-3xl font-black mb-6">
            Your Survival Rating
          </h2>

          <div className="text-6xl mb-3">{rating.emoji}</div>
          <div className="text-3xl font-black bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
            {rating.title}
          </div>
          <p className="text-gray-400 text-sm max-w-md mx-auto mb-4">
            {rating.desc}
          </p>

          <div className="w-full max-w-xs mx-auto mb-6">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Cooked</span>
              <span>Main Character</span>
            </div>
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 transition-all duration-1000"
                style={{ width: `${pct}%` }}
              />
            </div>
            <div className="text-center mt-1 text-sm font-mono text-green-400">
              {pct}% survival chance
            </div>
          </div>

          <button
            onClick={reset}
            className="px-6 py-2.5 rounded-full bg-green-500/20 border border-green-500/40 text-green-300 text-sm font-semibold hover:bg-green-500/30 transition-colors"
          >
            🔄 Try Again
          </button>
        </div>
      </section>
    );
  }

  const question = survivalQuestions[currentQ];

  return (
    <section className="relative overflow-hidden rounded-2xl border border-green-500/20 bg-gradient-to-br from-gray-900 via-gray-900 to-green-950/30 p-6 md:p-8">
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-green-500/10 rounded-full blur-3xl" />
      <div className="relative">
        <h2 className="text-2xl md:text-3xl font-black mb-1">
          Vibe Check Survival Calculator
        </h2>
        <p className="text-gray-400 text-sm mb-6">
          Would you survive? (Spoiler: probably not)
        </p>

        <div className="mb-4">
          <div className="flex gap-1 mb-4">
            {survivalQuestions.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < currentQ
                    ? "bg-green-500"
                    : i === currentQ
                    ? "bg-green-500/50"
                    : "bg-gray-700"
                }`}
              />
            ))}
          </div>

          <div className="text-xs text-gray-500 mb-2">
            Question {currentQ + 1} of {survivalQuestions.length}
          </div>
          <h3 className="text-xl font-bold mb-4">{question.question}</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {question.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleAnswer(opt.score)}
                className="text-left px-4 py-3 rounded-xl bg-gray-800/60 border border-gray-700/50 hover:border-green-500/40 hover:bg-green-500/10 transition-all text-sm font-medium"
              >
                {opt.text}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
