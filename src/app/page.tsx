"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import TodayDate from "./components/TodayDate";
import PrayerTimes from "./components/PrayerTime";
import ServiceSection from "@/app/components/ServiceSection";
import Footer from "@/app/components/Footer";


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
    <div className={`${amiri.className} ${darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"} min-h-screen`}>
      {/* Global Dark Mode Toggle */}
      <div className="fixed top-4 right-4 z-10">
        <button
          onClick={toggleDarkMode}
          className="p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition"
        >
          {darkMode ? "🌙 Dark Mode" : "💡 Light Mode"}
        </button>
      </div>

      <Navbar setNavHeight={setNavHeight} />
      <Slideshow navHeight={navHeight} />

      <div className="flex mt-6">
        <TodayDate />
      </div>

      <PrayerTimes />
      <ServiceSection />
      <Footer />
    </div>
  );
}
