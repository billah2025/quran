"use client";

import { db } from "@/utils/firebase";
import {
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import SEO from "@/app/components/seo";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import Head from "next/head";
import { qaData as staticQAData } from "@/data/qa"; // ✅ import static data

const Button = ({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
  <button
    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50 w-full sm:w-auto"
    {...props}
  >
    {children}
  </button>
);

interface QA {
  id: string;
  question: string;
  answer: string;
  answeredBy: string;
  date: string;
  category: string;
  createdAt: string;
  views?: number;
}

export default function QAListPage() {
  const router = useRouter();
  const [allQAs, setAllQAs] = useState<QA[]>(staticQAData); // ✅ initial load from static
  const [qas, setQAs] = useState<QA[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const docsPerPage = 30;
  const [navHeight, setNavHeight] = useState(0);

  const mergeFirebaseData = async () => {
    const snapshot = await getDocs(query(collection(db, "qa"), orderBy("createdAt", "desc")));
    const firebaseQAs: QA[] = snapshot.docs.map((doc) => {
      const data = doc.data() as QA;
      return {
        id: doc.id,
        question: data.question ?? "Missing question",
        answer: data.answer,
        answeredBy: data.answeredBy,
        date: data.date,
        category: data.category,
        createdAt: data.createdAt,
        views: data.views ?? 0,
      };
    });

    // ✅ merge: Firebase takes priority if ID is the same
    const merged = [
      ...firebaseQAs,
      ...staticQAData.filter(staticItem => !firebaseQAs.some(fbItem => fbItem.id === staticItem.id))
    ];

    setAllQAs(merged);
  };
const fetchCategories = async () => {
  const snapshot = await getDocs(collection(db, "qa"));
  const firebaseCats = snapshot.docs.map((doc) => doc.data().category);
  const staticCats = staticQAData.map((item) => item.category);
  const allCats = Array.from(new Set([...firebaseCats, ...staticCats]));
  setCategories(allCats);
};


  const filteredQAs = useMemo(() => {
    return allQAs.filter((item) => {
      const matchCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchSearch = searchQuery
        ? item.question.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchCategory && matchSearch;
    });
  }, [allQAs, selectedCategory, searchQuery]);

  const totalPages = Math.ceil(filteredQAs.length / docsPerPage);

  useEffect(() => {
    const start = currentPage * docsPerPage;
    const end = start + docsPerPage;
    const currentItems = filteredQAs.slice(start, end);
    if (currentItems.length === 0 && filteredQAs.length > 0) {
      toast("No more Q&A found for this page.", { icon: "⚠️" });
    }
    setQAs(currentItems);
  }, [filteredQAs, currentPage]);

  useEffect(() => {
    mergeFirebaseData(); // ✅ load firebase on mount
    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(0); // reset page on filter change
  }, [selectedCategory, searchQuery]);

  return (
    <div>
      <Head>
        <title>Islamic Q&A - প্রশ্ন ও উত্তর | Muslims Hub</title>
        <meta name="description" content="Explore Islamic Q&A with authentic references. Daily life, salah, fiqh and more. | সহীহ দলীলসহ ইসলামিক প্রশ্নোত্তর পড়ুন।" />
        <meta name="keywords" content="Islamic Q&A, Muslim Questions, Fatwa, প্রশ্নোত্তর, ফতোয়া" />
        <meta property="og:title" content="Islamic Q&A - ইসলামিক প্রশ্নোত্তর" />
        <meta property="og:url" content="https://muslimshub.vercel.app/qa" />
        <link rel="canonical" href="https://muslimshub.vercel.app/qa" />
      </Head>

      <Navbar setNavHeight={setNavHeight} />
      <div style={{ paddingTop: `${navHeight}px` }}>
        <div className="flex flex-col lg:flex-row p-4 sm:p-6 bg-green-50 min-h-screen">
          <SEO
            title="Islamic Q&A - Ask & Learn about Islam | MuslimsHub"
            description="Browse and search through hundreds of Islamic questions and answers about faith, worship, Quran, Hadith, and more."
            keywords={[
              "Islamic questions",
              "Islam Q&A",
              "Islamic knowledge",
              "Muslim questions",
              "Quran questions",
              "Hadith",
              "Islamic answers",
              "Islamic education",
            ]}
            url="https://muslimshub.vercel.app/qa"
            image="https://muslimshub.vercel.app/cover.jpg"
            type="website"
          />
          <Toaster position="top-center" reverseOrder={false} />

          {/* Left - Q&A List */}
          <div className="lg:w-3/4 lg:pr-6">
            <input
              type="text"
              placeholder="🔍 Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="text-black w-full p-3 border-2 border-green-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            {qas.map((qa) => (
              <div
                key={qa.id}
                className="bg-white border border-green-200 p-4 sm:p-5 mb-4 rounded-xl shadow-md hover:shadow-lg transition duration-200"
              >
                <div
                  onClick={() => router.push(`/qa1/${qa.id}`)}
                  className="font-semibold text-green-900 cursor-pointer text-lg sm:text-xl hover:underline"
                >
                  ❓ {qa.question}
                </div>
                {typeof qa.views === "number" && (
                  <p className="text-sm text-gray-500 mt-1">👁️ {qa.views} views</p>
                )}
              </div>
            ))}

            {/* Pagination Controls */}
            <div className="flex flex-wrap justify-center gap-2 mt-6">
              <Button onClick={() => setCurrentPage(0)} disabled={currentPage === 0}>
                ⏮ First
              </Button>
              <Button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))} disabled={currentPage === 0}>
                ◀ Prev
              </Button>
              <span className="px-4 py-2 bg-white border rounded-lg text-green-800 font-semibold">
                Page {currentPage + 1} of {totalPages || 1}
              </span>
              <Button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1))}
                disabled={currentPage + 1 >= totalPages}
              >
                Next ▶
              </Button>
              <Button onClick={() => setCurrentPage(totalPages - 1)} disabled={currentPage + 1 >= totalPages}>
                Last ⏭
              </Button>
            </div>
          </div>

          {/* Right - Categories */}
          <div className="lg:w-1/4 mt-10 lg:mt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-green-200">
            <h3 className="text-xl font-bold text-green-700 mb-4">📚 Categories</h3>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li
                  key={cat}
                  className={`cursor-pointer px-3 py-2 rounded-lg transition text-center ${
                    selectedCategory === cat
                      ? "bg-green-600 text-white font-semibold"
                      : "text-green-800 hover:bg-green-100"
                  }`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </li>
              ))}
              <li
                className="cursor-pointer text-sm text-green-500 mt-4 hover:underline text-center"
                onClick={() => setSelectedCategory(null)}
              >
                Clear Filter
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
