"use client";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import SEO from "@/app/components/seo";

export default function AboutPage() {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <div>
      <SEO
        title="আমাদের সম্পর্কে - MuslimsHub"
        description="MuslimsHub একটি ইসলামিক প্ল্যাটফর্ম যা পবিত্র কোরআন, হাদীস, ইসলামিক প্রশ্নোত্তর এবং ব্লগের মাধ্যমে বিশুদ্ধ ইসলামি জ্ঞান ছড়িয়ে দেয়।"
        url="https://muslimshub.vercel.app/about"
        image="/about-cover.jpg"
        keywords={[
          "আমাদের সম্পর্কে",
          "ইসলামিক জ্ঞান",
          "কোরআন ও হাদীস",
          "ইসলামিক প্ল্যাটফর্ম",
          "MuslimsHub",
          "বাংলা ইসলামিক সাইট"
        ]}
      />
      <Navbar setNavHeight={setNavHeight} />
      <div style={{ paddingTop: `${navHeight}px` }}>
        <main className="min-h-screen bg-gradient-to-b from-green-100 to-white text-gray-800 px-4 py-10">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-green-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-green-600 text-3xl">
                <FaMoon />
              </div>
              <h1 className="text-2xl font-bold text-green-700">About Us</h1>
            </div>
            <section className="space-y-6 text-justify leading-relaxed text-base md:text-lg">
              <p>
                <strong>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</strong><br />
                We are dedicated to spreading authentic Islamic knowledge in a beautiful and easy-to-understand way.
              </p>
              <p>
                Our platform shares Quranic ayat, hadith, Islamic rulings, Q&A, and blog content with sincere intentions.
              </p>
              <p>
                May Allah ﷻ accept our efforts and forgive our shortcomings. Ameen.
              </p>
              <p className="mt-6 text-sm text-gray-500">
                Last updated: May 19, 2025
              </p>
            </section>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
