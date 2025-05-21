"use client";

import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import TodayDate from "./components/TodayDate";
import PrayerTimes from "./components/PrayerTime";
import ServiceSection from "@/app/components/ServiceSection";
import Footer from "@/app/components/Footer";
import Calendar from "@/app/components/Calendar";
import { Amiri } from 'next/font/google';

const amiri = Amiri({ subsets: ['arabic'], weight: '400' });

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);
  const [navHeight, setNavHeight] = useState(0);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") setDarkMode(true);
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", (!darkMode).toString());
  };

  return (
    <div
    className={`
      ${amiri.className}
      ${darkMode ? "bg-gray-900 text-white" : "bg-gradient-to-br from-emerald-100 to-white text-gray-800"}
      min-h-screen transition-colors duration-300
    `}
  >
  
      {/* Global Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-emerald-600 text-white rounded-full hover:bg-emerald-700 transition"
        >
          {darkMode ? "🌙 Dark Mode" : "💡 Light Mode"}
        </button>
      </div>

      <Navbar setNavHeight={setNavHeight} />
      <Slideshow navHeight={navHeight} />

      <div className="flex justify-center mt-6">
        <TodayDate />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 mt-6">
        {/* Islamic Calendar */}
        <div className="lg:w-2/3 w-full">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-emerald-100 dark:border-gray-700">
            <Calendar />
          </div>
        </div>

        {/* Prayer Times */}
        <div className="lg:w-1/3 w-full">
          <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-emerald-100 dark:border-gray-700">
            <PrayerTimes />
          </div>
        </div>
      </div>

      <div className="mt-10 px-4 md:px-8">
        <ServiceSection />
      </div>

      

      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
