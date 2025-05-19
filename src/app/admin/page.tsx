"use client";

import { FaMosque } from "react-icons/fa";
import AuthGuard from "../components/AuthGuard";
import BlogCreateForm from "../components/BlogCreateForm";
import QaForm from "../components/qaform";

export default function AdminPage() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white dark:from-gray-900 dark:to-gray-800 p-6">
        <header className="mb-8 text-center">
          <div className="inline-flex items-center justify-center gap-3 text-green-700 dark:text-green-300">
            <FaMosque className="text-4xl" />
            <h1 className="text-3xl font-extrabold tracking-wide">Admin Dashboard</h1>
          </div>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Manage your blog and Islamic Q&A content here</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Blog Form Card */}
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-green-100 dark:border-green-900">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">📚 Create Blog Post</h2>
            <BlogCreateForm />
          </div>

          {/* Q&A Form Card */}
          <div className="bg-white dark:bg-gray-900 shadow-md rounded-2xl p-6 border border-green-100 dark:border-green-900">
            <h2 className="text-xl font-semibold text-green-800 dark:text-green-300 mb-4">❓Submit Islamic Q&A</h2>
            <QaForm />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
