// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { Analytics } from "./analytics"; // Import Analytics component

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muslims Hub",
  description:
    "বাংলা ও আরবিতে কুরআন পড়ুন ও শিখুন। ভিডিও ও টেক্সট কোর্স, রুকিয়াহ আয়াত, বিশাল ইসলামিক বই সংগ্রহ, ইসলামিক প্রশ্নোত্তর, ও নাশিদ শুনুন।",
  icons: {
    icon: "/favicon.ico",
  },
  metadataBase: new URL("https://muslimshub.vercel.app"),
  openGraph: {
    title: "Muslims Hub",
    description:
      "বাংলা ও আরবিতে কুরআন পড়ুন ও শিখুন। ইসলামিক ভিডিও ও টেক্সট কোর্স, রুকিয়াহ, বই, প্রশ্নোত্তর এবং নাশিদ শুনুন।",
    url: "https://muslimshub.vercel.app",
    siteName: "Muslims Hub",
    locale: "bn_BD",
    type: "website",
    images: [
      {
        url: "/gg.jpg", // make sure this image exists in your public folder
        width: 1200,
        height: 630,
        alt: "Muslims Hub - ইসলামিক হাব",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muslims Hub",
    description:
      "বাংলা ও আরবিতে কুরআন পড়ুন, ইসলামিক কোর্স শিখুন এবং বই, প্রশ্নোত্তর ও নাশিদ শুনুন।",
    images: ["/og-image.jpg"], // optional: customize if different from OG
    creator: "@your_twitter_handle", // optional
  },
  alternates: {
    canonical: "https://muslimshub.vercel.app",
  },
  keywords: [
    "কুরআন",
    "ইসলামিক প্রশ্নোত্তর",
    "নাশিদ",
    "রুকিয়াহ",
    "ইসলামিক বই",
    "ইসলাম",
    "শিখুন কুরআন",
    "বাংলা কুরআন",
    "আরবি কুরআন",
    "Muslims Hub",
  ],
  category: "Religion",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <meta name="google-site-verification" content="lFkDv6j0V1H6bRU71y70Znt1KWG6Ci1hCnaDeKDjmZk" />
      <meta name="msvalidate.01" content="DB65A62A8EF16A8885A4E71564009230" />
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-79KW5P3QE2"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-79KW5P3QE2');
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Analytics /> {/* Route change tracking */}
        {children}
      </body>
    </html>
  );
}
