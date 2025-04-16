'use client'

import { useEffect, useRef, useState } from 'react';
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
                          তাজবীদ পরিচিতি পরীক্ষা 🏆
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {/* Card 1 */}
                            <Link href="/learnquran/quize/tajweed" passHref>
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
                                        <h3 className="text-xl font-bold mb-2">1️⃣তাজবীদ পরিক্ষা </h3>
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
  তাজবিদ জানলে তেলাওয়াত সুন্দর হয়। তাজবিদ
ভালো না জানলেও আপনি তেলাওয়াত করতে
পারবেন। তাজবিদ অধ্যায়ে যা শেখানো হবে, তা
যতখানি সম্ভব মুখস্ত করে ফেলবেন। সবগুলো মনে না
রাখতে পারলেও যে নিয়মগুলো সহজ সেগুলো অন্তত
মনে রাখবেন
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


</div>
{/* Image with Play Button on bottom center 1 */}

<div className="relative w-[100%] sm:w-[100%] md:w-[100%] lg:w-[75%] xl:w-[75%] mx-auto mt-[10%] mb-[10%]">
  {/* Image */}
  <Image
    src="/svg/tajweed/gunna_intro.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

  {/* Stylish Play Button on bottom center of the image */}
  <button
    onClick={() => playAudio('/audio/tajweed/inna.mp3')}
    className="
      absolute bottom-[-13%] left-1/2 
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










{/* Image with Play Button on bottom center 2 */}
<div className="relative w-[100%] sm:w-[100%]  md:w-[100%] lg:w-[75%] xl:w-[75%] mx-auto mt-[10%] mb-[2%]">
  {/* Image */}
  <Image
    src="/svg/tajweed/tajweed_part_2.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

</div>


{/* Image with Play Button on bottom center 3 */}

<div className="relative w-[44%] sm:w-[28%] md:w-[27%] lg:w-[26%] xl:w-[25%] mx-auto mt-[10%] mb-[10%]">
  {/* Image */}
  <Image
    src="/svg/tajweed/minannas.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

  {/* Stylish Play Button on bottom center of the image */}
  <button
    onClick={() => playAudio('/audio/tajweed/minannas.mp3')}
    className="
      absolute bottom-[-35%] left-1/2 
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

{/* Image with Play Button on bottom center 4 */}

<div className="relative w-[44%] sm:w-[28%] md:w-[27%] lg:w-[26%] xl:w-[25%] mx-auto mt-[10%] mb-[10%]">
  {/* Image */}
  <Image
    src="/svg/tajweed/raibimmimma.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

  {/* Stylish Play Button on bottom center of the image */}
  <button
    onClick={() => playAudio('/audio/tajweed/raibimmimma.mp3')}
    className="
      absolute bottom-[-35%] left-1/2 
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



{/* Image with Play Button on bottom center 5 */}
<div className="relative w-[100%] sm:w-[100%]  md:w-[100%] lg:w-[75%] xl:w-[75%] mx-auto mt-[20%] mb-[2%]">
  {/* Image */}
  <Image
    src="/svg/tajweed/nun_sakin_intro.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

</div>

{/* Image with Play Button on bottom center 6 */}

<div className="relative w-[44%] sm:w-[28%] md:w-[27%] lg:w-[26%] xl:w-[25%] mx-auto mt-[10%] mb-[10%]">
  {/* Image */}
  <Image
    src="/svg/tajweed/yunfiqun.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

  {/* Stylish Play Button on bottom center of the image */}
  <button
    onClick={() => playAudio('/audio/tajweed/yungfiqoon.mp3')}
    className="
      absolute bottom-[-35%] left-1/2 
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
{/* Image with Play Button on bottom center 7 */}
<div className="relative w-[100%] sm:w-[100%]  md:w-[100%] lg:w-[75%] xl:w-[75%] mx-auto mt-[20%] mb-[10%]">
  {/* Image */}
  <Image
    src="/svg/tajweed/tajweed_part_3.svg"
    alt="Maad Part 2"
    width={0}
    height={0}
    sizes="100vw"
    className="w-full h-auto object-contain rounded-lg "
  />

</div>


</div>

                
             
                    

                )}






                <audio ref={audioRef} />
            </div>





        </main>
    )
}
