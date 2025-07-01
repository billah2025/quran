"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronRight, ChevronLeft, Moon, Sun } from "lucide-react";

// Arabic and Bangla fonts
const arabicFonts = [
  "font-indopak", "font-arabic", "font-amiri", "font-ibn-khaldun",
  "font-ibn-khaldun-bold", "font-ibn-khaldun-light", "font-ibn-khaldun-thin",
  "font-ibn-khaldun-black", "font-ibn-khaldun-medium", "font-ibn-khaldun-semibold"
];
const banglaFonts = ["font-bangla", "font-serif", "font-sans"];

// Kari / Reciter list
 
const reciters = [
  { id: "ar.abdulbasitmurattal", name: "Abdul Basit (Murattal)" },
  { id: "ar.abdullahbasfar", name: "Abdullah Basfar" },
  { id: "ar.abdurrahmaansudais", name: "Abdurrahmaan As-Sudais" },
  { id: "ar.abdulsamad", name: "Abdul Samad" },
  { id: "ar.shaatree", name: "Abu Bakr Ash-Shaatree" },
  { id: "ar.ahmedajamy", name: "Ahmed ibn Ali al-Ajamy" },
  { id: "ar.alafasy", name: "Mishary Rashid Alafasy" },
  { id: "ar.hanirifai", name: "Hani Rifai" },
  { id: "ar.husary", name: "Mahmoud Khalil Al-Husary" },
  { id: "ar.husarymujawwad", name: "Husary (Mujawwad)" },
  { id: "ar.hudhaify", name: "Ali Al-Hudhaify" },
  { id: "ar.ibrahimakhbar", name: "Ibrahim Akhdar" },
  { id: "ar.mahermuaiqly", name: "Maher Al Muaiqly" },
  { id: "ar.minshawi", name: "Minshawi" },
  { id: "ar.minshawimujawwad", name: "Minshawi (Mujawwad)" },
  { id: "ar.muhammadayyoub", name: "Muhammad Ayyoub" },
  { id: "ar.muhammadjibreel", name: "Muhammad Jibreel" },
  { id: "ar.saoodshuraym", name: "Saud Ash-Shuraym" },
  { id: "ar.aymanswoaid", name: "Ayman Sowaid" },
  { id: "ar.parhizgar", name: "Parhizgar" }
];
const translationLanguages = [
  { id: "bn.bengali", name: "Bengali" },
  { id: "en.sahih", name: "English – Sahih International" },
  { id: "en.yusufali", name: "English – Yusuf Ali" },
  { id: "en.pickthall", name: "English – Pickthall" },
  { id: "en.ahmedali", name: "English – Ahmed Ali" },
  { id: "ur.jalandhry", name: "Urdu – Jalandhry" },
  { id: "fr.hamidullah", name: "French – Hamidullah" },
  { id: "de.aburida", name: "German – Abu Rida" },
  { id: "ru.kuliev", name: "Russian – Elmir Kuliev" },
  { id: "zh.chinese", name: "Chinese" },
  { id: "hi.hindi", name: "Hindi" },
  { id: "id.indonesian", name: "Indonesian" },
  { id: "tr.translators", name: "Turkish" },
  { id: "fa.ayati", name: "Farsi – Ayati" },
  { id: "ml.basheer", name: "Malayalam – Basheer" },
  { id: "es.cortes", name: "Spanish – Cortes" },
  { id: "pt.elhayek", name: "Portuguese – El Hayek" },
  { id: "ja.japanese", name: "Japanese" },
  { id: "sw.barwani", name: "Swahili – Barwani" },
  { id: "so.abduh", name: "Somali – Abduh" },
  { id: "nl.keyzer", name: "Dutch – Keyzer" }
];




 

interface SideDrawerProps {
  arabicFontSize: number;
  banglaFontSize: number;
  setArabicFontSize: (size: number) => void;
  setBanglaFontSize: (size: number) => void;
  arabicFont: string;
  banglaFont: string;
  setArabicFont: (font: string) => void;
  setBanglaFont: (font: string) => void;
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  reciter: string;
  setReciter: (reciter: string) => void;
   
  translationLang: string;
  setTranslationLang: (lang: string) => void;
    displayMode: string;
  setDisplayMode: (mode: string) => void;
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
  darkMode,
  setDarkMode,
  reciter,
  setReciter,
  translationLang,
  setTranslationLang,
  displayMode,
  setDisplayMode,
}: SideDrawerProps) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  useEffect(() => {
  localStorage.setItem("settings", JSON.stringify({
    arabicFontSize,
    banglaFontSize,
    arabicFont,
    banglaFont,
    darkMode,
    reciter,
    translationLang,
      displayMode
  }));
}, [arabicFontSize, banglaFontSize, arabicFont, banglaFont, darkMode, reciter, translationLang , displayMode]);

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
          <label className="block mb-1 font-semibold">Translation Font Size</label>
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
        {/* Translation Language Selection */}
<div className="mb-4">
  <label className="block mb-1 font-semibold">Translation Language</label>
  <select
    value={translationLang}
    onChange={(e) => setTranslationLang(e.target.value)}
    className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
  >
    {translationLanguages.map((lang) => (
      <option key={lang.id} value={lang.id}>
        {lang.name}
      </option>
    ))}
  </select>
</div>

        {/* Reciter Selection */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Reciter</label>
          <select
            value={reciter}
            onChange={(e) => setReciter(e.target.value)}
            className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
          >
            {reciters.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        {/* Display Mode Selection */}
<div className="mb-4">
  <label className="block mb-1 font-semibold">Display Mode</label>
  <select
    value={displayMode}
    onChange={(e) => setDisplayMode(e.target.value)}
    className="w-full border rounded px-2 py-1 dark:bg-gray-800 dark:border-gray-600"
  >
    <option value="both">Arabic + Translation</option>
    <option value="arabic">Arabic Only</option>
    <option value="translation">Translation Only</option>
    <option value="reading">Arabic Reading Mode</option>
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
