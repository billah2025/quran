"use client";

import { useState, useEffect } from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaArrowUp,
} from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-b from-emerald-900 to-emerald-800 text-white px-6 py-12  relative">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* 1️⃣ Company Info */}
        <div>
          <h2 className="text-3xl font-extrabold mb-4 text-yellow-300 font-serif">
            🕌 MyCompany
          </h2>
          <p className="text-gray-300 leading-relaxed text-sm">
            Digital solutions inspired by Islamic values. We help you design,
            build, and scale ideas into blessings of success, In Sha Allah.
          </p>
        </div>

        {/* 2️⃣ Contact Info */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-200">
            📬 যোগাযোগ করুন
          </h3>
          <ul className="text-gray-300 space-y-2 text-sm">
            <li>📧 ইমেইল: support@mycompany.com</li>
            <li>📞 ফোন: +880 1234-567890</li>
            <li>🏠 ঠিকানা: 123 রাস্তা, ঢাকা, বাংলাদেশ</li>
          </ul>
        </div>

        {/* 3️⃣ Newsletter & Social */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-yellow-200">
            ✉️ নিউজলেটার
          </h3>
          <NewsletterForm />
        </div>
      </div>
      {/* Copyright */}
      <div className="text-center text-gray-400 mt-12 text-xs border-t border-emerald-700 pt-6">
        <div className="flex flex-col lg:flex-row gap-6 px-4 md:px-8 mt-6 justify-center">





          {/* Islamic Calendar */}
       
            {/* Social Icons */}
            <div className="flex gap-3 ">
              <a
                href="#"
                className="text-gray-300 hover:text-blue-500 transition text-xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-sky-400 transition text-xl"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-pink-500 transition text-xl"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-blue-600 transition text-xl"
              >
                <FaLinkedinIn />
              </a>
            </div>
        
          {/* Prayer Times */}
          <div className=" justify-left  text-gray-300 hover:text-blue-500 transition text-xl ">

            © {new Date().getFullYear()} MyCompany. সমস্ত অধিকার সংরক্ষিত।
          </div>




        </div>
      </div>

      {/* Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-yellow-400 hover:bg-yellow-500 p-3 rounded-full shadow-lg transition"
        >
          <FaArrowUp className="text-emerald-900 text-lg" />
        </button>
      )}
    </footer>
  );
}
