// components/ShareButtons.tsx
"use client";

import { FaWhatsapp, FaTelegram, FaFacebook } from "react-icons/fa";

export default function ShareButtons({ title, url }: { title: string; url: string }) {
  return (
    <div className="flex gap-4 justify-center mt-4">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(title + " " + url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-green-600 hover:text-green-800"
      >
        <FaWhatsapp size={24} />
      </a>
      <a
        href={`https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:text-blue-700"
      >
        <FaTelegram size={24} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 hover:text-blue-800"
      >
        <FaFacebook size={24} />
      </a>
    </div>
  );
}
