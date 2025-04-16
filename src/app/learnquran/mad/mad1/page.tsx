'use client'

import {  useRef, useState } from 'react';
import Image from 'next/image';
import { FaPlayCircle } from 'react-icons/fa';
import Link from 'next/link';




export default function Home() {
    const [selectedSection, setSelectedSection] = useState<1 | 2 | 3>(1)
    const [darkMode, setDarkMode] = useState(true)
    
    // const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

  


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
                        {[1, 2].map((num) => (
                            <button
                                key={num}
                                onClick={() => setSelectedSection(num as 1 | 2 )}
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
                    {selectedSection === 3 ? 'পরীক্ষা' : selectedSection === 2 ? 'পরীক্ষা' : 'মাদ  পরিচিতি '}
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
                          মাদ পরিচিতি পরীক্ষা 🏆
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Card 1 */}
                            <Link href="/learnquran/quize/maad" passHref>
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
                                        <h3 className="text-xl font-bold mb-2">1️⃣মাদ পরিক্ষা </h3>
                                        <p className="text-sm group-hover:underline">
                                            কুইজ দিয়ে নিজের জ্ঞান যাচাই করুন।
                                        </p>
                                    </div>
                                </div>
                            </Link>



                        </div>
                    </div>
                )}




               

                {/* Section 2: Letter Usage Cards */}
                {selectedSection === 1 && (
                
                      
                           
                <div >
                   


  <div className="relative w-[100%] sm:w-[100%] md:w-[100%] lg:w-[75%] xl:w-[75%] mx-auto mt-[2%] mb-[2%]">
  {/* Image */}
  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-2xl font-bold mb-6 text-center">
  আরবীতে অনেক জায়গায় উচ্চারণ টেনে পড়তে হয়। একে মাদ বলে । মাদ গুরুত্বপুর্ন একটা সাবজেক্ট । 
  কোরআন পড়ার সময় মাদ উপেক্ষা করলে আয়াতের অর্থ পরিবর্তন হয়ে যেতে পারে।
</h1>

                {/* Wrapper with % dimensions */}
    
<div
  className="
    relative 
    w-[30%] mt-[5%] mb-[5%]                          /* Mobile default */
    sm:w-[27%] sm:mt-[6%] sm:mb-[6%]                 /* Small screen */
    md:w-[25%] md:mt-[7%] md:mb-[7%]                 /* Medium screen */
    lg:w-[23%] lg:mt-[8%] lg:mb-[8%]                 /* Large screen */
    xl:w-[20%] xl:mt-[10%] xl:mb-[10%]               /* Extra large */
    mx-auto
  "
>
  {/* Image */}
  <Image
    src="/svg/maad/qalila.svg"
    alt="Maad Part 1"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg border"
  />

  {/* Button - centered on left side of image */}
  <button
    onClick={() => playAudio('/audio/maad/qalila.mp3')}
    className="
      absolute 
      top-1/2 left-0 
      -translate-y-1/2 -translate-x-full 
      ml-2
      text-white bg-black/50 hover:bg-black/70 
      rounded-full p-2 transition-all duration-300
    "
  >
    <FaPlayCircle className="text-2xl" />
  </button>
</div>


  
<Image
    src="/svg/maad/Maad_Part1.svg"
    alt="Maad Part 1"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

</div>
<div className="relative w-[100%] sm:w-[100%] md:w-[100%] lg:w-[75%] xl:w-[75%] mx-auto mt-[10%] mb-[2%]">
  {/* Image */}
  <Image
    src="/svg/maad/Maad_Part2.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

  {/* Stylish Play Button on top of the image */}
  <button
    onClick={() => playAudio('/audio/maad/bismilla-full.mp3')}
    className=" sm:
      absolute top-[-3%] left-1/2 
      -translate-x-1/2 
      flex items-center gap-2 
      px-4 py-2 
      bg-gradient-to-r from-green-600 to-emerald-500 
      text-white font-semibold 
      rounded-full shadow-lg 
      hover:scale-105 hover:brightness-110 
      transition-all duration-300
    "
  >
    <FaPlayCircle className="text-2xl" />
    <span>Play</span>
  </button>
</div>


<div className="relative w-[100%] sm:w-[100%]  md:w-[100%] lg:w-[75%] xl:w-[75%] mx-auto mt-[10%] mb-[2%]">
  {/* Image */}
  <Image
    src="/svg/maad/Maad_Part3.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

  {/* Stylish Play Button on top of the image */}
  <button
    onClick={() => playAudio('/audio/maad/nashta.mp3')}
    className="
      absolute top-[-1.5%] left-1/2 
      -translate-x-1/2 
      flex items-center gap-2 
      px-4 py-2 
      bg-gradient-to-r from-green-600 to-emerald-500 
      text-white font-semibold 
      rounded-full shadow-lg 
      hover:scale-105 hover:brightness-110 
      transition-all duration-300
    "
  >
    <FaPlayCircle className="text-2xl" />
    <span>Play</span>
  </button>
<h2 className='text-left rounded-lg border-t  mt-10  text-2xl border-white'  >এটা জেনে রাখা ভালো যে, যেখানে ১ আলিফ মাদ হবার
কথা সেখানে ২/৩/৪ আলিফ মাদ করলেও সমস্যা নেই। তবে
মাদ সম্পুর্ন রূপে বাদ দিয়ে দিলে আয়াতের অর্থ পরিবর্তন
হয়ে যেতে পারে</h2>



</div>



</div>

                
             
                    

                )}






                <audio ref={audioRef} />
            </div>





        </main>
    )
}
