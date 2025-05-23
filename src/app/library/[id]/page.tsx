"use client";

import { useParams } from "next/navigation";
import { books } from "@/data/books";
import { useState, useRef } from "react";
import { Download, Loader2, AlertTriangle, Maximize2, Minimize2 } from "lucide-react";
import Image from "next/image";
import SEO from "@/app/components/seo";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function PdfPage() {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);
  const [loadError, setLoadError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const viewerRef = useRef<HTMLDivElement>(null);
  //nav height 
  const [navHeight, setNavHeight] = useState(0);
  if (!book) {
    return (
      <div className="p-6 text-red-500 text-center">
        <AlertTriangle className="mx-auto mb-2 w-6 h-6" />
        বইটি পাওয়া যায়নি
      </div>
    );
  }

  const getPdfLink = (url: string) => {
    const match = url.match(/\/d\/(.+?)\//);
    if (match) {
      return `https://drive.google.com/file/d/${match[1]}/preview`;
    }
    return url;
  };

  const pdfUrl = getPdfLink(book.pdf);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement && viewerRef.current) {
      viewerRef.current.requestFullscreen().then(() => setIsFullScreen(true));
    } else {
      document.exitFullscreen().then(() => setIsFullScreen(false));
    }
  };

  // Prepare description and keywords for SEO
  const seoDescription = `${book.title} - লেখক: ${book.writer}, প্রকাশ: ${book.year}, পৃষ্ঠা: ${book.page}, ক্যাটাগরি: ${book.category}`;
  const seoKeywords = [book.title, book.writer, book.category, "ইসলামিক বই", "বাংলা বই"];

  // Structured data for this book
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Book",
    name: book.title,
    author: {
      "@type": "Person",
      name: book.writer,
    },
    datePublished: book.year,
    numberOfPages: book.page,
    genre: book.category,
    image: book.image ?? `https://muslimshub.vercel.app/pdf-thumbnails/${book.id}.jpg`,
    url: `https://muslimshub.vercel.app/library/${book.id}`,
    // Optional publisher, isbn, etc can be added if you have
  };

  return (
    <div>
          <Navbar setNavHeight={setNavHeight} />
          <div style={{ paddingTop: `${navHeight}px` }} />
  
      <SEO
        title={`${book.title} | ইসলামিক বই লাইব্রেরি`}
        description={seoDescription}
        url={`https://muslimshub.vercel.app/library/${book.id}`}
        image={book.image ?? "/library-cover.jpg"}
        keywords={seoKeywords}
        structuredData={structuredData}
      />
      
      <div className="min-h-screen w-full p-4 md:p-6 bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-5xl mx-auto space-y-6">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">{book.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                ✍️ লেখক: {book.writer} | 📅 প্রকাশ: {book.year} | 📄 পৃষ্ঠা: {book.page}
              </p>
            </div>
            <div className="flex gap-2">
              <a
                href={book.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-700 text-white shadow transition"
                download
              >
                <Download className="w-4 h-4" />
                ডাউনলোড
              </a>
              <button
                onClick={toggleFullscreen}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow transition"
              >
                {isFullScreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
            </div>
          </div>

          {/* PDF Viewer */}
          <div
            ref={viewerRef}
            className="relative w-full h-[80vh] rounded-xl border shadow bg-white dark:bg-gray-800 overflow-hidden"
          >
            {loading && !loadError && (
              <div className="flex items-center justify-center h-full text-gray-400 animate-pulse">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                PDF লোড হচ্ছে...
              </div>
            )}

            {loadError ? (
              <div className="flex flex-col items-center justify-center h-full text-center p-6">
                <AlertTriangle className="w-8 h-8 text-red-500 mb-3" />
                <p className="text-lg font-semibold mb-2">PDF লোড করা যায়নি</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  দয়া করে ফাইলের শেয়ার লিংক চেক করুন বা ডাউনলোড অপশন ব্যবহার করুন।
                </p>
                <Image
                  src={book.image || "/default-image.png"}
                  alt={book.title || "Untitled Book"}
                  width={300}
                  height={200}
                  className="rounded-lg shadow-lg object-cover"
                />
              </div>
            ) : (
              <iframe
                src={pdfUrl}
                className="w-full h-full"
                onLoad={() => setLoading(false)}
                onError={() => {
                  setLoading(false);
                  setLoadError(true);
                }}
                allowFullScreen
                title="PDF Viewer"
              />
            )}
          </div>
        </div>
      </div>
    <Footer />
    </div>
  );
}
