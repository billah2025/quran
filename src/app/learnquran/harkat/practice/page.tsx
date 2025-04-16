'use client'

import { useEffect, useRef, useState } from 'react'


import Link from 'next/link';
type LetterData = {
    letter: string
    bangla: string
    audio: string
    tajweed: string
    image?: string

    imageSection1?: string  // Added section 1 image field
    imageSection2?: string  // Added section 2 image field
    usageTypes?: string[]  // Added usage types field
}


const letters: LetterData[] = [
    { letter: 'ا', bangla: 'আ', audio: '/audio/harkat_exercise/ajabun.mp3', tajweed: 'হামযা: গলা থেকে উচ্চারিত হয়', usageTypes: [], imageSection1: '/svg/harkat_exercise/ajabun.svg', imageSection2: '/image/alphabetForm/alif.png' },
    { letter: 'ب', bangla: 'বা', audio: '/audio/harkat_exercise/ebema.mp3', tajweed: 'বিবরিত হরফ, ঠোঁটের ব্যবহার', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/harkat_exercise/ebema.svg', imageSection2: '/image/alphabetForm/ba.png' },

    { letter: 'ت', bangla: 'তা', audio: '/audio/harkat_exercise/hudan.mp3', tajweed: 'জিহ্বার আগা ও দাঁতের গোড়া', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/harkat_exercise/hudan.svg', imageSection2: '/image/alphabetForm/ta.png' },
    { letter: 'ث', bangla: 'সা', audio: '/audio/harkat_exercise/khatama.mp3', tajweed: 'জিহ্বার আগা ও উপরের দাঁত', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/harkat_exercise/khatama.svg', imageSection2: '/image/alphabetForm/sa.png' },
    { letter: 'ج', bangla: 'জা', audio: '/audio/harkat_exercise/lahum.mp3', tajweed: 'মধ্য জিহ্বা', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/harkat_exercise/lahum.svg', imageSection2: '/image/alphabetForm/jim.png' },
    { letter: 'ح', bangla: 'হা', audio: '/audio/harkat_exercise/unasin.mp3', tajweed: 'গলার মধ্যভাগ', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/harkat_exercise/unasin.svg', imageSection2: '/image/alphabetForm/_ha.png' },

]

export default function Home() {
    const [selectedSection, setSelectedSection] = useState<1 | 2 | 3>(1)
    const [darkMode, setDarkMode] = useState(true)
    const [popupIndex, ] = useState<number | null>(null)
    // const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    

    const playAudio = (src: string) => {
        if (audioRef.current) {
            audioRef.current.src = src
            audioRef.current.play()

        }
    }

   

    useEffect(() => {
        if (popupIndex !== null) {
            const letter = letters[popupIndex]
            playAudio(letter.audio)
        }
    }, [popupIndex])

    return (
        <main
            dir="rtl"
            className={`min-h-screen p-4 transition duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800'
                }`}
        >
            <div className="max-w-6xl mx-auto">
                {/* Section & Dark Mode */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4 flex-row-reverse">
                        {[1, 2,].map((num) => (
                            <button
                                key={num}
                                onClick={() => setSelectedSection(num as 1 | 2)}
                                className={`px-5 py-2 text-lg font-semibold rounded-full ${selectedSection === num
                                    ? 'bg-indigo-600 text-white'
                                    : 'bg-white text-indigo-600 border border-indigo-600'
                                    } transition-all duration-200 shadow`}
                            >
                                {num}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={() => setDarkMode(!darkMode)}
                        className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                    >
                        {darkMode ? 'Light Mode' : 'Dark Mode'}
                    </button>
                </div>



                <h1 className="text-3xl font-bold mb-6 text-center">
                    {selectedSection === 3 ? 'পরীক্ষা' : selectedSection === 2 ? ' প্রাকটিস' : 'প্রাকটিস '}
                </h1>



                {/* section 3 */}



                {selectedSection === 2 && (
                    <div className="py-8">
                        <h2
                            className={`text-3xl font-bold text-center mb-6 text-transparent bg-clip-text ${darkMode
                                ? "bg-gradient-to-r from-green-400 via-teal-300 to-yellow-300"
                                : "bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-400"
                                }`}
                        >
                            প্রাকটিস পরীক্ষা 🏆
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Card 1 */}
                            <Link href="/learnquran/quize/harkat/practice" passHref>
                                <div
                                    className={`relative group p-6 rounded-2xl shadow-xl transition-transform transform ${darkMode
                                        ? "bg-gray-800 text-gray-200 hover:scale-105 hover:shadow-lg"
                                        : "bg-white text-gray-900 hover:scale-105 hover:shadow-2xl"
                                        }`}
                                >
                                    {/* Trophy Icon */}
                                    <div
                                        className={`absolute top-3 left-3 w-10 h-10 flex items-center justify-center rounded-full text-lg font-bold ${darkMode
                                            ? "bg-gradient-to-r from-teal-400 to-green-400 text-gray-900"
                                            : "bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800"
                                            }`}
                                    >
                                        🏆
                                    </div>

                                    <div className="text-right">
                                        <h3 className="text-xl font-bold mb-2">1️⃣ প্রাকটিস পরীক্ষা</h3>
                                        <p className="text-sm group-hover:underline">
                                            কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            
                        </div>
                    </div>
                )}




                {/* Section 1: Letter Cards */}
                {selectedSection === 1 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                        {letters.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 rounded-xl shadow-lg transition transform hover:scale-105 relative ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                            >
                                {/* Image Only */}
                                {item.imageSection1 && (
                                    <div className="mb-4">
                                        <img
                                            src={item.imageSection1}
                                            alt={`Image for ${item.letter}`}
                                            className="mx-auto max-w-full rounded-lg shadow-md"
                                        />
                                        
                                    </div>
                                )}

                                {/* Audio Play Button */}
                                <div className="text-center">
                                    <button
                                        onClick={() => playAudio(item.audio)}
                                        className="bg-indigo-500 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition"
                                    >
                                        🔊 Play
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}



                <audio ref={audioRef} />
            </div>





        </main>
    )
}
