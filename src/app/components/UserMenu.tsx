'use client';

import { useEffect, useRef, useState } from 'react';
import { onAuthStateChanged, signOut, User } from 'firebase/auth';
import { auth, db } from '@/utils/firebase';
import { useRouter } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';

export default function UserAvatarDropdown() {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Fetch username
  useEffect(() => {
    const fetchUsername = async () => {
      if (user) {
        try {
          const userDoc = await getDoc(doc(db, 'user-login', user.uid));
          const userData = userDoc.data();
          if (userData?.username) {
            setUsername(userData.username);
          }
        } catch (err) {
          console.error('Error fetching username:', err);
        }
      }
    };
    fetchUsername();
  }, [user]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownOpen]);

  const handleLogout = async () => {
    await signOut(auth);
    setDropdownOpen(false);
    router.push('/');
  };

  const handleProfile = () => {
    setDropdownOpen(false);
    router.push('/profile');
  };

  if (!user) {
    return (
      <button
        onClick={() => router.push('/user-auth')}
        className="bg-emerald-700 hover:bg-emerald-800 text-white font-medium px-4 py-2 rounded-full transition duration-200"
      >
        Login Now
      </button>
    );
  }

  const initials = (username || user.email)?.charAt(0)?.toUpperCase() || 'U';

  return (
    <div ref={dropdownRef} className="relative inline-block w-full md:w-auto">
      {/* Avatar button */}
      <button
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center space-x-2 px-3 py-1 hover:bg-emerald-800 rounded-full transition duration-200 group"
      >
        <div className="bg-yellow-400 text-emerald-900 font-bold rounded-full w-9 h-9 flex items-center justify-center shadow-md border-2 border-emerald-800">
          {initials}
        </div>
        <span className=" md:inline text-white font-medium text-sm">
         {username}
        </span>
      </button>

      {/* Dropdown menu */}
      <div
        className={`absolute    mt-2 w-48  bg-emerald-800  border border-emerald-100 rounded-xl shadow-lg z-50 overflow-hidden transform transition-all duration-200 origin-top-right ${
          dropdownOpen
            ? 'opacity-100 scale-100'
            : 'opacity-0 scale-95 pointer-events-none'
        }`}
      >
        <button
          onClick={handleProfile}
          className="w-full text-left px-5 py-3 text-sm hover:bg-emerald-700 text-white transition"
        >
          🧕 My Profile 
        </button>
        <button
          onClick={handleLogout}
          className="w-full text-left px-5 py-3 text-sm hover:bg-emerald-700 text-red-600 transition"
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
}
