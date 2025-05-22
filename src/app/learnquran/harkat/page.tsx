"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import SEO from "@/app/components/seo";
const LearnQuranPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [navHeight, setNavHeight] = useState(0);
  const router = useRouter();

  return (
    <div>
      <SEO
  title="হারকাত শিক্ষা - MuslimsHub"
  description="আরবি হারকাত, তানবীন, সাকিন, তাশদীদ সহ কোরআন শিক্ষা করুন MuslimsHub থেকে। সহজভাবে শেখার কোর্স ও কুইজ উপলব্ধ।"
  url="https://muslimshub.vercel.app/learnquran/harkat"
  image="https://muslimshub.vercel.app/learn-quran-banner.jpg"
  keywords={[
    "হারকাত শিক্ষা",
    "আরবি শিক্ষা",
    "Learn Harkat",
    "Learn Quran online",
    "MuslimsHub Quran lessons",
    "আরবি হরফ",
    "তানবীন শিখুন",
    "তাশদীদ",
    "সাকিন",
    "তাজবীদ",
    "ইসলামিক শিক্ষা"
  ]}
/>

         <Navbar
          setNavHeight={setNavHeight}
          className={`tracking-wide ${darkMode
            ? "text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-500 to-lime-400"
            : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-lime-500 text-black "
            }`} />
    <div
     style={{ paddingTop: `${navHeight}px` }}
      className={`min-h-screen ${darkMode
        ? "bg-gray-900 text-gray-200"
        : "bg-gradient-to-t from-emerald-50 via-green-100 to-emerald-200 text-gray-900"
        } flex flex-col items-center py-12 relative`}
    >
      <div>
        
        
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        className={`fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full font-bold shadow-md transition-all ${
          darkMode
            ? "bg-gradient-to-r from-teal-400 to-green-400 text-gray-900 hover:scale-110 hover:bg-gradient-to-r from-green-500 to-teal-500"
            : "bg-gradient-to-r from-emerald-500 to-lime-400 text-white hover:scale-110 hover:from-green-600 hover:to-yellow-400"
        }`}
      >
        {darkMode ? "Light Mode 🌞" : " Dark Mode 🌙"}
      </button>

      {/* Title */}
      <h1
        className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mt-8 mb-12 tracking-wide ${
          darkMode
            ? "text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-300 to-yellow-300"
            : "text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-lime-500"
        }`}
      >
        🌙 Master Quranic Lessons with Style 🏆
      </h1>

      {/* Lesson Cards */}
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
              className={`group relative p-6 rounded-2xl shadow-xl transform transition-transform ${
                darkMode
                  ? "bg-gray-800 text-gray-200 hover:shadow-lg hover:scale-105"
                  : "bg-white text-gray-900 hover:shadow-2xl hover:scale-105 border border-emerald-100"
              }`}
            >
              {/* Icon */}
              <div
                className={`absolute -top-6 -left-6 rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold group-hover:rotate-12 transition-transform ${
                  darkMode
                    ? "bg-gradient-to-r from-green-500 to-teal-400 text-gray-900"
                    : "bg-gradient-to-r from-lime-400 to-emerald-500 text-white"
                }`}
              >
                {lesson.icon}
              </div>

              <h2 className="text-2xl font-bold mb-2">{lesson.name}</h2>
              <p
                className={`text-sm transition-colors ${
                  darkMode
                    ? "text-gray-400 group-hover:text-gray-300"
                    : "text-gray-600 group-hover:text-emerald-800"
                }`}
              >
                {lesson.name} শিখুন
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Call to Action */}
      <button
        onClick={() => router.push("/learnquran/quize/")}
        className={`mt-12 py-4 px-10 rounded-full text-xl font-bold shadow-lg transform transition-all ${
          darkMode
            ? "bg-gradient-to-r from-green-500 to-teal-400 text-gray-900 hover:shadow-2xl hover:scale-110"
            : "bg-gradient-to-r from-emerald-600 to-lime-500 text-white hover:shadow-2xl hover:scale-110"
        }`}
      >
        Explore All Results & Quizzes
      </button>
    </div>
     <Footer />
    </div>
  );
};

export default LearnQuranPage;
