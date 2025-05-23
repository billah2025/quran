// app/not-found.tsx

import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function NotFound() {
    return (
        <>
      <div className="flex bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex-col items-center justify-center min-h-screen text-center px-4">
        <Navbar />
        <h1 className="text-5xl font-bold text-red-600 mb-4">404</h1>
        <p className="text-black mb-4">Oops! The page you are looking for was not found.</p>
        <a href="/" className="text-blue-600 hover:underline">
          Go back to homepage
        </a>
      
      </div>
      <Footer />
      </>
    );
  }
  