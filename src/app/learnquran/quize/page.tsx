"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

// Sample Quiz Data
const quizData = [
  {
    id: "quiz-latter",
    title: "অক্ষর পরিচিতি",
    description: "Learn the letters of the Arabic alphabet.",
    duration: "25 mins",
    totalQuestions: 29,
    link: "/learnquran/quize/latter",
  },
  {
    id: "quiz-latterform",
    title: "অক্ষরের ভিন্নরূপ পরিচিতি",
    description: "Identify different forms of Arabic letters.",
    duration: "25 mins",
    totalQuestions: 28,
    link: "/learnquran/quize/latterform",
  },
  {
    id: "harkatquiz",
    title: "হারাকাত",
    description: "কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।",
    duration: "12 mins",
    totalQuestions: 12,
    link: "/learnquran/quize/harkatquiz",
  },
  {
    id: "tashdid",
    title: "তাশদীদ পরিচিতি",
    description: "কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।",
    duration: "5 mins",
    totalQuestions: 5,
    link: "/learnquran/quize/harkat/tashdid",
  },
  {
    id: "prac",
    title: "প্রাকটিস পরীক্ষা",
    description: "কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।",
    duration: "10 mins",
    totalQuestions: 10,
    link: "/learnquran/quize/harkat/practice",
  },
  {
    id: "maad",
    title: "মাদ পরিচিতি",
    description: "কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।",
    duration: "11 mins",
    totalQuestions: 11,
    link: "/learnquran/quize/maad",
  },
  {
    id: "tajweed",
    title: "তাজবীদ পরিচিতি",
    description: "কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।",
    duration: "14 mins",
    totalQuestions: 14,
    link: "/learnquran/quize/tajweed",
  },
  {
    id: "tajweed2",
    title: "তাজবীদ পরিচিতি ২",
    description: "কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।",
    duration: "5 mins",
    totalQuestions: 5,
    link: "/learnquran/quize/tajweed2",
  },
];

interface QuizSummary {
  totalQuestions: number;
  correct: number;
  wrong: number;
  unanswered: number;
  timestamp: string;
}

const QuizCards = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [quizSummaries, setQuizSummaries] = useState<Record<string, QuizSummary | null>>({});
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const summaries: Record<string, QuizSummary | null> = {};
    quizData.forEach((quiz) => {
      const storedSummary = localStorage.getItem(quiz.id);
      summaries[quiz.id] = storedSummary ? JSON.parse(storedSummary) : null;
    });
    setQuizSummaries(summaries);
  }, []);

  const resetProgress = () => {
    if (window.confirm("Are you sure you want to reset all quiz progress?")) {
      quizData.forEach((quiz) => {
        localStorage.removeItem(quiz.id);
      });
      alert("All quiz progress has been reset!");
      window.location.reload();
    }
  };

  return (
    <div>
      <Navbar setNavHeight={setNavHeight} />
      <div
        className={`transition-all min-h-screen pt-[${navHeight}px] ${
          darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-b from-emerald-50 to-white text-gray-800"
        }`}
        style={{ paddingTop: `${navHeight}px` }}
      >
        <div className="max-w-7xl mx-auto px-4 py-10">
          <div
            className={`flex justify-between items-center mb-8 p-4 rounded-lg shadow-md ${
              darkMode ? "bg-emerald-800" : "bg-emerald-100"
            }`}
          >
            <h1 className="text-3xl font-extrabold text-emerald-800 dark:text-yellow-300 font-serif tracking-wide">
              🌙 কুরআন শিক্ষা কুইজ
            </h1>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`text-xl px-4 py-2 rounded-full transition-all duration-300 shadow ${
                darkMode ? "bg-yellow-500 text-gray-900" : "bg-gray-200 text-gray-800"
              }`}
            >
              {darkMode ? "☀️ Light" : "🌙 Dark"}
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {quizData.map((quiz) => {
              const quizSummary = quizSummaries[quiz.id];
              const progress = quizSummary ? `${quizSummary.correct}/${quizSummary.totalQuestions}` : "Not Taken";
              const progressPercent = quizSummary
                ? (quizSummary.correct / quizSummary.totalQuestions) * 100
                : 0;

              return (
                <div
                  key={quiz.id}
                  className={`rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.03] transition duration-300 border ${
                    darkMode ? "bg-gray-800 border-gray-700" : "bg-white border-emerald-200"
                  }`}
                >
                  <div className="p-6">
                    <div className="mb-4">
                      <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                        <span>📘 Progress:</span>
                        <span>{progress}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-300 dark:bg-gray-700 rounded-full mt-1">
                        <div
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                    <h2 className="text-xl font-bold text-emerald-700 dark:text-yellow-300">{quiz.title}</h2>
                    <p className="text-sm mt-1 mb-2">{quiz.description}</p>
                    <div className="text-sm text-gray-500 dark:text-gray-400 space-y-1">
                      <p>⏱ সময়কাল: {quiz.duration}</p>
                      <p>প্রশ্ন সংখ্যা: {quiz.totalQuestions}</p>
                    </div>

                    <div className="mt-5 text-center">
                      {quiz.link ? (
                        <a
                          href={quiz.link}
                          className="inline-block w-full py-2 px-4 text-white text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 rounded-full transition-all"
                        >
                          কুইজ দিন
                        </a>
                      ) : (
                        <button
                          disabled
                          className="w-full py-2 px-4 text-sm rounded-full bg-gray-400 text-white cursor-not-allowed"
                        >
                          লিংক নেই
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <button
          onClick={resetProgress}
          className="fixed bottom-5 right-5 z-50 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full font-semibold shadow-lg transition"
        >
          🗑️ Reset All Progress
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default QuizCards;
