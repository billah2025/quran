"use client";
import React, { useState, useEffect } from 'react';
import { FaTrophy } from 'react-icons/fa';
import Link from 'next/link'; // Importing the Link component for navigation

// Simulated Quiz Data with optional link
const quizData = [
  { 
    id: 1, 
    title: ' অক্ষর পরিচিতি', 
    description: 'Learn the letters of the Arabic alphabet.', 
    duration: '25 mins', 
    totalQuestions: 29,
    link: '/learnquran/quize/latter' // Add link for Math quiz
  },
  { 
    id: 2, 
    title: 'Science Quiz', 
    description: 'Test your knowledge of science.', 
    duration: '45 mins', 
    totalQuestions: 29,
    link: null // Add link for Science quiz
  },
  { 
    id: 3, 
    title: 'History Quiz', 
    description: 'How well do you know history?', 
    duration: '40 mins', 
    totalQuestions: 29,
    link: null // No link for History quiz
  },
  { 
    id: 4, 
    title: 'Geography Quiz', 
    description: 'Explore the world with this geography quiz.', 
    duration: '35 mins', 
    totalQuestions: 29,
    link: null // Add link for Geography quiz
  },
];

const QuizPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState<number>(0); // Define the state here

  // Get last exam result from localStorage (if available)
  useEffect(() => {
    const savedResults = localStorage.getItem('quizResults');
    if (savedResults) {
      const result = JSON.parse(savedResults);
      setCorrectAnswers(result.correctAnswers);  // This updates the state with saved correct answers
    }
  }, []);

  // Function to simulate submitting the quiz and saving results
  const finishQuiz = (correct: number) => {
    const result = {
      correctAnswers: correct, // Store the number of correct answers
      totalQuestions: 29,
    };

    // Save result to localStorage (so it's persisted across reloads)
    localStorage.setItem('quizResults', JSON.stringify(result));

    // Update the correctAnswers state to reflect the new result
    setCorrectAnswers(correct);
  };

  // Progress calculation based on the correct answers
  const progress = (correctAnswers / 29) * 100;

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'} min-h-screen transition-all`}>
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-b-lg">
        <h1 className="text-3xl font-bold">Quiz Exams</h1>
        <button
          onClick={toggleDarkMode}
          className={`p-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-300'}`}
        >
          {darkMode ? '🌙' : '🌞'}
        </button>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 p-6">
        {quizData.map((quiz, index) => (
          <div key={quiz.id} className={`transform hover:scale-105 transition duration-300 ${darkMode ? 'bg-gray-800' : 'bg-gray-100'} rounded-lg shadow-lg overflow-hidden`}>
            <div className="relative">
              {/* Trophy Icon */}
              <div className="absolute top-3 right-3 bg-yellow-400 text-white p-2 rounded-full">
                <FaTrophy size={20} />
              </div>

              {/* Quiz Title, Description, Duration, Total Questions */}
              <div className="p-4">
                <h2 className="text-xl font-semibold">{quiz.title}</h2>
                <p className="text-sm text-gray-600">{quiz.description}</p>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Duration: {quiz.duration}</p>
                  <p>Total Questions: {quiz.totalQuestions}</p>
                </div>
              </div>

              {/* Progress Bar */}
              {index === 0 && (
                <div className="p-4">
                  <div className="text-sm text-gray-500">
                    {correctAnswers} out of {quiz.totalQuestions} correct
                  </div>
                  <div className="h-2 bg-gray-300 rounded-full mt-2">
                    <div
                      className={`h-2 rounded-full ${darkMode ? 'bg-green-600' : 'bg-yellow-400'}`}
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              {/* Link Button (if a link exists) */}
              {quiz.link && (
                <div className="p-4 text-center">
                  <a
                    href={quiz.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-2 px-6 rounded-full bg-blue-500 hover:bg-blue-700 text-white font-semibold transition-all"
                  >
                    Start Quiz
                  </a>
                </div>
              )}

              {/* If no link, provide a fallback button to finish quiz */}
              {!quiz.link && (
                <div className="p-4 text-center">
                  <button
                    onClick={() => finishQuiz(5)} // Simulating 5 correct answers
                    className={`py-2 px-6 rounded-full text-white font-semibold ${darkMode ? 'bg-blue-500 hover:bg-blue-600' : 'bg-yellow-400 hover:bg-yellow-500'} transition-all`}
                  >
                    Finish Quiz
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuizPage;
