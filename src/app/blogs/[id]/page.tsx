"use client";

import { doc, getDoc, updateDoc, increment, collection, query, orderBy, limit, getDocs } from "firebase/firestore";
import BreadcrumbsBlog from "../../components/Breadcrumbsblog";
import CusdisComments from "../../components/CusdisComments";
import { db } from "@/utils/firebase";
import { BsCalendarDate } from "react-icons/bs";
import { MdCategory } from "react-icons/md";
import { GiFeather } from "react-icons/gi";
import { AiOutlineTag } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import ShareButtons from "../../components/ShareButtons";
import React, { useEffect, useState } from "react";
import SEO from "../../components/seo"; // Adjust path to your SEO component

type BlogPageProps = {
  params: {
    id: string;
  };
};

export default function BlogDetail({ params }: BlogPageProps) {
  const [blog, setBlog] = useState<any>(null);
  const [popularBlogs, setPopularBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlog() {
      const docRef = doc(db, "blogs", params.id);
      const snap = await getDoc(docRef);
      if (!snap.exists()) {
        setBlog(null);
        setLoading(false);
        return;
      }
      const data = snap.data();
      setBlog(data);

      // Increment views (no await here to avoid blocking UI)
      updateDoc(docRef, { views: increment(1) }).catch(console.error);

      // Fetch popular blogs
      const popularSnap = await getDocs(query(collection(db, "blogs"), orderBy("views", "desc"), limit(5)));
      setPopularBlogs(popularSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));

      setLoading(false);
    }
    fetchBlog();
  }, [params.id]);

  if (loading) {
    return <div className="p-6 text-gray-700">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-6 text-red-600 font-semibold">Blog not found.</div>;
  }

  const wordCount = blog.content?.split(/\s+/).length || 0;
  const readTime = Math.ceil(wordCount / 200);

  const createdAt =
    blog.createdAt?.toDate?.() instanceof Date
      ? blog.createdAt.toDate().toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
      : new Date(blog.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  const keywordsArray = blog.keyword?.split(",").filter(Boolean) ?? [];

  return (
    <>
      <SEO
        title={blog.title || "Blog"}
        description={blog.subtitle || ""}
        url={`https://yourdomain.com/blogs/${params.id}`}
        image={blog.coverImage || blog.imageUrl || "/default.jpg"}
        keywords={keywordsArray}
      />

      <div className="min-h-screen bg-gradient-to-tr from-[#fefcea] to-[#f1da36] py-8 px-4 font-serif text-[#1f2937]">
        <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-hidden border border-yellow-400">
          <Image
            src={blog.coverImage || blog.imageUrl || "/default.jpg"}
            alt={blog.title}
            width={1000}
            height={400}
            className="w-full h-[300px] object-cover"
          />
          <div className="p-6 space-y-6">
            <BreadcrumbsBlog title={blog.title} />
            <h1 className="text-4xl font-bold text-center text-[#1e293b]">{blog.title}</h1>
            <hr className="border-t border-yellow-300 mb-4" />
            <p className="text-lg text-center text-gray-700">{blog.subtitle}</p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-800">
              <span className="flex items-center gap-1">
                <BsCalendarDate /> {createdAt}
              </span>
              <span className="flex items-center gap-1">
                <MdCategory /> {blog.category || "Uncategorized"}
              </span>
              <span className="flex items-center gap-1">
                <GiFeather /> {blog.writer || "Unknown"}
              </span>
              <span className="flex items-center gap-1">
                <AiOutlineTag /> {keywordsArray.join(", ")}
              </span>
              <span className="flex items-center gap-1">
                <FaRegEye /> {blog.views || 0} views
              </span>
              <p className="text-sm text-gray-600">⏱️ {readTime} min read</p>
            </div>

            <ShareButtons title={blog.title} url={`https://yourdomain.com/blogs/${params.id}`} />

            <div
              className="prose max-w-none prose-lg prose-headings:text-[#1e293b] prose-a:text-blue-600 prose-img:rounded-xl prose-img:border prose-img:border-yellow-300 prose-img:shadow"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />

            {blog.keyword && (
              <div className="pt-6">
                <h4 className="text-lg font-semibold mb-2">🔖 Tags:</h4>
                <div className="flex flex-wrap gap-2">
                  {keywordsArray.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="bg-yellow-200 text-yellow-900 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      #{tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <Link href="/blogs" className="text-blue-600 hover:underline text-sm">
              ← Back to all blogs
            </Link>

            <p className="text-center italic text-gray-500 pt-6">جزاك اللهُ خيرًا for reading 🙏</p>

            <CusdisComments
              id={params.id}
              title={blog.title}
              url={`https://yourdomain.com/blogs/${params.id}`}
            />
          </div>
        </div>

        <div className="max-w-5xl mx-auto mt-10 bg-white p-6 shadow-md rounded-xl">
          <h3 className="text-2xl font-bold mb-4 text-center border-b pb-2">📈 Popular Blogs</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {popularBlogs.map((item: any) => {
              const itemDate =
                item.createdAt?.toDate?.() instanceof Date
                  ? item.createdAt.toDate().toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })
                  : new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });

              return (
                <Link
                  key={item.id}
                  href={`/blogs/${item.id}`}
                  className="block group border border-yellow-300 rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-yellow-50"
                >
                  <Image
                    src={item.coverImage || item.imageUrl || "/default.jpg"}
                    alt={item.title}
                    width={400}
                    height={200}
                    className="w-full h-40 object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="p-4 space-y-1">
                    <h4 className="font-semibold text-lg text-gray-800 group-hover:text-yellow-800 transition line-clamp-2">
                      {item.title}
                    </h4>
                    <p className="text-sm text-gray-700">
                      ✍️ <span className="font-medium">{item.writer || "Unknown"}</span>
                    </p>
                    <p className="text-sm text-gray-600">📅 {itemDate}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
