"use client";

import {

  FaBookReader,
 
  FaPlayCircle,
  FaChalkboardTeacher,
  FaLaptopMedical,
} from "react-icons/fa";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { RiArticleFill } from "react-icons/ri";
import { TbUserQuestion } from "react-icons/tb";
import { IoAnalyticsSharp } from "react-icons/io5";
import { FcReadingEbook } from "react-icons/fc";
export default function ServiceSection() {
  const services = [
    {
     icon: <FaBookReader className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Read Quran",
      desc: "Way of Jannah",
      link: "/quran",
      button: "Start Reading",
    },
    {
      icon: < FaChalkboardTeacher  className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Learn to Read Quran",
      desc: "Step-by-step Quran learning guide",
      link: "/learnquran",
      button: "Start Learning",
    },
    {
      icon: < FaPlayCircle className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Learn to Read Quran with video",
      desc: "Step-by-step Quran learning  video",
      link: "/learnquranwithvideo",
      button: "Start Learning",
    },
    {
      icon: <FaLaptopMedical className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Ruqyah",
      desc: "Healing through Quranic verses",
      link: "/rokayah",
      button: "Start Healing",
    },
    {
      icon: <BsFillMusicPlayerFill className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "listen islamic nashid",
      desc: "Refesh your mind",
      link: "/nashid",
      button: "start listening",
    },
    {
      icon: <RiArticleFill className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Our Blog Posts",
      desc: "We are shering knowledge with you ",
      link: "/blogs",
      button: "Start Reading",
    },
    {
      icon: <TbUserQuestion className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Islamic Q&A ",
      desc: "If you have any question fill free to ask",
      link: "/qa",
      button: "View Q&A",
    },
    {
      icon: <FcReadingEbook className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Read Pdf books from our enrich library",
      desc: "go beond limit of knowledge ",
      link: "/library",
      button: "Start knowing",
    },
    {
      icon: <IoAnalyticsSharp className="text-5xl text-green-700 mx-auto mb-4" />,
      title: "Prayer and Deeds tracker(upcomeing)",
      desc: "Track your deeds and be better muslim",
      link: "/#",
      button: "Start tracking",
    },
  
  
  ];

  return (
    <section id="services" className="py-16 bg-transparent text-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold text-center mb-12 text-green-800 animate-pulse">
          🌙 Our Islamic Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-green-100 to-white rounded-xl shadow-md p-6 text-center border-b-4 border-green-600 hover:shadow-xl transition duration-300 transform hover:-translate-y-1 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {service.icon}
              <h3 className="text-xl font-bold">{service.title}</h3>
              <p className="text-gray-600">{service.desc}</p>
              <a
                href={service.link}
                className="mt-4 inline-block px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-all"
              >
                {service.button}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
