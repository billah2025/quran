"use client";
import React, { useState, useRef, useEffect } from "react";

export default function CustomAudioPlayer() {
    const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(1);

    const playlist = [
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
       
    
    
    
    
    
    ];

    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Load track on index change
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
        const onEnded = () => nextTrack();

        audio.addEventListener("loadedmetadata", updateDuration);
        audio.addEventListener("timeupdate", updateCurrentTime);
        audio.addEventListener("ended", onEnded);

        return () => {
            audio.removeEventListener("loadedmetadata", updateDuration);
            audio.removeEventListener("timeupdate", updateCurrentTime);
            audio.removeEventListener("ended", onEnded);
        };
    }, [currentTrackIndex, isPlaying]);

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

    const nextTrack = () => {
        setCurrentTrackIndex((prev) => (prev + 1) % playlist.length);
    };

    const previousTrack = () => {
        setCurrentTrackIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
    };

    const handleSeekChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (audioRef.current) {
            const newTime = (value / 100) * duration;
            audioRef.current.currentTime = newTime;
            setCurrentTime(newTime);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <audio ref={audioRef} />

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                    <img src="/album-cover.jpg" alt="Cover" className="w-20 h-20 rounded-lg shadow-md" />
                    <h1 className="text-xl font-semibold">{playlist[currentTrackIndex].title}</h1>
                </div>
                <div className="text-sm">
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>

            {/* Controls */}
            <div className="flex flex-col gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={previousTrack} className="bg-gray-700 px-4 py-2 rounded-full">⏪</button>
                    <button onClick={togglePlayPause} className="bg-red-600 px-5 py-3 rounded-full text-lg">
                        {isPlaying ? "⏸️" : "▶️"}
                    </button>
                    <button onClick={nextTrack} className="bg-gray-700 px-4 py-2 rounded-full">⏩</button>

                    <input
                        type="range"
                        min={0}
                        max={100}
                        step={0.1}
                        value={duration ? (currentTime / duration) * 100 : 0}
                        onChange={handleSeekChange}
                        className="w-full h-1 rounded-lg appearance-none bg-gray-600"
                    />
                </div>

                <div className="flex justify-between items-center text-sm">
                    <div className="flex gap-2">
                        <button onClick={() => audioRef.current && (audioRef.current.currentTime -= 10)} className="bg-gray-700 px-3 py-1 rounded">-10s</button>
                        <button onClick={() => audioRef.current && (audioRef.current.currentTime += 10)} className="bg-gray-700 px-3 py-1 rounded">+10s</button>
                        <button onClick={() => {
                            setVolume(0);
                            if (audioRef.current) audioRef.current.volume = 0;
                        }} className="bg-gray-700 px-3 py-1 rounded">🔇</button>
                    </div>
                    <div>
                        Volume:
                        <input
                            type="range"
                            min={0}
                            max={1}
                            step={0.01}
                            value={volume}
                            onChange={handleVolumeChange}
                            className="ml-2"
                        />
                    </div>
                </div>
            </div>

            {/* Playlist */}
            <div className="mt-6">
                <h2 className="text-lg font-bold mb-2">🎵 Playlist</h2>
                <ul className="space-y-2">
                    {playlist.map((track, index) => (
                        <li key={index} className={`flex items-center justify-between p-2 rounded-lg ${currentTrackIndex === index ? "bg-blue-500" : "bg-gray-800 hover:bg-gray-700"} transition`}>
                            <span>{index + 1}. {track.title}</span>
                            <button
                                onClick={() => {
                                    setCurrentTrackIndex(index);
                                    setIsPlaying(true); // triggers autoplay in useEffect
                                }}
                                className="text-sm bg-gray-600 hover:bg-gray-500 px-3 py-1 rounded"
                            >
                                Play
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
