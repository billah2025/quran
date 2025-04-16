"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";

const questions = 
    [
        {
            "id": 1,
            "question": "নিচের কোন শব্দে গুন্না করা ওয়াজিব?",
            "options": [
                "اِنَّ",
                "الَّذِ",
                "فَہُمۡ",
                "اعۡبُدُ"
            ],
            "ansIndex": 0,
            "audioName": null
        },
        {
            "id": 2,
            "question": "নুন সাকিনের পর বা থাকলে নুন এর উচ্চারণ কেমন?",
            "options": [
                "ن",
                "ت",
                "ب",
                "م"
            ],
            "ansIndex": 3,
            "audioName": null
        },
        {
            "id": 3,
            "question": "কোন অক্ষরের পুর্বে নুন সাকিনের উচ্চারণ অনেশ্বর(ং) এর মত?",
            "options": [
                "ب",
                "ي",
                "ق",
                "ل"
            ],
            "ansIndex": 2,
            "audioName": null
        },
        {
            "id": 4,
            "question": "সাকিন থাকলে নিচের কোন অক্ষরের উচ্চারণ প্রতিদ্ধনীর মত হয়?",
            "options": [
                "ن",
                "ب",
                "ع",
                "ف"
            ],
            "ansIndex": 1,
            "audioName": null
        },
        {
            "id": 5,
            "question": "গুন্না ওয়াজিব নিচের কোন শব্দে?",
            "options": [
                "ثُمَّ",
                "قَبۡلِہِمۡ",
                "عِدَّتۡ",
                "یُفۡسِدُ"
            ],
            "ansIndex": 0,
            "audioName": null
        },
        {
            "id": 6,
            "question": "কোন অক্ষরের পুর্বে নুন সাকিনের উচ্চারণ অনেশ্বর(ং) এর মত?",
            "options": [
                "م",
                "ش",
                "و",
                "ر"
            ],
            "ansIndex": 1,
            "audioName": null
        },
        {
            "id": 7,
            "question": "সাকিন থাকলে নিচের কোন অক্ষরের উচ্চারণ প্রতিদ্ধনীর মত হয়?",
            "options": [
                "ت",
                "ض",
                "ج",
                "غ"
            ],
            "ansIndex": 2,
            "audioName": null
        },
        {
            "id": 8,
            "question": "কোন অক্ষরের পুর্বে নুন সাকিনের উচ্চারণ অনেশ্বর(ং) এর মত?",
            "options": [
                "ث",
                "ح",
                "ء",
                "ة"
            ],
            "ansIndex": 0,
            "audioName": null
        },
        {
            "id": 9,
            "question": "সাকিন থাকলে নিচের কোন অক্ষরের উচ্চারণ প্রতিদ্ধনীর মত হয়?",
            "options": [
                "ك",
                "ذ",
                "ش",
                "د"
            ],
            "ansIndex": 3,
            "audioName": null
        },
        {
            "id": 10,
            "question": "কোন অক্ষরের পুর্বে নুন সাকিনের উচ্চারণ অনেশ্বর(ং) এর মত?",
            "options": [
                "ؤ",
                "ص",
                "ن",
                "خ"
            ],
            "ansIndex": 1,
            "audioName": null
        },
        {
            "id": 11,
            "question": "সাকিন থাকলে নিচের কোন অক্ষরের উচ্চারণ প্রতিদ্ধনীর মত হয়?",
            "options": [
                "ق",
                "ظ",
                "ل",
                "ت"
            ],
            "ansIndex": 0,
            "audioName": null
        },
        {
            "id": 12,
            "question": "কোন অক্ষরের পুর্বে নুন সাকিনের উচ্চারণ অনেশ্বর(ং) এর মত?",
            "options": [
                "ب",
                "غ",
                "ف",
                "م"
            ],
            "ansIndex": 2,
            "audioName": null
        },
        {
            "id": 13,
            "question": "সাকিন থাকলে নিচের কোন অক্ষরের উচ্চারণ প্রতিদ্ধনীর মত হয়?",
            "options": [
                "ف",
                "ي",
                "ز",
                "ط"
            ],
            "ansIndex": 3,
            "audioName": null
        },
        {
            "id": 14,
            "question": "কোন অক্ষরের পুর্বে নুন সাকিনের উচ্চারণ অনেশ্বর(ং) এর মত?",
            "options": [
                "غ",
                "ت",
                "م",
                "ب"
            ],
            "ansIndex": 1,
            "audioName": null
        }
    ]
;

export default function QuizPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState( 12 * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const current = questions[currentIndex];
  const total = questions.length;
  const answered = Object.keys(answers).length;
  const notAnswered = total - answered;
  const correct = questions.filter((q) => answers[q.id] === q.ansIndex).length;
  const wrong = questions.filter((q) => answers[q.id] !== undefined && answers[q.id] !== q.ansIndex).length;

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  useEffect(() => {
    const currentBtn = buttonRefs.current[currentIndex];
    const container = scrollContainerRef.current;
    if (currentBtn && container) {
      const containerRect = container.getBoundingClientRect();
      const btnRect = currentBtn.getBoundingClientRect();
      const offset = btnRect.left - containerRect.left - container.clientWidth / 2 + btnRect.width / 2;
      container.scrollBy({ left: offset, behavior: "smooth" });
    }
  }, [currentIndex]);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    let startX = 0;
    let endX = 0;
    const handleTouchStart = (e: TouchEvent) => { startX = e.touches[0].clientX; };
    const handleTouchMove = (e: TouchEvent) => { endX = e.touches[0].clientX; };
    const handleTouchEnd = () => {
      const diff = startX - endX;
      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentIndex < questions.length - 1) goToQuestion(currentIndex + 1);
        else if (diff < 0 && currentIndex > 0) goToQuestion(currentIndex - 1);
      }
    };
    container.addEventListener("touchstart", handleTouchStart);
    container.addEventListener("touchmove", handleTouchMove);
    container.addEventListener("touchend", handleTouchEnd);
    return () => {
      container.removeEventListener("touchstart", handleTouchStart);
      container.removeEventListener("touchmove", handleTouchMove);
      container.removeEventListener("touchend", handleTouchEnd);
    };
  }, [currentIndex]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (darkMode) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [darkMode]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          finishExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isFinished) {
      localStorage.setItem("quiz-result", JSON.stringify({ answers, questions }));
    }
  }, [isFinished]);

  const handleOptionClick = (index: number) => {
    const updatedAnswers = { ...answers, [current.id]: index };
    setAnswers(updatedAnswers);
    if (currentIndex < total - 1) {
      setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
    } else {
      finishExam();
    }
  };

  const finishExam = () => {
    const totalAnswered = Object.keys(answers).length;
    if (totalAnswered === 0) {
      alert("⚠️ Exam finished! You didn't answer any questions.");
    } else {
      alert("✅ Exam finished!");
    }
    setIsFinished(true);
  };

  const goToQuestion = (index: number) => setCurrentIndex(index);
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60).toString().padStart(2, "0")}:${(seconds % 60).toString().padStart(2, "0")}`;

  if (isFinished) {
    return (
      <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 transition-colors duration-300">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold">📊 Exam Summary</h1>
          <button onClick={() => setDarkMode((prev) => !prev)} className="mt-2 text-xs px-2 py-1 bg-gray-300 text-black rounded">
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
        <div className="flex justify-center items-center mb-6">
          <ResponsiveContainer width={200} height={200}>
            <PieChart>
              <Pie dataKey="value" data={[
                { name: "Correct", value: correct, fill: "#10B981" },
                { name: "Wrong", value: wrong, fill: "#EF4444" },
                { name: "Unanswered", value: total - correct - wrong, fill: "#9CA3AF" },
              ]} cx="50%" cy="50%" innerRadius={50} outerRadius={80} label />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid gap-4">
          {questions.map((q, index) => (
            <div key={q.id} className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h2 className="font-semibold text-lg">Q{index + 1}: {q.question}</h2>
                {q.audioName && (
                  <button
                    onClick={() => new Audio(`/audio/${q.audioName}`).play()}
                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                  >▶️ Play</button>
                )}
              </div>
              <p>Your Answer: <span className={answers[q.id] === q.ansIndex ? "text-green-500 font-bold" : "text-red-500 font-bold"}>
                {answers[q.id] !== undefined ? q.options[answers[q.id]] : "No Answer"}
              </span></p>
              <p>Correct Answer: <strong>{q.options[q.ansIndex]}</strong></p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button onClick={() => {
            setIsFinished(false);
            setAnswers({});
            setCurrentIndex(0);
            setTimeLeft(180);
          }} className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold shadow hover:bg-yellow-300 transition">
            🔁 Restart Exam
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 text-white relative p-4">
      <h1 className="text-2xl font-bold text-center m-8">📝 তাজবীদ পরিচিতি</h1>
      <div className="flex justify-between items-center mb-6 p-4 bg-white/10 rounded-xl shadow backdrop-blur-md">
        <div>
          <p className="bg-green-400 text-black px-3 py-1 rounded-full mb-1 font-semibold">✅ Answered: {answered}</p>
          <p className="bg-red-400 text-black px-3 py-1 rounded-full font-semibold">❌ Not Answered: {notAnswered}</p>
        </div>
        <div className="text-right">
          <p className="text-sm">Timer</p>
          <p className="text-xl font-mono bg-white text-black px-4 py-1 rounded shadow">{formatTime(timeLeft)}</p>
          <button onClick={() => setDarkMode((prev) => !prev)} className="mt-2 text-xs px-2 py-1 bg-gray-300 text-black rounded">
            {darkMode ? "🌞 Light" : "🌙 Dark"}
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg mb-6 text-center max-w-3xl mx-auto"
        >
          <h2 className="text-xl font-bold mb-4">{current.question}</h2>
          {current.audioName && (
            <button onClick={() => new Audio(`/audio/${current.audioName}`).play()} className="mb-6 px-6 py-2 rounded-full bg-yellow-300 text-black font-bold hover:scale-105 transition">
              🔊 অডিও শুনুন
            </button>
          )}
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(i)}
                className="bg-indigo-300 text-black text-5xl  py-4 rounded-xl hover:bg-indigo-400 transition"
                style={{ fontFamily: 'CustomFont, sans-serif' }} // Apply your custom font here
              >
                {opt}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div ref={scrollContainerRef} className="overflow-x-auto whitespace-nowrap bg-white/20 p-3 rounded-xl backdrop-blur-md mb-28 scroll-smooth no-scrollbar">
        <div className="inline-flex space-x-2">
          {questions.map((q, index) => (
            <button
              key={q.id}
              ref={(el) => {
                buttonRefs.current[index] = el;
              }}
              onClick={() => goToQuestion(index)}
              className={`min-w-[2.5rem] min-h-[2.5rem] rounded-full border-2 text-lg font-bold flex items-center justify-center transition-colors duration-200 
      ${currentIndex === index ? "ring-4 ring-yellow-400" : ""} 
      ${answers[q.id] !== undefined ? "bg-green-400 border-green-600 text-black" : "bg-white border-yellow-400 text-black"}`}
            >
              {index + 1}
            </button>
          ))}


        </div>
      </div>

      <button onClick={() => {
        const isConfirmed = window.confirm("Are you sure you want to finish the exam?");
        if (isConfirmed) finishExam();
      }} className="fixed bottom-4 right-4 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition">
        ✅ Finish Exam
      </button>
    </div>
  );
}
