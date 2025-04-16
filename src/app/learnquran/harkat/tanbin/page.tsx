'use client'

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

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
   
        { letter: 'اٌ', bangla: '', audio: '/audio/tanbin/alif_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'اٍ', bangla: '', audio: '/audio/tanbin/alif_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'اً', bangla: '', audio: '/audio/tanbin/alif_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'بٌ', bangla: '', audio: '/audio/tanbin/ba_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'بٍ', bangla: '', audio: '/audio/tanbin/ba_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'بً', bangla: '', audio: '/audio/tanbin/ba_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'عٌ', bangla: '', audio: '/audio/tanbin/ain_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'عٍ', bangla: '', audio: '/audio/tanbin/ain_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'عً', bangla: '', audio: '/audio/tanbin/ain_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'غٌ', bangla: '', audio: '/audio/tanbin/gawin_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'غٍ', bangla: '', audio: '/audio/tanbin/gawin_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'غً', bangla: '', audio: '/audio/tanbin/gawin_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'قٌ', bangla: '', audio: '/audio/tanbin/qaf_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'قٍ', bangla: '', audio: '/audio/tanbin/qaf_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'قً', bangla: '', audio: '/audio/tanbin/qaf_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'كٌ', bangla: '', audio: '/audio/tanbin/kaf_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'كٍ', bangla: '', audio: '/audio/tanbin/kaf_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'كً', bangla: '', audio: '/audio/tanbin/kaf_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'وٌ', bangla: '', audio: '/audio/tanbin/oa_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'وٍ', bangla: '', audio: '/audio/tanbin/oa_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'وً', bangla: '', audio: '/audio/tanbin/oa_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'يٌ', bangla: '', audio: '/audio/tanbin/ya_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'يٍ', bangla: '', audio: '/audio/tanbin/ya_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'يً', bangla: '', audio: '/audio/tanbin/ya_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'ءٌ', bangla: '', audio: '/audio/tanbin/hamza_2_pesh.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'ءٍ', bangla: '', audio: '/audio/tanbin/hamza_2_jerr.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' },
        { letter: 'ءً', bangla: '', audio: '/audio/tanbin/hamza_2_jabar.mp3', tajweed: '', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '' }
      
]

export default function Home() {
    const [selectedSection, setSelectedSection] = useState<1 | 2 | 3>(1)
    const [darkMode, setDarkMode] = useState(true)
    const [popupIndex, setPopupIndex] = useState<number | null>(null)
    // const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const currentPopup = popupIndex !== null ? letters[popupIndex] : null
    


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
                        {[1, 2, 3].map((num) => (
                            <button
                                key={num}
                                onClick={() => setSelectedSection(num as 1 | 2 | 3)}
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
                    {selectedSection === 3 ? 'পরীক্ষা' : selectedSection === 2 ? ' তানবীন যক্ত বর্ণের উচ্চারণ' : 'তানবীন পরিচিতি '}
                </h1>



                {/* section 3 */}



                {selectedSection === 3 && (
                    <div className="py-8">
                        <h2
                            className={`text-3xl font-bold text-center mb-6 text-transparent bg-clip-text ${darkMode
                                ? "bg-gradient-to-r from-green-400 via-teal-300 to-yellow-300"
                                : "bg-gradient-to-r from-blue-400 via-pink-500 to-yellow-400"
                                }`}
                        >
                            তানবীন পরিচিতি পরীক্ষা 🏆
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Card 1 */}
                            <Link href="/learnquran/quize/harkatquiz" passHref>
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
                                        <h3 className="text-xl font-bold mb-2">1️⃣ তানবিন পরিক্ষা </h3>
                                        <p className="text-sm group-hover:underline">
                                            কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Card 2 */}
                          
                           
                        </div>
                    </div>
                )}




                {/* Section 1: Letter Cards */}
                {selectedSection === 2 && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {letters.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => playAudio(item.audio)}
                                className={`p-4 rounded shadow relative cursor-pointer transition transform hover:scale-105 ${darkMode ? 'bg-gray-800' : 'bg-white'}`}
                            >
                                <div className="text-5xl font-bold text-center mb-2">{item.letter}</div>
                                <div className="text-right">{item.bangla}</div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        setPopupIndex(index)
                                    }}
                                    className="absolute top-2 left-2 text-xs bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-700"
                                >
                                    ?
                                </button>

                                
                            </div>
                        ))}
                    </div>
                )}

                {/* Section 2: Letter Usage Cards */}
                {selectedSection === 1 && (
                   <div className='text-left' >
                   <h1 className=' text-justify   text-3xl leading-15   '>
                   কখনো কখনো অক্ষরে দুই যবর, দুই যের, দুই পেশ ব্যাবহার হতে পারে, একে <strong>তানবিন</strong> বলে। 
                   এর উচ্চারন এক যবর, এক যের, এক পেশ এর মতই হবে তবে একটা আলাদা 
                   <span className="text-red-500 font-bold m-1.5 text-3xl "> &apos;ন&apos; </span> যুক্ত হবে। এটি তাজবীদের নিয়ম অনুযায়ী বেশ স্পষ্ট করে উচ্চারণ করা হয়, যা কুরআন পাঠে বিশেষ গুরত্বপূর্ণ।
                
                  
                 </h1>
                 <h2 className='mt-25  text-justify   text-3xl leading-15 '> তানবীন এর মাধ্যমে শব্দটি আরও সম্পূর্ণ এবং সঠিকভাবে উচ্চারণ করা হয়। এটি মূলত ব্যাকরণ এবং উচ্চারণের অংশ হিসেবে আরবি ভাষায় একটি প্রাসঙ্গিক বৈশিষ্ট্য। 
                 সঠিক তানবীন এর প্রয়োগ কুরআন শিক্ষায় শুদ্ধতার প্রতীক হিসেবে বিবেচিত।</h2> 
                 </div>




               
                )}
                

                {/* Popup Modal */}
                {currentPopup && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setPopupIndex(null)
                            if (e.key === 'ArrowRight' && popupIndex !== null && popupIndex < letters.length - 1) {
                                setPopupIndex(popupIndex + 1)
                            }
                            if (e.key === 'ArrowLeft' && popupIndex !== null && popupIndex > 0) {
                                setPopupIndex(popupIndex - 1)
                            }
                        }}
                        tabIndex={0}
                    >
                        <div
                            className={`w-[90%] max-w-md rounded-xl overflow-hidden shadow-lg border-2 relative outline-none ${darkMode ? 'bg-gray-800 text-white border-indigo-500' : 'bg-white text-gray-800 border-indigo-300'
                                }`}
                        >
                            <button
                                onClick={() => setPopupIndex(null)}
                                className="absolute top-3 right-3 text-red-500 hover:text-red-700 text-xl font-bold"
                                aria-label="Close"
                            >
                                ✖
                            </button>

                            <div className="p-6 pt-8 text-center space-y-3">
                                <div className="absolute top-3 left-3 text-sm text-gray-500">
                                    {popupIndex! + 1} of {letters.length}
                                </div>
                                <div className="text-5xl font-bold">{currentPopup.letter}</div>
                                <div className="text-lg text-right leading-relaxed">{currentPopup.tajweed}</div>
                                <Image
                                    src={currentPopup.imageSection1 || '/default-image.png'}
                                    alt="Letter visual"
                                    className="mx-auto h-32 object-contain rounded-lg border"
                                    width={250}
                                    height={250}
                                />
                            </div>

                            <div className="flex justify-between items-center border-t p-4">
                                <button
                                    onClick={() => popupIndex! < letters.length - 1 && setPopupIndex(popupIndex! + 1)}
                                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                                >
                                     →পরবর্তী
                                </button>
                                <button
                                    onClick={() => popupIndex! > 0 && setPopupIndex(popupIndex! - 1)}
                                    className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
                                >
                                    পূর্ববর্তী ← 
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <audio ref={audioRef} />
            </div>





        </main>
    )
}
