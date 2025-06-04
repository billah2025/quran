'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { auth, db } from '@/utils/firebase'
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'

export default function UserAuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const [navHeight, setNavHeight] = useState(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password)
        const user = userCredential.user

        // Check role
        const userDoc = await getDoc(doc(db, 'user-login', user.uid))
        const userData = userDoc.data()

        if (userData?.role !== 'user') {
          alert('Access denied: You are not a user.')
          return
        }
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        await setDoc(doc(db, 'user-login', user.uid), {
          email: user.email,
          role: 'user',
        })
      }
      router.push('/tracker') // redirect to tracker
    } catch (error: any) {
      alert(error.message)
    }
  }

  const handlePasswordReset = async () => {
    if (!email) {
      alert('Please enter your email address to reset password.')
      return
    }
    try {
      await sendPasswordResetEmail(auth, email)
      alert('Password reset email sent.')
    } catch (error: any) {
      alert(error.message)
    }
  }

  return (
    <div>
            <Navbar setNavHeight={setNavHeight} />
            <div style={{ paddingTop: `${navHeight}px` }}>
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-blue-100  px-4 text-black">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isLogin ? 'User Login' : 'User Registration'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
        {isLogin && (
          <p className="text-sm text-center mt-2">
            <button
              onClick={handlePasswordReset}
              className="text-blue-600 hover:underline"
            >
              Forgot Password?
            </button>
          </p>
        )}
        <p className="text-center mt-4">
          {isLogin ? 'New user?' : 'Already have an account?'}{' '}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline"
          >
            {isLogin ? 'Register here' : 'Login here'}
          </button>
        </p>
      </div>
    </div>
    </div>
    <Footer />
    </div>

  )
}
