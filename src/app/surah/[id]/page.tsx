"use client";
import { useState, useEffect, useRef } from "react";
import SideDrawer from "@/app/components/SideDrawer";
import { notFound, useParams } from "next/navigation";
import { useCallback } from "react"; // Import useCallback

interface Ayah {
  number: number;
  numberInSurah: number;
  text: string;
  audio?: string;
}

interface SurahData {
  arabicAyahs: Ayah[];
  banglaAyahs: Ayah[];
  audioAyahs: Ayah[];
  surahInfo: {
    name: string;
    englishName: string;
    englishNameTranslation: string;
    number: number;
  };
}



export default function SurahPage() {
  const { id } = useParams();

const [data, setData] = useState<SurahData | null>(null);
  const [error, setError] = useState(false);
  const [currentAyahIndex, setCurrentAyahIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ayahRefs = useRef<(HTMLDivElement | null)[]>([]);



  // Dark Mode state
  const [darkMode, setDarkMode] = useState(false);

  // Font controls for Arabic and Bangla
  const [arabicFontSize, setArabicFontSize] = useState(28);
  const [banglaFontSize, setBanglaFontSize] = useState(18);
  const [arabicFont, setArabicFont] = useState("font-arabic");
  const [banglaFont, setBanglaFont] = useState("font-bangla");

  // Fetch data for the surah
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [arabicRes, banglaRes, audioRes] = await Promise.all([
          fetch(`https://api.alquran.cloud/v1/surah/${id}/quran-uthmani`),
          fetch(`https://api.alquran.cloud/v1/surah/${id}/bn.bengali`),
          fetch(`https://api.alquran.cloud/v1/surah/${id}/ar.alafasy`),
        ]);

        if (!arabicRes.ok || !banglaRes.ok || !audioRes.ok) {
          setError(true);
          return;
        }

        const arabicData = await arabicRes.json();
        const banglaData = await banglaRes.json();
        const audioData = await audioRes.json();

        setData({
          arabicAyahs: arabicData.data.ayahs,
          banglaAyahs: banglaData.data.ayahs,
          audioAyahs: audioData.data.ayahs,
          surahInfo: arabicData.data,
        });
      } catch {
        setError(true);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

 
  
// Memoize scrollToCurrentAyah
const scrollToCurrentAyah = useCallback(() => {
  if (currentAyahIndex !== null && ayahRefs.current[currentAyahIndex]) {
    ayahRefs.current[currentAyahIndex].scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }
}, [currentAyahIndex]);

// Memoize handleAudioEnd
const handleAudioEnd = useCallback(() => {
  if (
    currentAyahIndex !== null &&
    currentAyahIndex + 1 < data!.audioAyahs.length
  ) {
    setCurrentAyahIndex(currentAyahIndex + 1);
  } else {
    setIsPlaying(false);
  }
}, [currentAyahIndex, data]);

// Memoize playCurrentAyah
const playCurrentAyah = useCallback(() => {
  if (audioRef.current && currentAyahIndex !== null) {
    const currentAudio = data!.audioAyahs[currentAyahIndex]?.audio;
    if (currentAudio) {
      audioRef.current.src = currentAudio;
      audioRef.current.play();
    }
  }
}, [currentAyahIndex, data]);

// Update useEffect (moved below the declarations)
useEffect(() => {
  if (!data || !audioRef.current) return;

  if (currentAyahIndex !== null && isPlaying) {
    playCurrentAyah();
    audioRef.current.addEventListener("ended", handleAudioEnd);
  }

  scrollToCurrentAyah();

  return () => {
    audioRef.current?.removeEventListener("ended", handleAudioEnd);
  };
}, [currentAyahIndex, isPlaying, data, handleAudioEnd, playCurrentAyah, scrollToCurrentAyah]);





























  const playSpecificAyah = (index: number) => {
    setCurrentAyahIndex(index);
    setIsPlaying(true);
  };

  const stopPlayback = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setCurrentAyahIndex(null);
  };

  if (error) return notFound();
  if (!data) return <div>Loading...</div>;

  const { arabicAyahs, banglaAyahs, surahInfo } = data;

  return (
    <div
      className={`min-h-screen p-4 md:p-8 ${darkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-800"}`}
    >
      <SideDrawer
        arabicFontSize={arabicFontSize}
        banglaFontSize={banglaFontSize}
        setArabicFontSize={setArabicFontSize}
        setBanglaFontSize={setBanglaFontSize}
        arabicFont={arabicFont}
        banglaFont={banglaFont}
        setArabicFont={setArabicFont}
        setBanglaFont={setBanglaFont}
        setDarkMode={setDarkMode}
       
        darkMode={darkMode}
      />

      {/* Surah Header */}
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-bold text-center text-green-700">
          📖 {surahInfo.englishName} ({surahInfo.name})
        </h1>
      </div>

      {/* Surah Description */}
      <h2 className="text-center text-gray-600 text-lg mb-10 italic">
        {surahInfo.englishNameTranslation}
      </h2>

      {/* Bismillah Line */}
      {surahInfo.number !== 1 && surahInfo.number !== 9 && (
        <div className="text-center text-2xl md:text-3xl font-arabic text-green-800 mb-8">
          ﷽
        </div>
      )}

      {/* Stop Playback Button */}
      {isPlaying && (
        <div
          onClick={stopPlayback}
          className="fixed bottom-10 right-10 bg-red-500 text-white w-16 h-16 flex items-center justify-center rounded-full shadow-lg cursor-pointer hover:bg-red-600 transition"
          title="Stop Playback"
        >
          ❌
        </div>
      )}

      {/* Central Audio Player */}
      <audio ref={audioRef} className="hidden" />

      {/* Surah Verses */}
<div className="space-y-6">
{arabicAyahs.map((ayah: Ayah, index: number) => (

    <div
      key={ayah.number}
      ref={(el) => {
        ayahRefs.current[index] = el;
      }}
      className={`p-4 md:p-6 rounded-xl shadow border 
        ${darkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"} 
        ${
          currentAyahIndex === index
            ? darkMode
              ? "border-green-500 bg-green-700"
              : "border-green-500 bg-green-100"
            : ""
        } 
        hover:shadow-md transition-all`}
      onClick={() => playSpecificAyah(index)}
    >
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between">
        {/* Arabic Text */}
        <div
          className={`text-end leading-loose w-full md:w-1/2 ${arabicFont}`}
          style={{ fontSize: `${arabicFontSize}px` }}
        >
          {ayah.text}
          <span className="text-sm text-gray-400 mx-1">
            ({ayah.numberInSurah})
          </span>
        </div>

        {/* Bangla Translation */}
        <div
          className={`mt-4 md:mt-0 md:ml-6 w-full md:w-1/2 ${banglaFont} ${
            darkMode ? "text-gray-300" : "text-gray-800"
          }`}
          style={{ fontSize: `${banglaFontSize}px` }}
        >
        {banglaAyahs[index]?.text || "লোড হচ্ছে..."}

        </div>
      </div>
    </div>
  ))}
</div>




      
    </div>
  );
}
