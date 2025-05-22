// src/app/library/page.tsx
"use client";

import { books } from "@/data/books";
import Link from "next/link";
import { useState } from "react";
import SEO from "@/app/components/seo";
export default function LibraryPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title?.toLowerCase().includes(search.toLowerCase()) ||
      book.writer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category ? book.category === category : true;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = Array.from(new Set(books.map((b) => b.category)));

  // Structured Data for SEO
  const allBooksStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: books.map((book, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Book",
        name: book.title,
        author: {
          "@type": "Person",
          name: book.writer,
        },
        genre: book.category,
        image: book.image ?? `https://muslimshub.vercel.app/pdf-thumbnails/${book.id}.jpg`,
        url: `https://muslimshub.vercel.app/library/${book.id}`,
      },
    })),
  };
  
  const allKeywordsSet = new Set<string>();

  books.forEach((book) => {
    allKeywordsSet.add(book.title);
    allKeywordsSet.add(book.writer);
    allKeywordsSet.add(book.category);
  });
  
  const allKeywords = Array.from(allKeywordsSet);
  
  return (
    <div className="p-4  mx-auto font-serif bg-[#f9fdfb] min-h-screen">
  <SEO
  title="ইসলামি বই লাইব্রেরি - বৃহৎ সংগ্রহ থেকে ইসলামিক বই পড়ুন"
  description="বাংলায় ইসলামিক বইয়ের বিশাল সংগ্রহ থেকে আপনার পছন্দের বইগুলো পড়ুন, ইসলামিক জ্ঞান অর্জন করুন সহজে ও দ্রুত।"
  url="https://muslimshub.vercel.app/library"
  image="/library-cover.jpg"
  keywords={[
    "ইসলামিক বই",
    "ইসলামি বই লাইব্রেরি",
    "বাংলা ইসলামিক বই",
    "কুরআন শিক্ষা",
    "ইসলামিক সাহিত্য",
    "ধর্মীয় বই",
    "বাংলা ইসলামিক সংগ্রহ",
    ...allKeywords,
  ]}
  structuredData={allBooksStructuredData}
/>


      <h1 className="text-3xl md:text-4xl font-bold text-green-700 mb-6 border-b-2 border-green-500 pb-2">
        📚 ইসলামি বই লাইব্রেরি
      </h1>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="শিরোনাম বা লেখক দিয়ে খুঁজুন"
          className="border border-green-300 focus:border-green-600 px-4 py-2 rounded-lg w-full md:w-1/2 shadow-sm focus:ring-1 focus:ring-green-600"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-green-300 focus:border-green-600 px-4 py-2 rounded-lg w-full md:w-1/4 shadow-sm focus:ring-1 focus:ring-green-600"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">সব ক্যাটাগরি</option>
          {uniqueCategories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Link key={book.id} href={`/library/${book.id}`}>
            <div className="relative bg-white border border-green-200 shadow-sm rounded-xl overflow-hidden group hover:shadow-lg transition duration-300">
              <div className="relative w-full h-72 flex items-center justify-center bg-[#f0fdf4]">
                <img
                  src={book.image ?? `/pdf-thumbnails/${book.id}.jpg`}
                  alt={book.title ?? "PDF"}
                  className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-semibold tracking-wide bg-green-700/70 px-4 py-1 rounded-full shadow-md">
                    📖 পড়ুন
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-1">
                <h3 className="font-semibold text-md text-green-800 line-clamp-1">
                  {book.title ?? "নামহীন বই"}
                </h3>
                <p className="text-sm text-green-700 line-clamp-1">
                  ✍️ {book.writer}
                </p>
                <p className="text-xs text-green-600 italic">{book.category}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
