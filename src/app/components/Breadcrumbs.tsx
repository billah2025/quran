import Link from "next/link";
import { FaHome } from "react-icons/fa";

interface BreadcrumbsProps {
  title: string;
  pathSegments: { name: string; href: string }[];
}

export default function Breadcrumbs({ title, pathSegments }: BreadcrumbsProps) {
  return (
    <nav
      className="text-sm text-green-800 font-bangla bg-green-50 px-4 py-2 rounded-xl shadow mb-6"
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        <li>
          <Link href="/" className="flex items-center hover:text-green-600">
            <FaHome className="mr-1" />
            হোম
          </Link>
        </li>

        {pathSegments.map((segment, index) => (
          <li key={index} className="flex items-center space-x-2">
            <span className="mx-2 text-green-600">/</span>
            <Link href={segment.href} className="hover:text-green-600">
              {segment.name}
            </Link>
          </li>
        ))}

        <li className="flex items-center space-x-2">
          <span className="mx-2 text-green-600">/</span>
          <span className="text-green-900 font-semibold">{title}</span>
        </li>
      </ol>
    </nav>
  );
}
