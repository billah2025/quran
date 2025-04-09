"use client";

import Image from "next/image";

export default function ServiceSection() {
  return (
    <section id="services" className="py-16 bg-transparent text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 animate-pulse">🔥 Our Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Service Card 1 */}
          <div className="bg-transparent text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <Image
              src="/quran.jpg"
              alt="Service 1"
              width={500}
              height={224}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">Read Quran</h3>
              <p className="text-gray-600 mt-2">Way of jannah</p>
              <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all">
                <a href="/quran">Learn More</a>
              </button>
            </div>
          </div>

          {/* Service Card 2 */}
          <div className="bg-transparent text-black rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-all duration-300">
            <Image
              src="/quran.jpg"
              alt="Service 2"
              width={500}
              height={224}
              className="w-full h-56 object-cover"
            />
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold">Learn to read Quran</h3>
              <p className="text-gray-600 mt-2">way of peace</p>
              <button className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-all">
                <a href="/learnquran">Learn More</a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}