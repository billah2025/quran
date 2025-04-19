"use client";
import React, { useState, useRef, useEffect, useCallback, useMemo } from "react";
import Image from "next/image";

export default function CustomAudioPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);

  const playlist = useMemo(() => [
    { title: "বদনজর  | বদনজরের রুকইয়াহ", src: "https://files.ruqyahbd.org/audio/Ruqyah-EvilEye-ruqyahbd.org.mp3 " },
    { title: " বদনজর (Eye Hasad)", src: "https://files.ruqyahbd.org/audio/Ruqyah-EyeHasad-ruqyahbd.org.mp3" },
    { title: " জাদু ও জিন (Sihr-Mass) ", src: "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Mass-ruqyahbd.org.mp3" },
    { title: " আয়াতুল হারক", src: "https://files.ruqyahbd.org/audio/Ruqyah-Harq-ruqyahbd.org.mp3" },
    { title: " জিনের আছর এর রুকইয়াহ", src: "https://files.ruqyahbd.org/audio/Ruqyah-Jinn-ruqyahbd.org.mp3" },
    { title: "তিনকুল এর রুকইয়াহ", src: "/https://files.ruqyahbd.org/audio/Ruqyah-3Kul-ruqyahbd.org.mp3" },
    { title: "  কালো যাদু, বান এবং জিন (Sihr-Hibshi)", src: "https://files.ruqyahbd.org/audio/Ruqyah-Sihr-Hibshi-ruqyahbd.org.mp3" },
    { title: "আট সুরার রুকইয়াহ", src: "https://files.ruqyahbd.org/audio/Ruqyah-8surah-ruqyahbd.org.mp3" },
    { title: " আয়াতুল কুরসির রুকইয়াহ", src: " https://files.ruqyahbd.org/audio/Ruqyah-AyatulKursi-ruqyahbd.org.mp3" },
    { title: " যাদুকরদের প্রতি অভিশাপ", src: "https://files.ruqyahbd.org/audio/curse-against-magician-ruqyahbd.org.mp3" },
    { title: " ক্বারিদের সাধারণ রুকইয়াহ(শাইখ আস-সুদাইস)", src: "https://files.ruqyahbd.org/audio/Ruqyah-Sudais-ruqyahbd.org.mp3" },
    { title: " ক্বারিদের সাধারণ রুকইয়াহ(শাইখ হুজাইফি)", src: "https://files.ruqyahbd.org/audio/Ruqyah-Hujaifi-ruqyahbd.org.mp3" },
    { title: " ক্বারিদের সাধারণ রুকইয়াহ( শাইখ আশ-শুরাইম)", src: "https://files.ruqyahbd.org/audio/Ruqyah-Shuraim-ruqyahbd.org.mp3" },
    { title: " ক্বারিদের সাধারণ রুকইয়াহ(সা'দ আল-গামিদী)", src: "https://files.ruqyahbd.org/audio/Ruqyah-Ghamidi-ruqyahbd.org.mp3" },
    { title: " ক্বারিদের সাধারণ রুকইয়াহ(মিশারী রাশেদ আল-আফাসী)", src: " https://files.ruqyahbd.org/audio/Ruqyah-Mishary-ruqyahbd.org.mp3" },
    { title: " ক্বারিদের সাধারণ রুকইয়াহ(শাইখ আহমাদ আজমি)", src: "https://files.ruqyahbd.org/audio/Ruqyah-AhmadAjmy-ruqyahbd.org.mp3" },
    { title: " ক্বারিদের সাধারণ রুকইয়াহ(শাইখ আস-সুদাইস)", src: "" },
  ], []);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const nextTrack = useCallback(() => {
    setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
  }, [playlist.length]);

  const previousTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.src = playlist[currentTrackIndex].src;
    audio.load();

    if (isPlaying) {
      audio.play();
    }

    const updateDuration = () => setDuration(audio.duration || 0);
    const updateCurrentTime = () => setCurrentTime(audio.currentTime || 0);
    const handleEnded = () => nextTrack();

    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentTrackIndex, isPlaying, nextTrack]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = (parseFloat(e.target.value) / 100) * duration;
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const formatTime = (time: number) =>
    `${Math.floor(time / 60).toString().padStart(2, "0")}:${Math.floor(time % 60).toString().padStart(2, "0")}`;

  const handleTrackSelect = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <audio ref={audioRef} />

      {/* Top Info */}
      <div className="flex items-center gap-4 mb-4">
        <Image
          src="/album-cover.jpg"
          alt="Album Cover"
          width={80}
          height={80}
          className="rounded-md shadow-lg"
        />
        <div>
          <h1 className="text-2xl font-semibold">{playlist[currentTrackIndex].title}</h1>
        </div>
      </div>

      {/* Controls + Seek */}
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap md:flex-nowrap justify-between items-center gap-4">
          <div className="flex gap-3">
            <button onClick={previousTrack} className="bg-gray-700 px-4 py-2 rounded">⏮️</button>
            <button onClick={togglePlayPause} className="bg-blue-500 px-6 py-2 rounded">
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            <button onClick={nextTrack} className="bg-gray-700 px-4 py-2 rounded">⏭️</button>
          </div>

          <input
            type="range"
            value={duration ? (currentTime / duration) * 100 : 0}
            onChange={handleSeek}
            className="flex-1 accent-blue-500"
          />
        </div>

        {/* Volume + Time */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            🔊
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={handleVolume}
              className="w-32 accent-blue-500"
            />
          </div>
          <div className="text-sm text-gray-300">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>
      </div>

      {/* Playlist */}
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-3">🎵 Playlist</h2>
        <ul className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
          {playlist.map((track, index) => (
            <li
              key={index}
              onClick={() => handleTrackSelect(index)}
              className={`p-3 rounded-md cursor-pointer transition-all ${
                index === currentTrackIndex
                  ? "bg-blue-600 text-white"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {index === currentTrackIndex ? "✅ " : "🎧 "} {track.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
