"use client";

import { db } from "@/utils/firebase";
import {
  collection,
  query,
  orderBy,
  limit,
  startAfter,
  getDocs,
 
} from "firebase/firestore";
import toast, { Toaster } from "react-hot-toast";
import { useEffect, useState, useCallback } from "react";

import { useRouter } from "next/navigation"; // add at the top
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
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
  const [qas, setQAs] = useState<QA[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);

  const [hasMore, setHasMore] = useState(true); // New state to track if more data is available

  const fetchQAs = useCallback(async (reset = false) => {
    if (loading) return;
    setLoading(true);
  
    const q = query(
      collection(db, "qa"),
      orderBy("createdAt", "desc"),
      ...(lastVisible && !reset ? [startAfter(lastVisible)] : []),
      limit(50)
    );
  
    const snapshot = await getDocs(q);
    const items: QA[] = snapshot.docs.map((doc) => {
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
  
    const filtered = items.filter((item) => {
      const matchCategory = selectedCategory ? item.category === selectedCategory : true;
      const matchSearch = searchQuery
        ? item.question.toLowerCase().includes(searchQuery.toLowerCase())
        : true;
      return matchCategory && matchSearch;
    });
  
    if (filtered.length === 0) {
      toast("No more Q&A found for this category/search.", { icon: "⚠️" });
      setHasMore(false);
    } else {
      setQAs(reset ? filtered : [...qas, ...filtered]);
      setLastVisible(snapshot.docs[snapshot.docs.length - 1]);
    }
  
    setLoading(false);
  }, [lastVisible, loading, qas, searchQuery, selectedCategory]);
  

  const fetchCategories = async () => {
    const snapshot = await getDocs(collection(db, "qa"));
    const cats = Array.from(new Set(snapshot.docs.map((doc) => doc.data().category)));
    setCategories(cats);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setHasMore(true); // Reset "hasMore" when filters change
    fetchQAs(true);
  }, [selectedCategory, searchQuery, fetchQAs]);

 
  
 
  

  return (
    <div className="flex flex-col lg:flex-row p-4 sm:p-6 bg-green-50 min-h-screen">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Left - Q&A List */}
      <div className="lg:w-3/4 lg:pr-6">
        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-3 border-2 border-green-300 rounded-lg mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {qas.map((qa) => (
          <div
            key={qa.id}
            className="bg-white border border-green-200 p-4 sm:p-5 mb-4 rounded-xl shadow-md hover:shadow-lg transition duration-200"
          >
            
<div
  onClick={() => router.push(`/qa/${qa.id}`)}
  className="font-semibold text-green-900 cursor-pointer text-lg sm:text-xl hover:underline"
>
  ❓ {qa.question}
</div>

            
          </div>
        ))}

        <div className="text-center mt-6">
          <Button onClick={() => fetchQAs(false)} disabled={loading || !hasMore}>
            {loading ? "Loading..." : "Load More"}
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
              className={`cursor-pointer px-3 py-2 rounded-lg transition text-center ${selectedCategory === cat
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
  );
}
