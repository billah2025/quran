"use client";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";

export default function DisclaimerPage() {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <div>
      <Navbar setNavHeight={setNavHeight} />
      <div style={{ paddingTop: `${navHeight}px` }}>
        <main className="min-h-screen bg-gradient-to-b from-green-100 to-white text-gray-800 px-4 py-10">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-green-300">
            <div className="flex items-center space-x-3 mb-6">
              <div className="text-green-600 text-3xl">
                <FaMoon />
              </div>
              <h1 className="text-2xl font-bold text-green-700">Disclaimer</h1>
            </div>
            <section className="space-y-6 text-justify leading-relaxed text-base md:text-lg">
              <p>
                <strong>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</strong><br />
                This site provides Islamic educational content for general guidance.
              </p>
              <p>
                We strive for accuracy, but we cannot guarantee that all content is free from error. Users should always verify information with qualified scholars.
              </p>
              <p>
                By using this site, you accept that any reliance on information provided is at your own risk.
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
