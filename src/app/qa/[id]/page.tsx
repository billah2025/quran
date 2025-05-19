"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { db } from "@/utils/firebase";
import Breadcrumbs from "../../components/Breadcrumbs";
import AskQuestionForm from "../../components/AskQuestionForm";
import {
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  increment,
  updateDoc,
} from "firebase/firestore";
import Head from "next/head";
import Link from "next/link";
import { formatDate } from "@/utils/formatDate";
import { FaTwitter, FaFacebookF, FaWhatsapp } from "react-icons/fa";
interface QA {
  id: string;
  question: string;
  answer: string;
  answeredBy: string;
  date: string;
  category: string;
  tags?: string[];
  views?: number;
}

export default function QADetailPage() {
  const { id } = useParams();
  const [qa, setQA] = useState<QA | null>(null);
  const [popular, setPopular] = useState<QA[]>([]);
  const [copySuccess, setCopySuccess] = useState<string>("");
  const [showForm, setShowForm] = useState(false);
  useEffect(() => {
    if (id) {
      fetchQA();
      fetchPopularQAs();
    }
  }, [id]);

  const fetchQA = async () => {
    const docRef = doc(db, "qa", String(id));
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data() as Omit<QA, "id">;
      setQA({ id: docSnap.id, ...data });
      updateDoc(docRef, { views: increment(1) });
    }
  };
  // Removed invalid console.log statement


  const fetchPopularQAs = async () => {
    const q = query(collection(db, "qa"), orderBy("views", "desc"), limit(5));
    const snapshot = await getDocs(q);
    const results: QA[] = snapshot.docs.map((doc) => {
      const data = doc.data() as Omit<QA, "id">; // Cast to expected structure (excluding 'id')
      return { ...data, id: doc.id }; // Add Firestore ID at the end to avoid override
    });
    setPopular(results);
  };


  // Copy current page URL to clipboard
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopySuccess("Copied!");
      setTimeout(() => setCopySuccess(""), 2000);
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };



  // Truncate question to first 5 words
  const truncateQuestion = (text: string, words = 5) => {
    const splitted = text.split(/\s+/);
    if (splitted.length <= words) return text;
    return splitted.slice(0, words).join(" ") + "...";
  };

  // Share to social media URLs
  const shareUrls = {
    facebook: (url: string) =>
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    twitter: (url: string, text: string) =>
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
  };


  function decorateBanglaAnswer(answer: string) {
    let decorated = answer;

    // Add Salam if not present
    if (!decorated.includes("আসসালামু আলাইকুম")) {
      decorated = `<p class="text-green-700 font-semibold">আসসালামু আলাইকুম ওয়া রাহমাতুল্লাহ।</p><br/>` + decorated;
    }

    // Style quoted Quranic text
    decorated = decorated.replace(
      /(“[^”]+”|‘[^’]+’)/g,
      (match) => `<span class="text-green-800 font-semibold italic">${match}</span>`
    );


    // Common hadith references
    const hadithRefsPattern =
      /(বুখারী,*?হাদীস নং\s*\(?\d+\)?|মুসান্নাফু আবি শাইবা\s*:\s*\d+|তাহজবিুল আছার\s*:\s*\d+|মুয়াত্তা মালকে|বুখারী|সুনানে আবু দাউদ|আছারুস সুনান\s*:\s*\d+|ফাতহুল বারী\s*\(.*?\)|মুসলিম.*?হাদীস নং\s*\(?\d+\)?)/;

    // Arabic block + following Bangla until সূরা+আয়াত or Hadith ref or double break
    decorated = decorated.replace(
      new RegExp(
        `((?:[\\u0600-\\u06FF\\u0750-\\u077F\\u08A0-\\u08FF\\uFB50-\\uFDFF\\uFE70-\\uFEFF0-9\\s:؛،.\\-—(){}\\[\\]"'=+!?]{10,}))([\\s\\S]*?)(?=(?:সূরা[-\\s]*[^\\n<।]*[,،]?[\\s]*আয়াত[-\\s]*[^\\n<।]*।?)|(?:${hadithRefsPattern.source})|(?:<br\\s*\\/?>){2,}|$)`,
        'g'
      ),
      (_, arabic, bangla) => {
        return `
<span class="block text-right text-[40px] leading-loose font-semibold text-green-800 font-IndopakFont">${arabic.trim()}</span>
<span class="block text-justify text-[20px] leading-relaxed text-gray-900 font-bangla">${bangla.trim()}</span>
`;
      }
    );


    // Insert <br/><br/> after every 3rd punctuation (।.!?)

    // ✅ Now add <br/><br/> every 3rd punctuation — AFTER block is processed
    // ✅ Add <br/><br/> every 3rd punctuation — but avoid breaking before references
    let punctuationCount = 0;
    decorated = decorated.replace(/([।!?])\s*/g, (match, p1, offset, str) => {
      // Peek ahead to see if a reference follows
      const nextChunk = str.slice(offset + match.length, offset + match.length + 580); // look ahead
      const isRefAhead = /(?:সূরা[\s-]*[^।<\n]*[,،]?[\\s]*আয়াত[\s-]*[^।<\n]*।?|বুখারী|মুসলিম|হাদীস|হাদিস|সুনানে|ফাতহুল বারী|আছারুস সুনান)/.test(nextChunk);
      punctuationCount++;
      if (isRefAhead) return `${p1} `; // Avoid line break before references
      return punctuationCount % 3 === 0 ? `${p1}<br/><br/>` : `${p1} `;
    });



    // Highlight সূরা + আয়াত line
    decorated = decorated.replace(
      /(সূরা[-\s]*[^\n<।]*[,،]?[\\s]*আয়াত[-\s]*[^\n<।]*।?)/g,
      `<span class="block mt-2 text-green-700 font-semibold text-[15px]">$1</span>`
    );

    // Highlight hadith references
    decorated = decorated.replace(
      hadithRefsPattern,
      `<span class="block mt-2 text-yellow-700 font-semibold text-[15px]">$&</span>`
    );

    // Strong highlight for headings or labels
    decorated = decorated.replace(
      /(প্রশ্ন|উত্তর|উপসংহার|মোটকথা|মূলত|উপদেশ|কারণ|সমাধান|তথ্যসূত্র|নিষ্কর্ষ):/g,
      (match) => `<strong class="text-green-900 underline">${match}</strong>`
    );

    // Final Islamic ending
    if (!decorated.includes("আল্লাহ আমাদের সহায় হোন")) {
      decorated += `<br/><p class="mt-4 text-green-700 font-medium">আল্লাহ আমাদের সহায় হোন। আমিন।</p>`;
    }

    // Italicize Quran quotes
    decorated = decorated.replace(/“([^”]+)”/g, `<em class="text-green-700">“$1”</em>`);

    // Style Islamic expressions
    decorated = decorated.replace(
      /(ﷺ|রহিঃ|আলাইহিস সালাম|রাদিয়াল্লাহু আনহু|হাদীসের নামে জালিয়াতি|عْنِي بِالنُّورِ مُحَمَّدًا صَلَّى اللَّهُ عَلَيْهِ وَسَلَّمَ, الَّذِي أَنَارَ اللَّهُ بِهِ الْحَقَّ, وَأَظْهَرَ بِهِ الإِسْلاَمَ, وَمَحَقَ بِهِ الشِّرْكَ فَهُوَ نُورٌ لِمَنِ اسْتَنَارَ بِهِ يُبَيِّنُ الْحَقَّ, وَمِنْ إِنَارَتِهِ الْحَقَّ تَبْيِينُهُ لِلْيَهُودِ كَثِيرًا مِمَّا كَانُوا يُخْفُونَ مِنَ الْكِتَابِ)/g,
      (match) => `<hr><span class="text-green-600 font-semibold">${match}</span>`
    );
    // Convert numbered lines into <ol><li> items
    // Convert numbered lines (Bangla & English) into <ol><li> list
    decorated = decorated.replace(
      /((?:^|<br\s*\/?>)[\s]*[০-৯0-9]{1,2}[।.,|)]\s?[^\n<]*)+/gm,
      (match) => {
        const lines = match
          .trim()
          .split(/<br\s*\/?>/)
          .filter(line => /^[\s]*[০-৯0-9]{1,2}[।.,|)]/.test(line))
          .map(line => {
            return `<li>${line.replace(/^[\s]*[০-৯0-9]{1,2}[।.,|)]\s*/, '')}</li>`;
          })
          .join('\n');
        return `<ol class="list-decimal list-inside my-2 text-gray-800 font-bangla">${lines}</ol>`;
      }
    );

    // Convert any URL into a clickable anchor tag
    // Fix malformed YouTube links like "? v=" → "?v="
    decorated = decorated.replace(/https:\/\/www\.youtube\.com\/watch\?\s*v=/g, 'https://www.youtube.com/watch?v=');

    // Convert numbered lines (Bangla & English) into <ol><li> list
    decorated = decorated.replace(
      /((?:^|<br\s*\/?>)[\s　]*[০-৯0-9]{1,2}[।.,|)]\s?[^\n<]*)+/gm,
      (match) => {
        const lines = match
          .trim()
          .split(/<br\s*\/?>/)
          .filter(line => /^[\s　]*[০-৯0-9]{1,2}[।.,|)]/.test(line))
          .map(line => {
            return `<li>${line.replace(/^[\s　]*[০-৯0-9]{1,2}[।.,|)]\s*/, '')}</li>`;
          })
          .join('\n');
        return `<ol class="list-decimal list-inside my-2 text-gray-800 font-bangla">${lines}</ol>`;
      }
    );

    // Convert all links to clickable <a>
    decorated = decorated.replace(
      /((https?:\/\/)[^\s<]+)/g,
      (url) => `<a href="${url}" class="text-blue-600 underline" target="_blank" rel="noopener noreferrer">${url}</a>`
    );


    return decorated;
  }




  if (!qa) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Head>
        <title>{qa.question} | ইসলামি প্রশ্নোত্তর</title>
        <meta
          name="description"
          content={`${qa.question} - ইসলামিক প্রশ্ন ও উত্তর`}
        />
        <meta
          name="keywords"
          content={`${qa.tags?.join(", ")}, ইসলামিক প্রশ্ন, কুরআন, হাদীস`}
        />
        <meta property="og:title" content={qa.question} />
        <meta property="og:description" content="ইসলামিক প্রশ্ন ও উত্তর জানুন" />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://yourdomain.com/qa/${qa.id}`} />
        <meta property="og:site_name" content="ইসলামি প্রশ্নোত্তর" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={qa.question} />
        <meta name="twitter:description" content="ইসলামিক প্রশ্ন ও উত্তর জানুন" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Question",
            "name": qa.question,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": qa.answer.replace(/<[^>]+>/g, '') // Strip HTML tags
            },
            "dateCreated": qa.date,
            "author": {
              "@type": "Person",
              "name": qa.answeredBy
            }
          })}
        </script>

      </Head>

      <div className="flex flex-col lg:flex-row p-4 sm:p-6 bg-green-50 min-h-screen">
        {/* Left Content */}
        <div className="lg:w-3/4 lg:pr-6">
          <h1 className="text-2xl font-bold text-green-900 mb-2">
            ❓ {qa.question}
          </h1>
          {qa && (
  <Breadcrumbs
    title={qa.question}
    pathSegments={[
      { name: "প্রশ্নোত্তর", href: "/qa" },
      { name: qa.category, href: `/qa?category=${qa.category}` },
    ]}
  />
)}


          <div className="text-sm text-gray-600 mb-4 flex flex-wrap items-center gap-3">
            <span>
              🗂️ বিভাগ:{" "}
              <span className="font-medium text-green-700">{qa.category}</span>
            </span>
            <span>
              📅 তারিখ:{" "}
              <span>{qa.date}</span>

            </span>
            <span className="flex items-center gap-2">
              ✍️ উত্তর দিয়েছেন:{" "}
              <span className="font-medium text-green-700">{qa.answeredBy}</span>
              <button
                onClick={copyLink}
                title="Copy page link"
                className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded hover:bg-green-300 transition"
              >
                {copySuccess ? copySuccess : "Copy Link"}
              </button>
            </span>
            <button
              onClick={() => setShowForm(true)}
              className="ml-2 px-2 py-1 bg-green-200 text-green-800 rounded hover:bg-green-300 transition"
              style={{
                padding: "10px 20px",
                fontSize: 18,
                backgroundColor: "#064420",
                color: "#f3f8f1",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                marginTop: 40,
              }}
            >
              প্রশ্ন করুন
            </button>

            {showForm && <AskQuestionForm onClose={() => setShowForm(false)} />}
          </div>

          <div
            className="bg-white p-4 border rounded-xl shadow leading-relaxed text-justify"
            dangerouslySetInnerHTML={{ __html: decorateBanglaAnswer(qa.answer) }}
          ></div>

          {/* Tags as truncated questions */}
          {qa.tags?.length && (
            <div className="mt-6 text-sm text-gray-700">
              🏷️ ট্যাগ:{" "}
              {qa.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-block mx-1 px-2 py-1 bg-green-100 text-green-800 rounded"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        {/* Right Sidebar - Popular Q&A Section */}
        {/* Right Sidebar */}
        <aside className="lg:w-1/4 mt-10 lg:mt-0 lg:pl-6 border-t lg:border-t-0 lg:border-l border-green-200">
          <h3 className="text-xl font-bold text-green-700 mb-6 flex items-center gap-2">
            <span>🔥 জনপ্রিয় প্রশ্ন</span>
          </h3>

          <ul className="space-y-6">
            {popular.map((item) => (
              <li
                key={item.id}
                className="bg-white shadow-md rounded-md p-4 hover:shadow-lg transition-shadow"
              >
                <Link
                  href={`/qa/${item.id}`}
                  className="block text-green-900 font-semibold text-lg hover:text-green-700 mb-2"
                >
                  {item.question}
                </Link>

                <div className="flex flex-wrap items-center text-sm text-green-600 mb-3 space-x-3">
                  <span className="bg-green-100 px-2 py-0.5 rounded-full font-medium">
                    {item.category}
                  </span>
                  <span>📅 {item.date}</span>
                  <span>👁️ {item.views}</span>
                </div>

                <div className="flex space-x-4">
                  {/* Twitter */}
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                      item.question + " " + `https://yourdomain.com/qa/${item.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700"
                    aria-label="Share on Twitter"
                  >
                    <FaTwitter size={18} />
                  </a>

                  {/* Facebook */}
                  <a
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                      `https://yourdomain.com/qa/${item.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-800 hover:text-blue-900"
                    aria-label="Share on Facebook"
                  >
                    <FaFacebookF size={18} />
                  </a>

                  {/* WhatsApp */}
                  <a
                    href={`https://wa.me/?text=${encodeURIComponent(
                      item.question + " " + `https://yourdomain.com/qa/${item.id}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-600 hover:text-green-800"
                    aria-label="Share on WhatsApp"
                  >
                    <FaWhatsapp size={18} />
                  </a>
                </div>
              </li>
            ))}
          </ul>
        </aside>



      </div>
    </>
  );
}
