"use client";

import { useState, useEffect } from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaArrowUp } from "react-icons/fa";
import NewsletterForm from "./NewsletterForm";  // Import the NewsletterForm 
// Footer.tsx
export default function Footer() {
    const [showTopBtn, setShowTopBtn] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setShowTopBtn(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <footer className="bg-transparent text-white p-6  ">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* 1️⃣ Company Info */}
                <div>
                    <h2 className="text-2xl font-bold mb-3">MyCompany</h2>
                    <p className="text-gray-400 leading-relaxed">
                        Empowering you with the best digital solutions. We design, build, and scale ideas into real-world success.
                    </p>
                </div>

                {/* 2️⃣ Contact Info */}
                <div>
                    <h3 className="text-xl font-semibold mb-3">Contact Us</h3>
                    <ul className="text-gray-400 space-y-2">
                        <li>Email: support@mycompany.com</li>
                        <li>Phone: +880 1234-567890</li>
                        <li>Address: 123 Street, Dhaka, Bangladesh</li>
                    </ul>
                </div>

                {/* 3️⃣ Newsletter & Social */}
                <div>
                    
                    <NewsletterForm /> {/* Add the NewsletterForm here */}
                </div>

                {/* Social Icons */}
                <div className="flex gap-4 mt-6">
                    <a href="#" className="text-gray-400 hover:text-blue-500 transition text-xl"><FaFacebookF /></a>
                    <a href="#" className="text-gray-400 hover:text-blue-400 transition text-xl"><FaTwitter /></a>
                    <a href="#" className="text-gray-400 hover:text-pink-500 transition text-xl"><FaInstagram /></a>
                    <a href="#" className="text-gray-400 hover:text-blue-600 transition text-xl"><FaLinkedinIn /></a>
                </div>
            </div>
{/* ⬇ Copyright */ }
    <div className="text-center text-gray-500 mt-10 text-sm border-t border-gray-700 pt-6">
        © {new Date().getFullYear()} MyCompany. All rights reserved.
    </div>

    {/* 🔝 Back to Top Button */ }
    {
        showTopBtn && (
            <button
                onClick={scrollToTop}
                className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 p-3 rounded-full shadow-lg transition"
            >
                <FaArrowUp className="text-white text-lg" />
            </button>
        )
    }
      </footer >
    );
}
