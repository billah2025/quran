"use client";
import { useState, useEffect } from "react";
import moment from "moment";
import { getDate } from "bangla-calendar"; // ✅ Import correctly

export default function TodayDate() {
  const [englishDate, setEnglishDate] = useState("");
  const [banglaDate, setBanglaDate] = useState("");

  useEffect(() => {
    // English Date
    const todayEnglish = moment().format("dddd, MMMM D, YYYY");
    setEnglishDate(todayEnglish);

    // Get today's Bangla date as a string
    const today = new Date();
    const banglaDateString = getDate(today); // ✅ Directly store the string

    console.log("Bangla Date String:", banglaDateString); // Debugging output

    // Set Bangla Date
    if (banglaDateString) {
      setBanglaDate(banglaDateString);
    } else {
      setBanglaDate("বাংলা তারিখ পাওয়া যায়নি");
    }
  }, []);

  return (
    <div className="bg-transparent text-white text-center p-6 rounded-lg shadow-lg border border-gray-300 w-full max-w-lg mx-auto">
      <h2 className="text-3xl font-bold mb-2 animate-pulse">📅 আজকের তারিখ</h2>
      <p className="text-lg font-semibold">{banglaDate}</p>
      <p className="text-lg italic opacity-90">{englishDate}</p>
    </div>
  );
}
