"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";

const LearnQuranPage: React.FC = () => {
    const [darkMode, setDarkMode] = useState(false);
    const router = useRouter();
    return (

        <div

            className={`min-h-screen ${darkMode
                ? "bg-gray-900 text-gray-200"
                : "bg-gradient-to-t from-indigo-900 via-purple-800 to-blue-600 text-white"
                } flex flex-col items-center py-12 relative`}
        >
            <div >
                <Navbar
                    className={`tracking-wide ${darkMode
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-lime-400"
                        : "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-purple-500 to-pink-400"
                        }`}
                />
            </div>


            <button
                onClick={() => setDarkMode(!darkMode)}
                className={`fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full font-bold shadow-md transition-all ${darkMode
                    ? "bg-gradient-to-r from-teal-400 to-green-400 text-gray-900 hover:scale-110 hover:bg-gradient-to-r from-green-500 to-teal-500"
                    : "bg-gradient-to-r from-pink-400 to-purple-400 text-white hover:scale-110 hover:bg-gradient-to-r from-purple-500 to-pink-500"
                    }`}
            >
                {darkMode ? "Light Mode 🌞" : " Dark Mode 🌙"}
            </button>

            {/* Title Section */}
            <h1
                className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mt-8 mb-12 tracking-wide ${darkMode
                    ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-yellow-300"
                    : "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-400"
                    }`}
            >
                🌙 Master Quranic Lessons with Style 🏆
            </h1>

            {/* Interactive Buttons Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full px-8 max-w-6xl pb-24">
                {[
                    { name: "হারকাত", icon: "1️⃣", link: "/learnquran/harkat/harket", subhead: "হারকাত শিখুন  " },
                    { name: "তানবীন", icon: "2️⃣", link: "/learnquran/harkat/tanbin" },
                    { name: "সাকিন", icon: "3️⃣", link: "/learnquran/harkat/sakin" },
                    { name: "তাশদীদ", icon: "4️⃣", link: "/learnquran/harkat/tashdid" },
                    { name: "আরজি সাকিন", icon: "5️⃣", link: "/learnquran/harkat/arji_sakin" },
                    { name:  "প্রাক্টিস ", icon: "6️⃣", link: "/learnquran/harkat/practice" },
                ].map((lesson, index) => (
                    <Link href={lesson.link} key={index}>
                        <div
                            className={`group relative p-6 rounded-2xl shadow-xl transform transition-transform ${darkMode
                                ? "bg-gray-800 text-gray-200 hover:shadow-lg hover:scale-105"
                                : "bg-white text-gray-900 hover:shadow-2xl hover:scale-105"
                                }`}
                        >
                            {/* Icon Section */}
                            <div
                                className={`absolute -top-6 -left-6 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold group-hover:rotate-12 transition-transform ${darkMode
                                    ? "bg-gradient-to-r from-green-500 to-teal-400 text-gray-900"
                                    : "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800"
                                    }`}
                            >
                                {lesson.icon}
                            </div>
                            <h2 className="text-2xl font-bold mb-2">{lesson.name}</h2>
                            {/* <p
                className={`text-sm transition-colors ${darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-800"
                  }`}
              >
              { lesson.subhead}
              </p> */}
                            <p
                                className={`text-sm transition-colors ${darkMode ? "text-gray-400 group-hover:text-gray-300" : "text-gray-600 group-hover:text-gray-800"
                                    }`}
                            >
                                {lesson.name} শিখুন
                            </p>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Call-to-Action Button */}
            <button
                onClick={() => router.push('/learnquran/quize/')} // ✅ Navigate to target page
                className={`mt-12 py-4 px-10 rounded-full text-xl font-bold shadow-lg transform transition-all ${darkMode
                    ? "bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 hover:shadow-2xl hover:scale-110"
                    : "bg-gradient-to-r from-pink-500 to-red-500 text-white hover:shadow-2xl hover:scale-110"
                    }`}
            >
                Explore All Results & Quizzes
            </button>
        </div>
    );
};

export default LearnQuranPage;
