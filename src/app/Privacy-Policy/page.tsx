
// app/privacy/page.tsx
"use client";
// import { Metadata } from "next";
import { FaMoon } from "react-icons/fa";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import { useState } from "react";   
// export const metadata: Metadata = {
//   title: "Privacy Policy | YourSiteName",
//   description: "Read the privacy policy and disclaimer for YourSiteName.",
// };

export default function PrivacyPage() {

     //nav height 
      const [navHeight, setNavHeight] = useState(0);
  return (
        <div>
          <Navbar setNavHeight={setNavHeight} />
          <div style={{ paddingTop: `${navHeight}px` }} >
    <main className="min-h-screen bg-gradient-to-b from-green-100 to-white text-gray-800 px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-green-300">
        <div className="flex items-center space-x-3 mb-6">
          <div className="text-green-600 text-3xl">
            <FaMoon />
          </div>
          <h1 className="text-2xl font-bold text-green-700">Privacy Policy & Disclaimer</h1>
        </div>

        <section className="space-y-6 text-justify leading-relaxed text-base md:text-lg">
          <p>
            <strong>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</strong><br />
            Welcome to our site. We value your privacy and are committed to protecting your personal information.
          </p>

          <p>
            This website is dedicated to sharing Islamic knowledge with the intention of pleasing Allah ﷻ. All information is provided in good faith and is intended for educational purposes only.
          </p>

          <h2 className="text-xl font-semibold text-green-600 mt-4">1. Data Collection</h2>
          <p>
            We do not collect any personal data unless you voluntarily provide it (e.g., via contact forms). We do not sell or share your information with third parties.
          </p>

          <h2 className="text-xl font-semibold text-green-600 mt-4">2. External Links</h2>
          <p>
            Our website may contain links to other Islamic resources. We are not responsible for the content or privacy practices of these third-party websites.
          </p>

          <h2 className="text-xl font-semibold text-green-600 mt-4">3. Disclaimer</h2>
          <p>
            All Islamic rulings, hadiths, and Quranic references are shared with sincere effort. However, always consult a qualified scholar for religious matters.
          </p>

          <h2 className="text-xl font-semibold text-green-600 mt-4">4. Changes to Policy</h2>
          <p>
            We may update our privacy and disclaimer statements from time to time. Please review this page periodically for any changes.
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
