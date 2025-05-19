"use client";

import Link from "next/link";
import { FaHome } from "react-icons/fa";
import { BsChevronRight } from "react-icons/bs";

interface BreadcrumbsBlogProps {
  title: string;
}

export default function BreadcrumbsBlog({ title }: BreadcrumbsBlogProps) {
  return (
    <nav
      className="text-sm text-yellow-900 font-bangla bg-yellow-100 px-4 py-3 rounded-xl shadow mb-6 border border-yellow-300"
      aria-label="breadcrumb"
    >
      <ol className="flex items-center flex-wrap space-x-2">
        <li className="flex items-center">
          <Link href="/" className="flex items-center gap-1 hover:text-yellow-700 font-medium">
            <FaHome className="text-yellow-700" /> হোম
          </Link>
        </li>

        <BsChevronRight className="text-yellow-600" />

        <li className="flex items-center">
          <Link href="/blogs" className="hover:text-yellow-700 font-medium">
            ব্লগ
          </Link>
        </li>

        <BsChevronRight className="text-yellow-600" />

        <li className="text-yellow-900 font-semibold line-clamp-1">
          {title}
        </li>
      </ol>
    </nav>
  );
}
