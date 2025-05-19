"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import { FaEnvelope, FaPhoneAlt, FaLocationArrow } from "react-icons/fa";

export default function ContactPage() {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <div>
      <Navbar setNavHeight={setNavHeight} />
      <div style={{ paddingTop: `${navHeight}px` }}>
        <main className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 text-gray-800 px-4 py-10">
          <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 border border-green-300">
            <h1 className="text-3xl font-bold text-center text-green-700 mb-2 animate-fade-in">যোগাযোগ করুন</h1>
            <p className="text-center text-gray-600 mb-8 italic">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</p>

            <form
              action="https://formsubmit.co/m.b.siam2008@gmail.com" // 🔁 Replace this with your actual email
              method="POST"
              className="space-y-6"
            >
              {/* Disable captcha and redirect after submit */}
              <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_template" value="table" />
          <input type="hidden" name="_next" value="http://localhost:3000/thank" />
          <input type="hidden" name="_subject" value="from contactus"/>

              <div>
                <label className="block text-sm font-semibold text-green-800 mb-1">আপনার নাম *</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="আপনার পুরো নাম"
                  className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-800 mb-1">ইমেইল: *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="example@email.com"
                  className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-green-800 mb-1">মোবাইল:</label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  placeholder="আপনার মোবাইল নম্বর দিন  "
                  className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-green-800 mb-1">বিষয় *</label>
                <input
                  type="text"
                  name="subject"
                  required
                  placeholder="আপনার প্রশ্ন বা বার্তার বিষয়"
                  className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              </div>


              <div>
                <label className="block text-sm font-semibold text-green-800 mb-1">আপনার বার্তা *</label>
                <textarea
                  name="message"
                  rows={5}
                  required
                  placeholder="আপনার বার্তা এখানে লিখুন..."
                  className="w-full px-4 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition duration-300"
              >
                পাঠিয়ে দিন
              </button>
            </form>

            
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
}
