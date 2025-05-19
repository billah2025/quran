"use client";

import { useState } from "react";
import emailjs from "emailjs-com";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setMessage("অনুগ্রহ করে একটি বৈধ ইমেইল দিন।");
      setSuccess(false);
      return;
    }

    const templateParams = {
      email: email,
    };

    emailjs
      .send(
        "service_84mkm6r",
        "template_lena7f3",
        templateParams,
        "NistrL4Rj1YxpHzI8"
      )
      .then(() => {
        setSuccess(true);
        setMessage("সাবস্ক্রিপশন সফল হয়েছে! আপনার ইনবক্স চেক করুন।");
      })
      .catch(() => {
        setSuccess(false);
        setMessage("কিছু ভুল হয়েছে। দয়া করে পরে আবার চেষ্টা করুন।");
      });
  };

  return (
    <div className="bg-emerald-900 rounded-xl py-7 px-6 md:px-12 text-white shadow-xl max-w-4xl mx-auto">
      <div className="text-center">
       
        <p className="text-gray-100 text-sm md:text-base mb-6">
          ইসলামী জ্ঞান ও হালাল টেকনোলজি আপডেট পেতে আমাদের সাথে থাকুন।
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-xl mx-auto"
        >
          <input
            type="email"
            placeholder="আপনার ইমেইল লিখুন"
            className="flex-1 w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-black shadow-inner "
            value={email}
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-yellow-400 hover:bg-yellow-500 text-emerald-900 font-semibold py-2 px-6 rounded-lg transition duration-300 shadow-md w-full sm:w-auto"
          >
            সাবস্ক্রাইব করুন
          </button>
        </form>

        {message && (
          <div
            className={`mt-4 text-sm md:text-base ${
              success ? "text-green-300" : "text-red-300"
            }`}
          >
            {message}
          </div>
        )}
      </div>
    </div>
  );
}
