"use client";

import {
  doc,
  getDoc,
  updateDoc,
  increment,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import BreadcrumbsBlog from "../../components/Breadcrumbsblog";
import  DisqusComments from "../../components/CusdisComments";
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
import SEO from "../../components/seo";

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import CommentComponent from "../../components/CommentComponent";
type BlogPageProps = {
  params: {
    id: string;
  };
};

export default function BlogDetail({ params }: BlogPageProps) {
  const [blog, setBlog] = useState<any>(null);
  const [popularBlogs, setPopularBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  //nav height 
  const [navHeight, setNavHeight] = useState(0);
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

      updateDoc(docRef, { views: increment(1) }).catch(console.error);

      const popularSnap = await getDocs(
        query(collection(db, "blogs"), orderBy("views", "desc"), limit(5))
      );
      setPopularBlogs(
        popularSnap.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );

      setLoading(false);
    }
    fetchBlog();
  }, [params.id]);

  if (loading) return <div className="p-6 text-gray-700">Loading...</div>;
  if (!blog)
    return (
      <div className="p-6 text-red-600 font-semibold">Blog not found.</div>
    );

  const wordCount = blog.content?.split(/\s+/).length || 0;
  const readTime = Math.ceil(wordCount / 200);

  const createdAt =
    blog.createdAt?.toDate?.() instanceof Date
      ? blog.createdAt.toDate().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
      : new Date(blog.createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });

  const keywordsArray = blog.keyword?.split(",").filter(Boolean) ?? [];

  return (
    <div>
 <Navbar setNavHeight={setNavHeight} />
    <div style={{ paddingTop: `${navHeight}px` }}>
      <SEO
        title={blog.title || "Blog"}
        description={blog.subtitle || ""}
        url={`https://muslimshub.vercel.app/blogs/${params.id}`}
        image={blog.coverImage || blog.imageUrl || "/default.jpg"}
        keywords={keywordsArray}
      />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 py-6 px-2 font-serif text-[#1f2937]">
        <div className=" mx-auto flex flex-col lg:flex-row gap-6">
          {/* Blog Content */}
          <div className="w-full lg:w-[66%] bg-white shadow-xl rounded-3xl overflow-hidden border border-green-300">
            <Image
              src={blog.coverImage || blog.imageUrl || "/default.jpg"}
              alt={blog.title}
              width={1000}
              height={400}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-5 space-y-5">
              <BreadcrumbsBlog title={blog.title} />
              <h1 className="text-4xl font-bold text-center text-emerald-800">
                {blog.title}
              </h1>
              <hr className="border-t border-green-200 mb-4" />
              <p className="text-lg text-center text-gray-700">{blog.subtitle}</p>

              <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-800">
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

              <ShareButtons
                title={blog.title}
                url={`https://muslimshub.vercel.app/blogs/${params.id}`}
              />

              <div
                className="prose max-w-none prose-lg prose-headings:text-emerald-800 prose-a:text-green-700 hover:prose-a:underline prose-img:rounded-xl prose-img:border prose-img:border-green-300 prose-img:shadow"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />

              {blog.keyword && (
                <div className="pt-4">
                  <h4 className="text-lg font-semibold mb-2 text-green-800">
                    🔖 ট্যাগসমূহ:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {keywordsArray.map((tag: string, i: number) => (
                      <span
                        key={i}
                        className="bg-green-100 text-green-900 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        #{tag.trim()}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-center italic text-gray-600 pt-6">
                  Thanks for reading ,Jajakallah
              </p>

              
            </div>
            <div className="h-full w-full">
   <CommentComponent blogId={params.id} />


              </div>
          </div>

          {/* Sidebar */}
          <div className=" lg:w-[34%] bg-white p-5 shadow-md rounded-2xl border border-green-300 h-fit">
            <h3 className="text-2xl font-bold mb-4 text-center border-b pb-2 text-emerald-800">
              📈 জনপ্রিয় ব্লগসমূহ
            </h3>
            <div className="grid gap-4">
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
                    className="block group border border-green-200 rounded-xl overflow-hidden shadow hover:shadow-lg transition bg-green-50"
                  >
                    <Image
                      src={item.coverImage || item.imageUrl || "/default.jpg"}
                      alt={item.title}
                      width={400}
                      height={200}
                      className="w-full h-36 object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="p-3 space-y-1">
                      <h4 className="font-semibold text-lg text-gray-800 group-hover:text-green-800 transition line-clamp-2">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-700">
                        ✍️{" "}
                        <span className="font-medium">
                          {item.writer || "Unknown"}
                        </span>
                      </p>
                      <p className="text-sm text-gray-600">📅 {itemDate}</p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
<Footer />
    </div></div>
  );
}
