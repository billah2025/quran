'use client';
import { useEffect, useState } from 'react';
import { videos } from '@/data/videos';
import { Clock, PlayCircle, History } from 'lucide-react';

interface ProgressData {
  id: string;
  title: string;
  timeSpent: number;
  lastWatched: string | null;
}

export default function ProgressPage() {
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [animatedTime, setAnimatedTime] = useState(0);

  useEffect(() => {
    const getProgress = (): ProgressData[] => {
      return videos.map((video) => {
        const storedData = typeof window !== 'undefined' ? localStorage.getItem(`video-${video.id}`) : null;
        const parsedProgress = storedData ? JSON.parse(storedData) : { timeSpent: 0, lastWatched: null };
        return { ...video, ...parsedProgress };
      }).filter((p) => p.timeSpent > 0);
    };

    const data = getProgress();
    setProgressData(data);

    const totalTime = data.reduce((sum, p) => sum + Number(p.timeSpent), 0);

    // Animate the time counter
    let current = 0;
    const interval = setInterval(() => {
      if (current < totalTime) {
        current += 5;
        setAnimatedTime(current);
      } else {
        setAnimatedTime(totalTime);
        clearInterval(interval);
      }
    }, 10);
  }, []);

  const lastWatched = progressData.sort((a, b) =>
    new Date(b.lastWatched || 0).getTime() - new Date(a.lastWatched || 0).getTime()
  )[0];

  const totalVideosWatched = progressData.length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700 text-center">Your Progress</h1>

      <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg space-y-6 transition-all duration-500 hover:shadow-2xl">
        {/* Last Watched Video */}
        <div className="flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition">
          <History className="text-blue-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Last Watched Video:</h2>
            <p className="text-gray-700">
              {lastWatched ? lastWatched.title : 'No videos watched yet.'}
            </p>
          </div>
        </div>

        {/* Total Videos Watched */}
        <div className="flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition">
          <PlayCircle className="text-green-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Total Videos Watched:</h2>
            <p className="text-gray-700">{totalVideosWatched}</p>
          </div>
        </div>

        {/* Total Time Spent */}
        <div className="flex items-center gap-3 hover:bg-blue-50 p-3 rounded-lg transition">
          <Clock className="text-purple-500" />
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Total Time Spent:</h2>
            <p className="text-gray-700">{Math.floor(animatedTime / 60)} minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
