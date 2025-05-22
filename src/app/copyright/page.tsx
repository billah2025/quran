"use client";
import { FaMoon } from "react-icons/fa";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import SEO from "@/app/components/seo";
export default function CopyrightPage() {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <div>
      <SEO
  title="Copyright Notice - MuslimsHub"
  description="Read the copyright policy of MuslimsHub. Educational sharing is allowed with attribution. Contact us for concerns."
  url="https://muslimshub.vercel.app/copyright"
  image="/copyright-cover.jpg" // Make sure this file exists in your /public folder
  keywords={[
    "Copyright",
    "MuslimsHub policy",
    "ইসলামিক কনটেন্ট কপিরাইট",
    "Islamic copyright notice",
    "MuslimsHub terms",
    "Educational Islamic sharing"
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
              <h1 className="text-2xl font-bold text-green-700">Copyright Notice</h1>
            </div>
            <section className="space-y-6 text-justify leading-relaxed text-base md:text-lg">
              <p>
                <strong>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</strong><br />
                All content on this website, including text, images, and code, is © {new Date().getFullYear()} YourSiteName unless otherwise stated.
              </p>
              <p>
                You may share content for educational purposes with proper attribution. Commercial use or redistribution is not allowed without permission.
              </p>
              <p>
                If any copyrighted material appears here unintentionally, please contact us and we will promptly address it.
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
