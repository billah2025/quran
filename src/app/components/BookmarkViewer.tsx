'use client';

import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import { db } from '@/utils/firebase';
import { toast } from 'react-hot-toast';
import { FaTrashAlt, FaCopy, FaShareAlt } from 'react-icons/fa';

interface Bookmark {
  id: string;
  ayahText: string;
  ayahNumber: number;
  surahNumber: number;
  translation: string;
  timestamp: any;
}

const surahNames: string[] = [
  '',
  'Al-Fatihah',
  'Al-Baqarah',
  'Aal-E-Imran',
  'An-Nisa',
  'Al-Maidah',
  'Al-Anam',
  'Al-Araf',
  'Al-Anfal',
  'At-Tawbah',
  'Yunus',
  'Hud',
  'Yusuf',
  'Ar-Rad',
  'Ibrahim',
  'Al-Hijr',
  'An-Nahl',
  'Al-Isra',
  'Al-Kahf',
  'Maryam',
  'Ta-Ha',
  'Al-Anbiya',
  'Al-Hajj',
  'Al-Muminun',
  'An-Nur',
  'Al-Furqan',
  'Ash-Shuara',
  'An-Naml',
  'Al-Qasas',
  'Al-Ankabut',
  'Ar-Rum',
  'Luqman',
  'As-Sajda',
  'Al-Ahzab',
  'Saba',
  'Fatir',
  'Ya-Sin',
  'As-Saffat',
  'Sad',
  'Az-Zumar',
  'Ghafir',
  'Fussilat',
  'Ash-Shura',
  'Az-Zukhruf',
  'Ad-Dukhan',
  'Al-Jathiya',
  'Al-Ahqaf',
  'Muhammad',
  'Al-Fath',
  'Al-Hujurat',
  'Qaf',
  'Adh-Dhariyat',
  'At-Tur',
  'An-Najm',
  'Al-Qamar',
  'Ar-Rahman',
  'Al-Waqia',
  'Al-Hadid',
  'Al-Mujadila',
  'Al-Hashr',
  'Al-Mumtahina',
  'As-Saff',
  'Al-Jumua',
  'Al-Munafiqun',
  'At-Taghabun',
  'At-Talaq',
  'At-Tahrim',
  'Al-Mulk',
  'Al-Qalam',
  'Al-Haqqa',
  'Al-Maarij',
  'Nuh',
  'Al-Jinn',
  'Al-Muzzammil',
  'Al-Muddaththir',
  'Al-Qiyama',
  'Al-Insan',
  'Al-Mursalat',
  'An-Naba',
  'An-Naziat',
  'Abasa',
  'At-Takwir',
  'Al-Infitar',
  'Al-Mutaffifin',
  'Al-Inshiqaq',
  'Al-Buruj',
  'At-Tariq',
  'Al-Ala',
  'Al-Ghashiya',
  'Al-Fajr',
  'Al-Balad',
  'Ash-Shams',
  'Al-Lail',
  'Ad-Duhaa',
  'Ash-Sharh',
  'At-Tin',
  'Al-Alaq',
  'Al-Qadr',
  'Al-Bayyina',
  'Az-Zalzalah',
  'Al-Adiyat',
  'Al-Qaria',
  'At-Takathur',
  'Al-Asr',
  'Al-Humazah',
  'Al-Fil',
  'Quraish',
  'Al-Maun',
  'Al-Kawthar',
  'Al-Kafirun',
  'An-Nasr',
  'Al-Masad',
  'Al-Ikhlas',
  'Al-Falaq',
  'An-Nas'
];

export default function BookmarkViewer() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [filteredSurah, setFilteredSurah] = useState<number | 'all'>('all');
  const [fonts, setFonts] = useState({
    arabicFontSize: 28,
    banglaFontSize: 18,
    arabicFont: 'font-arabic',
    banglaFont: 'font-bangla',
  });

  useEffect(() => {
    const stored = localStorage.getItem('quran-settings');
    if (stored) {
      const parsed = JSON.parse(stored);
      setFonts({
        arabicFontSize: parsed.arabicFontSize || 28,
        banglaFontSize: parsed.banglaFontSize || 18,
        arabicFont: parsed.arabicFont || 'font-arabic',
        banglaFont: parsed.banglaFont || 'font-bangla',
      });
    }
  }, []);

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) return;
    const fetchBookmarks = async () => {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'bookmarks'),
          where('userId', '==', user.uid)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Bookmark[];
        setBookmarks(data);
      } catch (error) {
        console.error('Error fetching bookmarks:', error);
        toast.error('Failed to load bookmarks');
      } finally {
        setLoading(false);
      }
    };

    fetchBookmarks();
  }, [user]);

  const deleteBookmark = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this bookmark?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'bookmarks', id));
      setBookmarks(bookmarks.filter((bm) => bm.id !== id));
      toast.success('Bookmark removed');
    } catch (error) {
      console.error('Delete failed:', error);
      toast.error('Failed to delete');
    }
  };

const handleCopy = (text: string, translation: string, surahNumber: number, ayahNumber: number) => {
  const label = `(${surahNames[surahNumber] || 'Surah'}:${ayahNumber})`;
  navigator.clipboard.writeText(`${text}\n\n${translation}\n\n${label}`);
  toast.success('Copied to clipboard');
};

const handleShare = (text: string, translation: string, surahNumber: number, ayahNumber: number) => {
  const label = `(${surahNames[surahNumber] || 'Surah'}:${ayahNumber})`;
  const content = `${text}\n\n${translation}\n\n${label}`;
  if (navigator.share) {
    navigator.share({ text: content })
      .then(() => toast.success('Shared!'))
      .catch(() => toast.error('Share canceled'));
  } else {
    toast('Sharing not supported');
  }
};


  const filtered = filteredSurah === 'all'
    ? bookmarks
    : bookmarks.filter((bm) => bm.surahNumber === filteredSurah);

  const uniqueSurahs = Array.from(new Set(bookmarks.map(b => b.surahNumber))).sort((a, b) => a - b);

  if (!user) return <div className="text-center mt-10 text-green-700 font-semibold">Please log in to view bookmarks.</div>;

  return (
    <div className="p-4  bg-emerald-600">
      <h2 className="text-3xl font-bold mb-6 text-green-700 border-b-2 border-green-500 pb-2">📖 Your Bookmarked Ayahs</h2>

      <div className="mb-4">
        <label className="mr-2 text-green-700 font-medium">Filter by Surah:</label>
        <select
          className="border rounded px-2 py-1 text-black bg-green-50 border-green-300"
          value={filteredSurah}
          onChange={(e) =>
            setFilteredSurah(e.target.value === 'all' ? 'all' : parseInt(e.target.value))
          }
        >
          <option value="all">All</option>
          {uniqueSurahs.map((num) => (
            <option key={num} value={num}>Surah {surahNames[num] || num}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <p className="text-green-600">Loading...</p>
      ) : filtered.length === 0 ? (
        <p className="text-gray-500">No bookmarks found.</p>
      ) : (
        <ul className="space-y-4">
          {filtered.map((bm) => (
            <li
              key={bm.id}
              className="p-4 bg-green-50 border border-green-300 rounded-xl shadow-sm relative hover:shadow-md transition"
            >
              <div
                className={`text-lg text-right text-green-900 mb-2 ${fonts.arabicFont}`}
                style={{ fontSize: `${fonts.arabicFontSize}px` }}
              >
                {bm.ayahText}
                <span className="ml-2 text-sm text-green-600">({surahNames[bm.surahNumber] || bm.surahNumber}:{bm.ayahNumber})</span>
              </div>
              <div
                className={`text-sm text-gray-800 italic mb-3 ${fonts.banglaFont}`}
                style={{ fontSize: `${fonts.banglaFontSize}px` }}
              >
                {bm.translation}
              </div>
              <div className="absolute top-2 right-2 flex gap-2">
                <button
                  onClick={() => handleCopy(bm.ayahText, bm.translation, bm.surahNumber, bm.ayahNumber)}
                  className="text-green-600 hover:text-green-800"
                  title="Copy"
                >
                  <FaCopy />
                </button>
                <button
                 onClick={() => handleShare(bm.ayahText, bm.translation, bm.surahNumber, bm.ayahNumber)}

                  className="text-blue-600 hover:text-blue-800"
                  title="Share"
                >
                  <FaShareAlt />
                </button>
                <button
                  onClick={() => deleteBookmark(bm.id)}
                  className="text-red-600 hover:text-red-800"
                  title="Remove bookmark"
                >
                  <FaTrashAlt />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}