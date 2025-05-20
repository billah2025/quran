"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import { FaCheckCircle } from "react-icons/fa";
import Link from "next/link";
export default function ThankYouPage() {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <div>
      <Navbar setNavHeight={setNavHeight} />
      <div style={{ paddingTop: `${navHeight}px` }}>
        <main className="min-h-screen bg-gradient-to-b from-green-100 to-white text-gray-800 px-4 py-10">
          <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-green-300 text-center">
            <div className="flex justify-center text-green-600 text-5xl mb-4">
              <FaCheckCircle />
            </div>
            <h1 className="text-3xl font-bold text-green-700 mb-2 animate-fade-in">আপনার বার্তা পাঠানো হয়েছে!</h1>

            <p className="text-base text-gray-600 mb-6">
              আমরা আপনার বার্তা পেয়েছি এবং যত দ্রুত সম্ভব আপনাকে উত্তর দেব ইনশাআল্লাহ। ধন্যবাদ!
            </p>
            <Link
              href="/"
              className="inline-block mt-4 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-300"
            >
              হোমপেইজে ফিরে যান
            </Link>

          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
