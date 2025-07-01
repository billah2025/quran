'use client';

import { useEffect, useState } from 'react';
import { FaCopy, FaShareAlt, FaBookmark, FaPlay, FaEllipsisV } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { getAuth } from 'firebase/auth';
import { db } from '@/utils/firebase';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  getDocs,
} from 'firebase/firestore';

interface AyahActionsProps {
  ayah: {
    text: string;
    numberInSurah: number;
    translation: string;
  };
  surahNumber: number;
  onPlay: () => void;
}

export default function AyahActions({ ayah, surahNumber, onPlay }: AyahActionsProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  const user = getAuth().currentUser;
  const surahNames = [
    '', 'Al-Fatihah', 'Al-Baqarah', 'Aal-E-Imran', 'An-Nisa', 'Al-Maidah',
    'Al-Anam', 'Al-Araf', 'Al-Anfal', 'At-Tawbah', 'Yunus', 'Hud', 'Yusuf',
    'Ar-Rad', 'Ibrahim', 'Al-Hijr', 'An-Nahl', 'Al-Isra', 'Al-Kahf', 'Maryam',
    'Ta-Ha', 'Al-Anbiya', 'Al-Hajj', 'Al-Muminun', 'An-Nur', 'Al-Furqan',
    'Ash-Shuara', 'An-Naml', 'Al-Qasas', 'Al-Ankabut', 'Ar-Rum', 'Luqman',
    'As-Sajda', 'Al-Ahzab', 'Saba', 'Fatir', 'Ya-Sin', 'As-Saffat', 'Sad',
    'Az-Zumar', 'Ghafir', 'Fussilat', 'Ash-Shura', 'Az-Zukhruf', 'Ad-Dukhan',
    'Al-Jathiya', 'Al-Ahqaf', 'Muhammad', 'Al-Fath', 'Al-Hujurat', 'Qaf',
    'Adh-Dhariyat', 'At-Tur', 'An-Najm', 'Al-Qamar', 'Ar-Rahman', 'Al-Waqia',
    'Al-Hadid', 'Al-Mujadila', 'Al-Hashr', 'Al-Mumtahina', 'As-Saff', 'Al-Jumua',
    'Al-Munafiqun', 'At-Taghabun', 'At-Talaq', 'At-Tahrim', 'Al-Mulk', 'Al-Qalam',
    'Al-Haqqa', 'Al-Maarij', 'Nuh', 'Al-Jinn', 'Al-Muzzammil', 'Al-Muddaththir',
    'Al-Qiyama', 'Al-Insan', 'Al-Mursalat', 'An-Naba', 'An-Naziat', 'Abasa',
    'At-Takwir', 'Al-Infitar', 'Al-Mutaffifin', 'Al-Inshiqaq', 'Al-Buruj',
    'At-Tariq', 'Al-Ala', 'Al-Ghashiya', 'Al-Fajr', 'Al-Balad', 'Ash-Shams',
    'Al-Lail', 'Ad-Duhaa', 'Ash-Sharh', 'At-Tin', 'Al-Alaq', 'Al-Qadr',
    'Al-Bayyina', 'Az-Zalzalah', 'Al-Adiyat', 'Al-Qaria', 'At-Takathur',
    'Al-Asr', 'Al-Humazah', 'Al-Fil', 'Quraish', 'Al-Maun', 'Al-Kawthar',
    'Al-Kafirun', 'An-Nasr', 'Al-Masad', 'Al-Ikhlas', 'Al-Falaq', 'An-Nas'
  ];

  useEffect(() => {
    if (!user) return;

    const checkBookmark = async () => {
      const q = query(
        collection(db, 'bookmarks'),
        where('userId', '==', user.uid),
        where('surahNumber', '==', surahNumber),
        where('ayahNumber', '==', ayah.numberInSurah)
      );
      const snapshot = await getDocs(q);
      setBookmarked(!snapshot.empty);
    };

    checkBookmark();
  }, [user, ayah.numberInSurah, surahNumber]);

  const toggleBookmark = async () => {
    if (!user) return toast.error('Login required');

    const q = query(
      collection(db, 'bookmarks'),
      where('userId', '==', user.uid),
      where('surahNumber', '==', surahNumber),
      where('ayahNumber', '==', ayah.numberInSurah)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      await deleteDoc(doc(db, 'bookmarks', snapshot.docs[0].id));
      setBookmarked(false);
      toast.success('Bookmark removed');
    } else {
      await addDoc(collection(db, 'bookmarks'), {
        userId: user.uid,
        ayahText: ayah.text,
        ayahNumber: ayah.numberInSurah,
        surahNumber,
        translation: ayah.translation,
        timestamp: new Date(),
      });
      setBookmarked(true);
      toast.success('Bookmarked!');
    }
  };
  const handleShare = async () => {
    const reference = `(${surahNames[surahNumber] || 'Surah'}:${ayah.numberInSurah})`;
    const shareText = `${ayah.text}\n\n${ayah.translation}\n\n${reference}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Quran Ayah',
          text: shareText,
        });
        toast.success('Shared!');
      } catch (err) {
        toast.error('Sharing failed');
      }
    } else {
      navigator.clipboard.writeText(shareText);
      toast.success('Copied to clipboard (no share API)');
    }
  };


  const handleCopy = () => {
    const reference = `(${surahNames[surahNumber] || 'Surah'}:${ayah.numberInSurah})`;
    navigator.clipboard.writeText(`${ayah.text}\n\n${ayah.translation}\n\n${reference}`);
    toast.success('Copied!');
  };


  return (
    <div className="absolute top-2 right-2 z-40">
      <div className="relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setMenuOpen(!menuOpen);
          }}
          className="p-2 bg-gray-200 rounded-full hover:bg-gray-300"
        >
          <FaEllipsisV />
        </button>

        {menuOpen && (
          <div className="absolute top-0 right-10 bg-white shadow-lg rounded-xl p-2 flex gap-2 z-50">
            <ActionButton icon={<FaCopy />} onClick={handleCopy} title="Copy" />
            <ActionButton icon={<FaShareAlt />} onClick={handleShare} title="Share" />
            <ActionButton
              icon={<FaBookmark className={bookmarked ? 'text-purple-600' : ''} />}
              onClick={toggleBookmark}
              title={bookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
            />
            <ActionButton icon={<FaPlay />} onClick={onPlay} title="Play" />
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  onClick,
  title,
}: {
  icon: React.ReactNode;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="p-2 bg-gray-100 rounded-full hover:bg-gray-300"
      title={title}
    >
      {icon}
    </button>
  );
}
