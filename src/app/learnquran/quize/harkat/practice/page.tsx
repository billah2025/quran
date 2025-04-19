"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, ResponsiveContainer, PieChart, Pie } from "recharts";
import { useCallback } from "react"; // Import useCallback


const questions = [
    
        {
          id: 1,
          audio: "/audio/quizes/kuntum.mp3",
          options: ["کُنۡتُمۡ", "کِنْتُمْ", " کُنْتَمْ", " کِنْتَمْ"],
          answer: "کُنۡتُمۡ",
        },
        {
          id: 2,
          audio: "/audio/quizes/aminu.mp3",
          options: ["اِمًنِوْ", "اِمَنِوْ", "اٰمَنُوْ", " اٰمِنُوۡ"],
          answer: " اٰمِنُوۡ",
        },
        {
          id: 3,
          audio: "/audio/quizes/yalamun.mp3",
          options: ["یَعْلِمَوْنَ", "یَعۡلَمُوۡنَ", "یَعْلَمِوْنَ", "یَعْلَمِوَنْ"],
          answer: "یَعۡلَمُوۡنَ",
        },
        {
          id: 4,
          audio: "/audio/quizes/alaihim.mp3",
          options: ["عَلُیْہِمَ", "عِلَیْہِمُ", "عَلَیۡہِمۡ", "عَلِیْہِمُ"],
          answer: "عَلَیۡہِمۡ",
        },
        {
          id: 5,
          audio: "/audio/quizes/kafirin.mp3",
          options: ["کٰفِرِیْنَ", "کٰفِرُیْنَ", "کٰفَرَیْنَ", "کِفُرَیْنَ"],
          answer: "کٰفِرِیْنَ",
        },
        {
          id: 6,
          audio: "/audio/quizes/qalila.mp3",
          options: ["قَلِیُلَا", "قَلَیْلَا", " قَلِیْلَا", "قَلِیۡلًا"],
          answer: "قَلِیۡلًا",
        },
        {
          id: 7,
          audio: "/audio/quizes/jalimuna.mp3",
          options: ["ظٰلِمُوْنْ", "ظٰلَمُوْنَ", "ظٰلِمُوۡنَ", "ظٰلِمَوْنَ"],
          answer: "ظٰلِمُوۡنَ",
        },
        {
          id: 8,
          audio: "/audio/quizes/anfusahum.mp3",
          options: ["اَنْفُسَہُمْ", "اَنْفُسِہُمْ", "اَنْفُسَہِمْ", "اَنْفُسَہُمَ"],
          answer: "اَنْفُسَہُمْ",
        },
        {
          id: 9,
          audio: "/audio/quizes/mufsidin.mp3",
          options: ["مُفْسِدُیْنَ", "مُفْسِدِیْنَ", "مُفْسِدَیْنَ", "مُفْسَدُیْنَ"],
          answer: "مُفْسِدِیْنَ",
        },
        {
          id: 10,
          audio: "/audio/quizes/yunsaruna.mp3",
          options: ["یُنْصِرُوْنَ", "یَنْصَرُوْنَ", "یُنْصَرِوْنَ", "یُنْصَرُوْنَ"],
          answer: "یُنْصَرُوْنَ",
        },
      
      
];








export default function QuizPage() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeLeft, setTimeLeft] = useState(10* 60);
    const [isFinished, setIsFinished] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const current = questions[currentIndex];
    const total = questions.length;
    const answered = Object.keys(answers).length;
    const notAnswered = total - answered;
    const correct = questions.filter((q) => answers[q.id] === q.answer).length;
    const wrong = questions.filter((q) => answers[q.id] && answers[q.id] !== q.answer).length;

    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);























    // Prevent user from exiting or reloading without finishing exam
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
            e.returnValue = ''; // Required for Chrome to show alert
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
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




    // Swipe handling
    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        let startX = 0;
        let endX = 0;

        const handleTouchStart = (e: TouchEvent) => {
            startX = e.touches[0].clientX;
        };

        const handleTouchMove = (e: TouchEvent) => {
            endX = e.touches[0].clientX;
        };

        const handleTouchEnd = () => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0 && currentIndex < questions.length - 1) {
                    goToQuestion(currentIndex + 1);
                } else if (diff < 0 && currentIndex > 0) {
                    goToQuestion(currentIndex - 1);
                }
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
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

// Memoize the finishExam function
const finishExam = useCallback(() => {
    const totalAnswered = Object.keys(answers).length;
    const correctCount = questions.filter((q) => answers[q.id] === q.answer).length;
    const wrongCount = questions.filter((q) => answers[q.id] && answers[q.id] !== q.answer).length;
    const unansweredCount = total - correctCount - wrongCount;

    // Save quiz summary with a unique ID (e.g., "quiz-latter")
    const quizId = "prac"; // Replace with dynamic quiz ID
    localStorage.setItem(
        quizId,
        JSON.stringify({
            totalQuestions: total,
            correct: correctCount,
            wrong: wrongCount,
            unanswered: unansweredCount,
            timestamp: new Date().toISOString(),
        })
    );

    if (totalAnswered === 0) {
        alert("⚠️ Exam finished! You didn't answer any questions.");
    } else {
        alert("✅ Exam finished!");
    }
    setIsFinished(true);
}, [answers, total]); // Add dependencies

// Update the useEffect hook
useEffect(() => {
    const interval = setInterval(() => {
        setTimeLeft((prev) => {
            if (prev <= 1) {
                clearInterval(interval);
                finishExam(); // Use the memoized function
                return 0;
            }
            return prev - 1;
        });
    }, 1000);
    return () => clearInterval(interval);
}, [finishExam]); // Add finishExam as a dependency







    // 🟡 FIX DARK MODE by toggling `html` class
    useEffect(() => {
        const root = window.document.documentElement;
        if (darkMode) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }
    }, [darkMode]);

    useEffect(() => {
        if (isFinished) {
            localStorage.setItem("quiz-result", JSON.stringify({ answers, questions }));
        }
    }, [isFinished]);


































    const playAudio = () => {
        if (audioRef.current) {
            audioRef.current.play();
        }
    };

    const handleOptionClick = (selected: string) => {
        const qId = current.id;
        const updatedAnswers = { ...answers, [qId]: selected };
        setAnswers(updatedAnswers);

        if (currentIndex < total - 1) {
            setTimeout(() => setCurrentIndex(currentIndex + 1), 300);
        } else {
            finishExam();
        }
    };


    const goToQuestion = (index: number) => {
        setCurrentIndex(index);
    };

    const formatTime = (seconds: number) => {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min.toString().padStart(2, "0")}:${sec.toString().padStart(2, "0")}`;
    };

    // ✅ RESULTS PAGE
    if (isFinished) {




        return (
            <div className="min-h-screen bg-white text-black dark:bg-gray-900 dark:text-white p-4 transition-colors duration-300">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-3xl font-bold">📊 Exam Summary</h1>
                    <button
                        onClick={() => setDarkMode((prev) => !prev)}
                        className="mt-2 text-xs px-2 py-1 bg-gray-300 text-black rounded"
                    >
                        {darkMode ? "🌞 Light" : "🌙 Dark"}
                    </button>

                </div>

                {/* Progress Ring */}
                <div className="flex justify-center items-center mb-6">
                    <ResponsiveContainer width={200} height={200}>
                        <PieChart>
                            <Pie
                                dataKey="value"
                                data={[
                                    { name: "Correct", value: correct, fill: "#10B981" },
                                    { name: "Wrong", value: wrong, fill: "#EF4444" },
                                    { name: "Unanswered", value: total - correct - wrong, fill: "#9CA3AF" },
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                label
                            />
                            <Tooltip />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Answers Summary */}
                <div className="mt-6 grid gap-4">
                    {questions.map((q, index) => (
                        <div
                            key={index}
                            className="p-4 border rounded-lg dark:border-gray-700 bg-white dark:bg-gray-800 shadow-md"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <h2 className="font-semibold text-lg">Q{index + 1}: 🎧 Audio Question</h2>
                                <button
                                    onClick={() => new Audio(q.audio).play()}
                                    className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    ▶️ Play
                                </button>
                            </div>
                            <p>
                                Your Answer:{" "}
                                <span
                                    className={
                                        answers[q.id] === q.answer
                                            ? "text-green-500 font-bold"
                                            : "text-red-500 font-bold"
                                    }
                                >
                                    {answers[q.id] || "No Answer"}
                                </span>
                            </p>
                            <p>Correct Answer: <strong>{q.answer}</strong></p>
                        </div>
                    ))}
                </div>

                <div className="mt-10 text-center">
                    <button
                        onClick={() => {
                            setIsFinished(false);
                            setAnswers({});
                            setCurrentIndex(0);
                            setTimeLeft(180);
                        }}
                        className="px-6 py-3 bg-yellow-400 text-black rounded-full font-semibold shadow hover:bg-yellow-300 transition"
                    >
                        🔁 Restart Exam
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-800 text-white relative p-4">
            {/* Header */}
            <h1 className="text-2xl font-bold text-center m-8 ">📝 প্রাকটিস পরীক্ষা </h1>
            <div className="flex justify-between items-center mb-6 p-4 bg-white/10 rounded-xl shadow backdrop-blur-md">
                <div>
                    <p className="bg-green-400 text-black px-3 py-1 rounded-full mb-1 font-semibold">
                        ✅ Answered: {answered}
                    </p>
                    <p className="bg-red-400 text-black px-3 py-1 rounded-full font-semibold">
                        ❌ Not Answered: {notAnswered}
                    </p>
                </div>

                <div className="text-right">
                    <p className="text-sm">Timer</p>
                    <p className="text-xl font-mono bg-white text-black px-4 py-1 rounded shadow">
                        {formatTime(timeLeft)}
                    </p>
                    <button
                        onClick={() => setDarkMode((prev) => !prev)}
                        className="mt-2 text-xs px-2 py-1 bg-gray-300 text-black rounded"
                    >
                        {darkMode ? "🌞 Light" : "🌙 Dark"}
                    </button>
                </div>
            </div>

            {/* Animated Question Card */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 p-6 rounded-xl backdrop-blur-md shadow-lg mb-6 text-center max-w-3xl mx-auto"
                >
                    <p className="text-xl font-semibold mb-4">
                        {currentIndex + 1}. Listen to the audio and select the correct letter
                    </p>
                    <button
                        onClick={playAudio}
                        className="mb-6 px-6 py-2 rounded-full bg-yellow-300 text-black font-bold hover:scale-105 transition"
                    >
                        🔊 Play Audio
                    </button>
                    <audio ref={audioRef} src={current.audio} />
                    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                    {current.options.map((opt, i) => (
              <button
                key={i}
                onClick={() => handleOptionClick(opt)}
                className="bg-indigo-300 text-black text-5xl  py-4 rounded-xl hover:bg-indigo-400 transition"
                style={{ fontFamily: 'CustomFont, sans-serif' }} // Apply your custom font here
              >
                {opt}
              </button>
            ))}
                    </div>
                </motion.div>
            </AnimatePresence>

            {/* Scrollable Question Nav */}
            {/* Already present in your code and it’s correct: */}
            <div
                ref={scrollContainerRef}
                className="overflow-x-auto whitespace-nowrap bg-white/20 p-3 rounded-xl backdrop-blur-md mb-28 scroll-smooth no-scrollbar"
            >
                <div className="inline-flex space-x-2">
                    {questions.map((q, index) => (
                        <button
                            key={q.id}
                            ref={(el) => {
                                buttonRefs.current[index] = el;
                            }}
                            onClick={() => goToQuestion(index)}
                            className={`min-w-[2.5rem] min-h-[2.5rem] rounded-full border-2 text-lg font-bold flex items-center justify-center transition-colors duration-200 ${currentIndex === index ? "ring-4 ring-yellow-400" : ""
                                } ${answers[q.id]
                                    ? "bg-green-400 border-green-600 text-black"
                                    : "bg-white border-yellow-400 text-black"
                                }`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            {/* Finish Button */}
            <button
                onClick={() => {
                    const isConfirmed = window.confirm('Are you sure you want to finish the exam?');
                    if (isConfirmed) {
                        finishExam(); // Call the finishExam function if the user confirms
                    }
                }}
                className="fixed bottom-4 right-4 bg-yellow-400 text-black px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-yellow-300 transition"
            >
                ✅ Finish Exam
            </button>
        </div>
    );
}
