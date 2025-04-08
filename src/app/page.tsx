"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Slideshow from "./components/Slideshow";
import TodayDate from "./components/TodayDate";
import PrayerTimes from "./components/PrayerTime";
import Calendar from "react-calendar";
import ServiceSection from "@/app/components/ServiceSection";
import Footer from "@/app/components/Footer";
import moment from "moment-hijri";
import "moment/locale/ar-sa";
import "moment/locale/en-gb";
import "moment/locale/en-ca";

interface AppProps {
  Component: React.ComponentType;
  pageProps: any;
}


export default function Home({ Component, pageProps }: AppProps) {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [navHeight, setNavHeight] = useState(0);

  // Check for saved theme preference in localStorage
  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode");
    if (savedMode === "true") {
      setDarkMode(true);
    }
  }, []);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode ? "true" : "false");
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Amiri&display=swap"
          rel="stylesheet"
        />
      </Head>
      <div className={darkMode ? "bg-gray-900 text-white" : "bg-gray-100 text-black"}>
        {/* Global Dark Mode Toggle */}
        <div className="fixed top-4 right-4 z-10">
          <button
            onClick={toggleDarkMode}
            className="p-2 bg-gray-600 rounded-full hover:bg-gray-700 transition"
          >
            {darkMode ? "🌙 Dark Mode" : "💡 Light Mode"}
          </button>
        </div>

        {/* Pass setNavHeight so Navbar can update navHeight */}
        <Navbar setNavHeight={setNavHeight}    />

        {/* Pass navHeight to Slideshow so its top margin equals navbar height */}
        <Slideshow navHeight={navHeight} />

        <div className="flex mt-6">
          <TodayDate />
        </div>
        <PrayerTimes />
        <ServiceSection />
        <Footer />
      </div>
    </>
  );
}
