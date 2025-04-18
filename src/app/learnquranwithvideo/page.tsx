// app/listing/page.tsx
'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { videos } from '@/data/videos';

export default function ListingPage() {
  // State for dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Apply or remove dark mode class on the body element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-[#fdfcf8] to-[#fefefe] text-gray-800'
      } p-6`}
    >
      {/* Header with Dark Mode Toggle */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-center text-green-700 dark:text-green-300">
          📖 কুরআন শেখার ভিডিওসমূহ
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-4 py-2 bg-emerald-600 text-white rounded shadow hover:scale-105 transition-all"
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      {/* Video Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((video) => (
          <Link key={video.id} href={`learnquranwithvideo/video/${video.id}`}>
            <div
              className="bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden transform hover:scale-105 hover:shadow-[0_8px_15px_-3px_rgba(16,185,129,0.5)] transition-all duration-300 border border-gray-200 dark:border-gray-700 group"
            >
              {/* Thumbnail */}
              <div className="relative w-full h-48">
                <Image
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={video.title}
                  fill
                  style={{ objectFit: 'cover' }}
                  className="group-hover:brightness-90 transition duration-300"
                  onError={(e) => {
                    e.currentTarget.src = '/placeholder.jpg'; // Fallback image in /public/placeholder.jpg
                  }}
                />
              </div>

              {/* Title */}
              <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                  {video.title}
                </h2>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <Link href={`/progress`}> 
      <button
                
                className="fixed bottom-4 right-4 bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-red-600 transition"
            >
                See Progress
            </button>
      </Link>
    </div>
  );
}