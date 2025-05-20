"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import { FaExclamationTriangle } from "react-icons/fa";

export default function NotFoundPage() {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <div>
      <Navbar setNavHeight={setNavHeight} />
      <div style={{ paddingTop: `${navHeight}px` }}>
        <main className="min-h-screen bg-gradient-to-b from-red-50 to-white text-gray-800 px-4 py-12">
          <div className="max-w-3xl mx-auto bg-white border border-red-200 shadow-xl rounded-2xl p-10 text-center">
            <div className="flex justify-center text-red-500 text-6xl mb-4">
              <FaExclamationTriangle />
            </div>
            <h1 className="text-4xl font-bold text-red-600 mb-2 animate-fade-in">
              404 - পৃষ্ঠা খুঁজে পাওয়া যায়নি
            </h1>
            <p className="text-gray-700 mb-4 italic">إِنَّا لِلّهِ وَإِنَّا إِلَيْهِ رَاجِعُونَ</p>
            <p className="text-base text-gray-600 mb-6">
              আপনি যে পৃষ্ঠাটি খুঁজছেন তা বিদ্যমান নেই অথবা সরানো হয়েছে।
            </p>
            <link
              href="/"
              className="inline-block px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
            >
              হোমপেইজে ফিরে যান
            </link>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
