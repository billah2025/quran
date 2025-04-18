'use client';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { videos } from '@/data/videos';

// Define the type for the progress state
interface Progress {
  timeSpent: number;
  lastWatched: string | null; // Allow lastWatched to be either a string or null
}

export default function VideoPage() {
  const { id } = useParams();
  const router = useRouter();
  const index = videos.findIndex((v) => v.id === id);
  const video = videos[index];

  // State to manage dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);

  // State to track video progress
  const [progress, setProgress] = useState<Progress>({ timeSpent: 0, lastWatched: null });

  // Load progress from localStorage when the component mounts
  useEffect(() => {
    if (video) {
      const storedData = localStorage.getItem(`video-${id}`); // Retrieve data
      const parsedProgress: Progress = storedData ? JSON.parse(storedData) : { timeSpent: 0, lastWatched: null }; // Handle null
      setProgress(parsedProgress);
    }
  }, [id, video]);

  // Save progress to localStorage every second
  useEffect(() => {
    if (video) {
      const interval = setInterval(() => {
        const updatedProgress: Progress = {
          timeSpent: progress.timeSpent + 1, // Increment by 1 second
          lastWatched: new Date().toISOString(), // Update last watched timestamp
        };
        localStorage.setItem(`video-${id}`, JSON.stringify(updatedProgress)); // Save updated progress
        setProgress(updatedProgress);
      }, 1000); // Update every second

      return () => clearInterval(interval); // Cleanup interval on unmount
    }
  }, [id, video, progress]);

  // Explicitly type the step parameter
  const handleNavigation = (step: number) => {
    const newIndex = index + step;
    if (videos[newIndex]) {
      router.push(`/learnquranwithvideo/video/${videos[newIndex].id}`);
    }
  };

  if (!video) return <div className="p-6 text-red-600">Video not found</div>;

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900' : 'bg-gradient-to-br from-white to-blue-50'} p-6 space-y-6`}>
      {/* Dark Mode Toggle Button */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed top-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
      >
        {isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>

      <h1 className={`text-2xl font-bold text-center ${isDarkMode ? 'text-white' : 'text-blue-700'}`}>
        {video.title}
      </h1>

      <div className="max-w-4xl mx-auto rounded-xl overflow-hidden shadow-lg border border-blue-200">
        <iframe
          className="w-full aspect-video"
          src={`https://www.youtube.com/embed/${video.youtubeId}`}
          title={video.title}
          allowFullScreen
        />
      </div>

      <div className={`max-w-4xl mx-auto p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow`}>
        <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>{video.description}</p>
      </div>

      <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-4">
        <button onClick={() => alert("Go to Notes")} className={`btn-style ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}>📝 Notes</button>
        <button onClick={() => router.push("/quiz")} className={`btn-style ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}>🎯 Quiz</button>
        <button onClick={() => router.push("/extra")} className={`btn-style ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}>📁 More</button>
      </div>

      <div className="max-w-4xl mx-auto flex justify-between">
        <button onClick={() => handleNavigation(-1)} className={`nav-btn ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}>⬅ Previous</button>
        <button onClick={() => handleNavigation(1)} className={`nav-btn ${isDarkMode ? 'bg-gray-700 text-white' : ''}`}>Next ➡</button>
      </div>
    </div>
  );
}