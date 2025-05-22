'use client';

import {
  collection,
  getDocs,
  orderBy,
  query,
  limit,
  startAfter,
  DocumentData,
  QueryDocumentSnapshot,
  where,
} from "firebase/firestore";
import { db } from "@/utils/firebase";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { Timestamp ,QueryConstraint} from "firebase/firestore";
import Navbar from "../components/Navbar";
import Footer from "@/app/components/Footer";
import SEO from "../components/seo";
type Blog = {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  // Then update the Blog type:
  createdAt: Timestamp | Date;
  views: number;
  writer: string;
  category: string;
  keyword: string;
};

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [lastDoc, setLastDoc] = useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [popularBlogs, setPopularBlogs] = useState<Blog[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);
  const observerRef = useRef<HTMLDivElement>(null);
  //nav height 
  const [navHeight, setNavHeight] = useState(0);
  // Update formatDate:
  const formatDate = (timestamp: Timestamp | Date) => {
    const date = timestamp instanceof Timestamp ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString("en-US", { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const fetchBlogs = async (
    startAfterDoc: QueryDocumentSnapshot<DocumentData> | null,
    category: string
  ) => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const blogRef = collection(db, "blogs");
      const constraints: QueryConstraint[] = [];

      if (category !== "all") {
        constraints.push(where("category", "==", category));
      }

      constraints.push(orderBy("createdAt", "desc"));

      if (startAfterDoc) {
        constraints.push(startAfter(startAfterDoc));
      }

      constraints.push(limit(6));

      const blogQuery = query(blogRef, ...constraints);
      const snap = await getDocs(blogQuery);

      const newBlogs = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Blog[];

      if (startAfterDoc) {
        setBlogs((prev) => [...prev, ...newBlogs]);
      } else {
        setBlogs(newBlogs);
      }

      if (snap.docs.length < 6) {
        setHasMore(false);
      }

      setLastDoc(snap.docs[snap.docs.length - 1] || null);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }

    setLoading(false);
  };


  const fetchPopularBlogs = async () => {
    const popularQuery = query(collection(db, "blogs"), orderBy("views", "desc"), limit(5));
    const snap = await getDocs(popularQuery);
    const popBlogs = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Blog));
    setPopularBlogs(popBlogs);
  };

  const fetchCategories = async () => {
    const snap = await getDocs(collection(db, "categories"));
    const allCategories: string[] = snap.docs.map((doc) => {
      const data = doc.data();
      return data.name;
    });
    setCategories(["all", ...allCategories]);
  };

  // Infinite Scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          fetchBlogs(lastDoc, selectedCategory); // Pass current category here
        }
      },
      { threshold: 1.0 }
    );

    const currentRef = observerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => {
      if (currentRef) observer.unobserve(currentRef);
      observer.disconnect();
    };
  }, [lastDoc, hasMore, loading, selectedCategory]); // ✅ Add selectedCategory

  useEffect(() => {
    fetchCategories();
    fetchPopularBlogs();
    setSelectedCategory("all"); // Trigger the correct useEffect for category

  }, []);



  useEffect(() => {
    setBlogs([]);
    setLastDoc(null);
    setHasMore(true);
    fetchBlogs(null, selectedCategory);
  }, [selectedCategory]);


  return (
    <div>
      <SEO
  title="ইসলামিক ব্লগ - সর্বশেষ ইসলামি তথ্য ও আলোচনা"
  description="বাংলা ইসলামিক ব্লগ পড়ুন যেখানে ধর্ম, জীবনযাপন, ইসলামিক শিক্ষা, ও ইসলামি প্রাসঙ্গিক বিষয় নিয়ে আলোচনা করা হয়। আপনার পছন্দের ক্যাটাগরিতে ব্লগ ফিল্টার করুন।"
  url="https://muslimshub.vercel.app/blogs"
  image="/blog-cover.jpg" // Replace with an actual cover image relevant to blogs
  keywords={[
    "ইসলামিক ব্লগ",
    "ইসলামিক তথ্য",
    "ধর্মীয় আলোচনা",
    "ইসলামিক শিক্ষা",
    "বাংলা ইসলামিক ব্লগ",
    "ইসলামিক জীবনযাপন",
    "ব্লগ ক্যাটাগরি"
  ]}
/>

      <Navbar setNavHeight={setNavHeight} />
      <div style={{ paddingTop: `${navHeight}px` }} >
        <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-green-100 py-10 px-4 md:px-10">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Main Blog Listing */}
            <div className="col-span-2 space-y-6">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-3 mb-4">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    className={`px-4 py-1 rounded-full border ${selectedCategory === cat
                      ? "bg-green-600 text-white"
                      : "bg-white text-green-700 hover:bg-green-100"
                      } text-sm font-medium transition`}
                    onClick={() => setSelectedCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
                >
                  <Link href={`/blogs/${blog.id}`}>

                    <div className="flex flex-col md:flex-row">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full md:w-1/3 h-52 object-cover"
                      />
                      <div className="p-5 flex-1">
                        <h2 className="text-2xl font-bold text-green-800">{blog.title}</h2>
                        <p className="text-gray-600 mt-2">{blog.subtitle}</p>
                        <p className="text-sm text-gray-500 mt-1">👤 Written by {blog.writer}</p>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {blog.keyword?.split(",").map((tag) =>
                            tag.trim() ? (
                              <span
                                key={tag}
                                className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full"
                              >
                                #{tag.trim()}
                              </span>
                            ) : null
                          )}
                        </div>
                        <div className="text-sm text-gray-500 mt-2">📅 {formatDate(blog.createdAt)}</div>

                      </div>

                    </div>

                  </Link>

                </div>
              ))}

              <div ref={observerRef} className="h-10 flex justify-center items-center">
                {loading && <span className="text-gray-500">Loading more...</span>}
              </div>
            </div>

            {/* Sidebar: Popular + Categories */}
            <div className="bg-white rounded-2xl shadow-md p-6 space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-green-700 border-b pb-2">📚 Popular Blogs</h3>
                {popularBlogs.map((blog) => (
                  <Link key={blog.id} href={`/blogs/${blog.id}`}>

                    <div className="flex items-start space-x-3 mt-3">
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div>
                        <h4 className="font-medium text-green-800 text-sm line-clamp-2">{blog.title}</h4>
                        <p className="text-xs text-gray-500">{formatDate(blog.createdAt)}</p>
                        <p className="text-xs text-gray-500">{blog.views} views</p>
                      </div>
                    </div>

                  </Link>

                ))}
              </div>

              {/* Sidebar Categories */}
              <div>
                <h3 className="text-xl font-semibold text-green-700 border-b pb-2">📂 Categories</h3>
                <div className="flex flex-wrap gap-2 mt-3">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      className={`text-sm px-3 py-1 rounded-full ${selectedCategory === cat
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-green-800"
                        }`}
                      onClick={() => setSelectedCategory(cat)}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
