'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'

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
    { letter: 'ا', bangla: 'আ', audio: '/audio/1.mp3', tajweed: 'হামযা: গলা থেকে উচ্চারিত হয়', usageTypes: [], imageSection1: '/quran.jpg', imageSection2: '/image/alphabetForm/alif.png' },
    { letter: 'ب', bangla: 'বা', audio: '/audio/2.mp3', tajweed: 'বিবরিত হরফ, ঠোঁটের ব্যবহার', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/ba.png' },

    { letter: 'ت', bangla: 'তা', audio: '/audio/3.mp3', tajweed: 'জিহ্বার আগা ও দাঁতের গোড়া', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/ta.png' },
    { letter: 'ث', bangla: 'সা', audio: '/audio/4.mp3', tajweed: 'জিহ্বার আগা ও উপরের দাঁত', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/tha_jal_jaw.svg', imageSection2: '/image/alphabetForm/sa.png' },
    { letter: 'ج', bangla: 'জা', audio: '/audio/5.mp3', tajweed: 'মধ্য জিহ্বা', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/jim.png' },
    { letter: 'ح', bangla: 'হা', audio: '/audio/6.mp3', tajweed: 'গলার মধ্যভাগ', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/_ha.svg', imageSection2: '/image/alphabetForm/_ha.png' },
    { letter: 'خ', bangla: 'খা', audio: '/audio/7.mp3', tajweed: 'গলার শীর্ষভাগ', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/kha.png' },
    { letter: 'د', bangla: 'দাল', audio: '/audio/8.mp3', tajweed: 'জিহ্বার আগা ও দাঁতের গোড়া', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/dal.png' },
    { letter: 'ذ', bangla: 'যাল', audio: '/audio/9.mp3', tajweed: 'জিহ্বার আগা ও উপরের দাঁত', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/tha_jal_jaw.svg', imageSection2: '/image/alphabetForm/jal.png' },
    { letter: 'ر', bangla: 'র', audio: '/audio/10.mp3', tajweed: 'জিহ্বার আগা ও তালু', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/ra.png' },
    { letter: 'ز', bangla: 'য', audio: '/audio/11.mp3', tajweed: 'জিহ্বার আগা ও দাঁতের গোড়া', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/jha.png' },
    { letter: 'س', bangla: 'সীন', audio: '/audio/12.mp3', tajweed: 'জিহ্বার আগা ও দাঁতের গোড়া', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/sin.png' },
    { letter: 'ش', bangla: 'শীন', audio: '/audio/13.mp3', tajweed: 'মধ্য জিহ্বা', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/shin.png' },
    { letter: 'ص', bangla: 'সোয়াদ', audio: '/audio/14.mp3', tajweed: 'জিহ্বার আগা ও তালু', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/sawd.png' },
    { letter: 'ض', bangla: 'দোয়াদ', audio: '/audio/15.mp3', tajweed: 'জিহ্বার পার্শ্ব ও মোলার দাঁত', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/dawd.png' },
    { letter: 'ط', bangla: 'ত্বা', audio: '/audio/16.mp3', tajweed: 'জিহ্বার আগা ও তালু', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/taw.png' },
    { letter: 'ظ', bangla: 'যা', audio: '/audio/17.mp3', tajweed: 'জিহ্বার আগা ও দাঁতের গোড়া', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/tha_jal_jaw.svg', imageSection2: '/image/alphabetForm/jaw.png' },
    { letter: 'ع', bangla: 'আইন', audio: '/audio/18.mp3', tajweed: 'গলার নিম্নভাগ', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/ain_qaf.svg', imageSection2: '/image/alphabetForm/ain.png' },
    { letter: 'غ', bangla: 'গোয়াইন', audio: '/audio/19.mp3', tajweed: 'গলার শীর্ষভাগ', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/gawin.png' },
    { letter: 'ف', bangla: 'ফা', audio: '/audio/20.mp3', tajweed: 'উপরের দাঁতের গোড়া ও নিচের ঠোঁট', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/fa.png' },
    { letter: 'ق', bangla: 'ক্বাফ', audio: '/audio/21.mp3', tajweed: 'জিহ্বার শীর্ষভাগ ও তালু', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/qaf.png' },
    { letter: 'ك', bangla: 'কাফ', audio: '/audio/22.mp3', tajweed: 'জিহ্বার পেছনের অংশ ও তালু', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '/svg/tha_jal_jaw.svg', imageSection2: '/image/alphabetForm/kaf.png' },
    { letter: 'ل', bangla: 'লাম', audio: '/audio/23.mp3', tajweed: 'জিহ্বার মধ্যভাগ ও উপরের তালু', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/lam.png' },
    { letter: 'م', bangla: 'মীম', audio: '/audio/24.mp3', tajweed: 'উভয় ঠোঁট', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/mim.png' },
    { letter: 'ن', bangla: 'নূন', audio: '/audio/25.mp3', tajweed: 'জিহ্বার আগা ও দাঁতের গোড়া', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/nun.png' },
    { letter: 'و', bangla: 'ওয়াও', audio: '/audio/26.mp3', tajweed: 'উভয় ঠোঁট', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/oao.png' },
    { letter: 'ه', bangla: 'হা', audio: '/audio/27.mp3', tajweed: 'গলার নিম্নভাগ', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/ha.png' },
    { letter: 'ء', bangla: 'হামযা', audio: '/audio/28.mp3', tajweed: 'গলার শূন্যস্থান', usageTypes: [], imageSection1: '', imageSection2: '' },
    { letter: 'ي', bangla: 'ইয়া', audio: '/audio/29.mp3', tajweed: 'জিহ্বার মধ্যভাগ', usageTypes: ['Usage 1', 'Usage 2'], imageSection1: '', imageSection2: '/image/alphabetForm/ya.png' },

]

export default function Home() {
    const [selectedSection, setSelectedSection] = useState<1 | 2 | 3>(1)
    const [darkMode, setDarkMode] = useState(true)
    const [popupIndex, setPopupIndex] = useState<number | null>(null)
    // const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    const currentPopup = popupIndex !== null ? letters[popupIndex] : null
    const [popupIndexSection2, setPopupIndexSection2] = useState<number | null>(null)


    const playAudio = (src: string) => {
        if (audioRef.current) {
            audioRef.current.src = src
            audioRef.current.play()

        }
    }

    // const handleNext = () => {
    //     if (popupIndex !== null && popupIndex < letters.length - 1) {
    //         setPopupIndex(popupIndex + 1)
    //     }
    // }

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
                    {selectedSection === 3 ? 'পরীক্ষা' : selectedSection === 2 ? ' অক্ষরের ভিন্নরূপ পরিচিতি' : 'আরবি বর্ণমালা'}
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
                            অক্ষর পরিচিতি পরীক্ষা 🏆
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Card 1 */}
                            <Link href="/learnquran/quize/latter" passHref>
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
                                        <h3 className="text-xl font-bold mb-2">1️⃣ আরবি বর্ণমালা</h3>
                                        <p className="text-sm group-hover:underline">
                                            কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।
                                        </p>
                                    </div>
                                </div>
                            </Link>

                            {/* Card 2 */}
                            <Link href="/learnquran/quize/latterform" passHref>
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
                                        <h3 className="text-xl font-bold mb-2">2️⃣ অক্ষরের ভিন্নরূপ পরিচিতি</h3>
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

                                {/* ❌ REMOVE this block if you don’t want to show imageSection1 in card */}
                                {/* {item.imageSection1 && (
          <div className="mt-4">
            <img
              src={item.imageSection1}
              alt={`Image for ${item.letter}`}
              className="mx-auto max-w-full rounded-xl shadow-lg"
            />
          </div>
        )} */}
                            </div>
                        ))}
                    </div>
                )}

                {/* Section 2: Letter Usage Cards */}
                {selectedSection === 2 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {letters.map((item, index) => (
                            <div
                                key={index}
                                onClick={() => setPopupIndexSection2(index)}
                                className={`p-6 rounded-lg shadow-lg hover:scale-105 transition transform cursor-pointer ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'}`}
                            >
                                <div className="text-3xl font-bold text-center mb-4">{item.letter}</div>
                                <div className={`text-center text-xl mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                                    {item.bangla}
                                </div>

                                {/* ✅ Show imageSection2 if exists */}
                                {item.imageSection2 && (
                                    <div className="mb-4">
                                        <Image
                                            src={item.imageSection2}
                                            alt={`Image for ${item.letter}`}
                                            className="mx-auto max-w-full rounded-xl shadow-lg"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                )}

                                {/* ✅ Show usageTypes if imageSection2 is not present */}
                                {!item.imageSection2 && item.usageTypes && (
                                    <ul className={`space-y-3 ${darkMode ? 'text-white' : 'text-gray-700'}`}>
                                        {item.usageTypes.map((usage, i) => (
                                            <li
                                                key={i}
                                                className={`p-3 rounded ${darkMode ? 'bg-gray-700' : 'bg-indigo-100'} text-3xl font-medium 
                ${i % 2 === 0 ? 'text-green-500' : 'text-blue-500'}`}
                                            >
                                                {usage}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                )}
                {/* Section 2 Popup with Left-Right Navigation */}
                {popupIndexSection2 !== null && letters[popupIndexSection2] && (
                    <div
                        className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setPopupIndexSection2(null)
                            if (e.key === 'ArrowRight' && popupIndexSection2 < letters.length - 1) {
                                setPopupIndexSection2(popupIndexSection2 + 1)
                            }
                            if (e.key === 'ArrowLeft' && popupIndexSection2 > 0) {
                                setPopupIndexSection2(popupIndexSection2 - 1)
                            }
                        }}
                        tabIndex={0}
                    >
                        <div
                            className={`relative w-[90%] max-w-4xl rounded-xl overflow-hidden shadow-xl p-8 border-2 outline-none
        ${darkMode ? 'bg-gray-900 text-white border-indigo-500' : 'bg-white text-gray-800 border-indigo-300'}`}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setPopupIndexSection2(null)}
                                className="absolute top-3 right-4 text-red-500 hover:text-red-700 text-2xl font-bold"
                                aria-label="Close"
                            >
                                ✖
                            </button>

                            {/* Left Navigation Button */}
                            {popupIndexSection2 > 0 && (
                                <button
                                    onClick={() => setPopupIndexSection2(popupIndexSection2 - 1)}
                                    className="absolute top-1/2 left-2 transform -translate-y-1/2 text-5xl text-white hover:text-gray-300"
                                >
                                    ❯
                                </button>
                            )}

                            {/* Right Navigation Button */}
                            {popupIndexSection2 < letters.length - 1 && (
                                <button
                                    onClick={() => setPopupIndexSection2(popupIndexSection2 + 1)}
                                    className="absolute top-1/2 right-2 transform -translate-y-1/2 text-5xl text-white hover:text-gray-300"
                                >
                                    ❮
                                </button>
                            )}

                            {/* Modal Content */}
                            <div className="text-center space-y-6">
                                <div className="text-7xl font-extrabold">{letters[popupIndexSection2].letter}</div>
                                <div className="text-3xl font-semibold">{letters[popupIndexSection2].bangla}</div>

                                {/* ✅ Show imageSection2 (not image) */}
                                {letters[popupIndexSection2].imageSection2 && (
                                    <div className="mt-6">
                                        <Image
                                            src={letters[popupIndexSection2].imageSection2 || ''}
                                            alt="Usage Image"
                                            className="mx-auto max-w-full rounded-xl shadow-lg"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                )}

                                {/* ✅ Fallback to usageTypes if no imageSection2 */}
                                {!letters[popupIndexSection2].imageSection2 && letters[popupIndexSection2].usageTypes && (
                                    <ul className="space-y-4 text-4xl font-medium mt-6">
                                        {letters[popupIndexSection2].usageTypes?.map((usage, i) => (
                                            <li key={i} className={`${i % 2 === 0 ? 'text-green-500' : 'text-blue-500'}`}>
                                                {usage}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        </div>
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
