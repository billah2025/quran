"use client";
import React, { useState } from "react";
import { FaTrophy } from "react-icons/fa";

// Sample Quiz Data
const quizData = [
  {
    id: 1,
    title: "অক্ষর পরিচিতি",
    description: "Learn the letters of the Arabic alphabet.",
    duration: "25 mins",
    totalQuestions: 29,
    link: "/learnquran/quize/latter",
  },
  {
    id: 2,
    title: "Science Quiz",
    description: "Test your knowledge of science.",
    duration: "45 mins",
    totalQuestions: 29,
    link: null,
  },
  {
    id: 3,
    title: "History Quiz",
    description: "How well do you know history?",
    duration: "40 mins",
    totalQuestions: 29,
    link: null,
  },
  {
    id: 4,
    title: "Geography Quiz",
    description: "Explore the world with this geography quiz.",
    duration: "35 mins",
    totalQuestions: 29,
    link: null,
  },
];

const QuizCards = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={`${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"} min-h-screen p-6 transition-all`}>
      {/* Header with Title and Dark Mode Toggle */}
      <div className={`flex justify-between items-center mb-6 px-4 py-3 rounded-lg ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}>
        <h1 className="text-2xl font-bold">📚 Quiz Exams</h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2 text-xl rounded-full transition-all duration-300 ${darkMode ? "bg-gray-700" : "bg-gray-300"}`}
        >
          {darkMode ? "🌙" : "🌞"}
        </button>
      </div>

      {/* Quiz Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {quizData.map((quiz) => (
          <div
            key={quiz.id}
            className={`rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300 ${darkMode ? "bg-gray-800" : "bg-gray-100"}`}
          >
            <div className="relative p-4">
              {/* Trophy Icon */}
              <div className="absolute top-3 right-3 bg-yellow-400 text-white p-2 rounded-full">
                <FaTrophy size={20} />
              </div>

              {/* Content */}
              <h2 className="text-xl font-semibold">{quiz.title}</h2>
              <p className="text-sm mt-1">{quiz.description}</p>
              <div className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                <p>⏱ Duration: {quiz.duration}</p>
                <p>❓ Total Questions: {quiz.totalQuestions}</p>
              </div>

              {/* Action Button */}
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
                    className={`py-2 px-6 rounded-full font-semibold transition-all ${darkMode ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-yellow-400 hover:bg-yellow-500 text-gray-900"}`}
                  >
                    No Link Available
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizCards;
