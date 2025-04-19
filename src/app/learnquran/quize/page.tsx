"use client";
import React, { useState, useEffect } from "react";

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

    useEffect(() => {
        // Only runs in the browser
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
        <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen p-6 transition-all relative`}>
            <div className={`flex justify-between items-center mb-6 px-4 py-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
                <h1 className="text-2xl font-bold">📚 Quiz Exams</h1>
                <button
                    onClick={() => setDarkMode(!darkMode)}
                    className={`p-2 text-xl rounded-full transition-all duration-300 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
                >
                    {darkMode ? "🌙" : "🌞"}
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {quizData.map((quiz) => {
                    const quizSummary = quizSummaries[quiz.id];
                    const progress = quizSummary
                        ? `${quizSummary.correct}/${quizSummary.totalQuestions}`
                        : "Not Taken";

                    return (
                        <div
                            key={quiz.id}
                            className={`rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ${
                                darkMode ? "bg-gray-800" : "bg-gray-100"
                            }`}
                        >
                            <div className="relative p-4">
                                <div className="mb-4">
                                    <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                                        <span>Progress:</span>
                                        <span>{progress}</span>
                                    </div>
                                    <div className={`h-2 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-200"}`}>
                                        {quizSummary && (
                                            <div
                                                className={`h-full rounded-full ${darkMode ? "bg-green-500" : "bg-green-400"}`}
                                                style={{
                                                    width: `${(quizSummary.correct / quizSummary.totalQuestions) * 100}%`,
                                                }}
                                            ></div>
                                        )}
                                    </div>
                                </div>

                                <h2 className="text-xl font-semibold">{quiz.title}</h2>
                                <p className="text-sm mt-1">{quiz.description}</p>
                                <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                                    <p>⏱ Duration: {quiz.duration}</p>
                                    <p>Total Questions: {quiz.totalQuestions}</p>
                                </div>

                                <div className="mt-4 text-center">
                                    {quiz.link ? (
                                        <a
                                            href={quiz.link}
                                            className="inline-block py-2 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all"
                                        >
                                            Start Quiz
                                        </a>
                                    ) : (
                                        <button
                                            className={`py-2 px-6 rounded-full font-semibold transition-all ${
                                                darkMode
                                                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                                                    : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"
                                            }`}
                                        >
                                            No Link Available
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <button
                onClick={resetProgress}
                className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition"
            >
                🗑️ Reset All Progress
            </button>
        </div>
    );
};

export default QuizCards;
