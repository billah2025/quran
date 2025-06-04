'use client'
import { signOut } from 'firebase/auth'
import { auth } from '@/utils/firebase'
import { useRouter } from 'next/navigation'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      router.push('/user-auth') // Redirect to login page after logout
    } catch (error: any) {
      alert('Logout failed: ' + error.message)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition"
    >
      Logout
    </button>
  )
}
