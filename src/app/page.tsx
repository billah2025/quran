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
import SEO from "@/app/components/seo";
import Head from "next/head";
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
      <Head>
        <title>আল কুরআনের বাংলা ও আরবি শিক্ষা|  muslims hub</title>
        <meta name="description" content="বাংলা ও আরবিতে কুরআন পড়ুন ও শিখুন। ভিডিও ও টেক্সট কোর্স, রুকিয়াহ আয়াত, বিশাল ইসলামিক বই সংগ্রহ, ইসলামিক প্রশ্নোত্তর, ও নাশিদ শুনুন।" />
        <meta name="keywords" content="Islam, Quran, Sunnah, Hadith, Fiqh, Islamic Blog , কুরআন শিক্ষা ,
        কুরআন অডিও,
        ইসলামিক প্রশ্ন,
        বাংলা কুরআন,
        রুকিয়াহ,
        ইসলামিক বই,
          ইসলামিক নাশিদ,
           muslims hub,
           আল কুরআনের বাংলা ও আরবি শিক্ষা ," />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Islamic Blog" />
        <meta property="og:description" content="Learn Islam through Quran and Sunnah. Explore Quranic knowledge, learn tajweed, read Islamic books and blogs in Bangla & English.বাংলা ও আরবিতে কুরআন পড়ুন ও শিখুন। ভিডিও ও টেক্সট কোর্স, রুকিয়াহ আয়াত, বিশাল ইসলামিক বই সংগ্রহ, ইসলামিক প্রশ্নোত্তর, ও নাশিদ শুনুন।" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:type" content="article" />
          <meta property="og:url" content="https://muslimshub.vercel.app/" />
  <link rel="canonical" href="https://muslimshub.vercel.app/" />
      </Head>

      <SEO
        title="আল কুরআনের বাংলা ও আরবি শিক্ষা| | muslims hub "
        description="বাংলা ও আরবিতে কুরআন পড়ুন ও শিখুন। ভিডিও ও টেক্সট কোর্স, রুকিয়াহ আয়াত, বিশাল ইসলামিক বই সংগ্রহ, ইসলামিক প্রশ্নোত্তর, ও নাশিদ শুনুন।"
        url="https://muslimshub.vercel.app"
        image="/favicon.ico"
        type="website"
        keywords={[
          "কুরআন শিক্ষা",
          "কুরআন অডিও",
          "ইসলামিক প্রশ্ন",
          "বাংলা কুরআন",
          "রুকিয়াহ",
          "ইসলামিক বই",
          "ইসলামিক নাশিদ",
        ]}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "muslimshub",
          "url": "https://muslimshub.vercel.app",
          "inLanguage": "bn",
          "description":
            "বাংলা ও আরবিতে কুরআন পড়ুন ও শিখুন। ভিডিও ও টেক্সট কোর্স, রুকিয়াহ আয়াত, বিশাল ইসলামিক বই সংগ্রহ, ইসলামিক প্রশ্নোত্তর, ও নাশিদ শুনুন।",
          "publisher": {
            "@type": "Organization",
            "name": "muslimshub",
            "logo": {
              "@type": "ImageObject",
              "url": "https://muslimshub.vercel.app/favicon.ico",
            },
          },
        }}
      />

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
