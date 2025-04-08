"use client";

import { useState, useEffect, useRef } from "react";

const Navbar = ({ setNavHeight, className }: { setNavHeight?: (height: number) => void; className?: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Menu open/close state
  const [isHeaderVisible, setIsHeaderVisible] = useState(true); // Navbar visibility on scroll
  const headerRef = useRef<HTMLDivElement | null>(null); // Reference to header

  // Toggle menu state when hamburger button is clicked
  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node) &&
        isMenuOpen
      ) {
        setIsMenuOpen(false); // Close the menu
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  // Calculate navbar height and handle scroll visibility
  useEffect(() => {
    if (headerRef.current && setNavHeight) {
      setNavHeight(headerRef.current.offsetHeight); // Pass navbar height to parent
    }

    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setIsHeaderVisible(false); // Scrolling down: hide navbar
      } else {
        setIsHeaderVisible(true); // Scrolling up: show navbar
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setNavHeight]);

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full bg-white shadow-md transition-transform duration-500 z-50 ${
        isHeaderVisible ? "translate-y-0" : "-translate-y-full"
      } ${className}`}
    >
      <div className="container mx-auto flex items-center justify-between px-6 py-4">
        <div className="text-xl font-bold text-gray-800">Quran</div>

        {/* Navigation menu */}
        <nav
          className={`absolute md:relative top-full left-0 w-full md:w-auto md:flex md:items-center md:space-x-8 bg-white md:bg-transparent transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 p-6 md:p-0">
            {["Home", "Learn Quran", "Read Quran", "About Us", "Blog"].map((item) => (
              <li key={item}>
                <a href={`#${item.toLowerCase().replace(/\s+/g, "")}`} className="block py-2 px-4 text-gray-800 hover:text-indigo-500">
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hamburger menu button */}
        <button
          className="flex flex-col md:hidden z-50 relative"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="navLinks"
        >
          {/* "X" Icon */}
          <span className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 my-1 transition-opacity duration-300 ${isMenuOpen ? "opacity-0" : ""}`}></span>
          <span className={`w-6 h-0.5 bg-gray-800 transition-transform duration-300 ${isMenuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
