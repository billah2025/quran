"use client";
const arabicFonts = ["font-arabic", "font-serif", "font-sans", "font-indopak"];
const banglaFonts = ["font-bangla", "font-serif", "font-sans"]; // Added Bangla fonts
import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, Moon, Sun } from "lucide-react";

interface SideDrawerProps {
  arabicFontSize: number;
  banglaFontSize: number;
  setArabicFontSize: (size: number) => void;
  setBanglaFontSize: (size: number) => void;
  arabicFont: string;
  banglaFont: string;
  setArabicFont: (font: string) => void;
  setBanglaFont: (font: string) => void;
  arabicScript: string;
  setArabicScript: (script: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  // Add these lines:
  textType: string;
  setTextType: (value: string) => void;
}

export default function SideDrawer({
  arabicFontSize,
  banglaFontSize,
  setArabicFontSize,
  setBanglaFontSize,
  arabicFont,
  banglaFont,
  setArabicFont,
  setBanglaFont,
  arabicScript,
  setArabicScript,
  darkMode,
  setDarkMode,
  
}: SideDrawerProps) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Close drawer on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Toggle dark mode
  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <div className="fixed top-0 left-0 h-full z-50 flex items-start">
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="bg-green-600 text-white p-2 rounded-r-md mt-10 z-50"
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </button>

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 text-black dark:text-white shadow-xl transform transition-transform duration-300 z-40 p-4 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h2 className="text-xl font-bold mb-4">🛠 Settings</h2>

        {/* Arabic Font Size */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Arabic Font Size</label>
          <input
            type="range"
            min="16"
            max="48"
            value={arabicFontSize}
            onChange={(e) => setArabicFontSize(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-500 dark:text-gray-300">Size: {arabicFontSize}px</p>
        </div>

        {/* Bangla Font Size */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Bangla Font Size</label>
          <input
            type="range"
            min="12"
            max="32"
            value={banglaFontSize}
            onChange={(e) => setBanglaFontSize(Number(e.target.value))}
            className="w-full"
          />
          <p className="text-sm text-gray-500 dark:text-gray-300">Size: {banglaFontSize}px</p>
        </div>

        {/* Arabic Font Selection */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Arabic Font</label>
          <select
            value={arabicFont}
            onChange={(e) => setArabicFont(e.target.value)}
            className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
          >
            {arabicFonts.map((font) => (
              <option key={font} value={font}>
                {font.replace("font-", "").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Bangla Font Selection */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Bangla Font</label>
          <select
            value={banglaFont}
            onChange={(e) => setBanglaFont(e.target.value)}
            className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
          >
            {banglaFonts.map((font) => (
              <option key={font} value={font}>
                {font.replace("font-", "").toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Dark Mode Toggle */}
        <div className="mt-6 flex items-center justify-between">
          <span className="font-semibold">🌙 Dark Mode</span>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full"
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
}