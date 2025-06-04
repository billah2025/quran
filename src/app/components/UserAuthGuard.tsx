'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/utils/firebase'

interface Props {
  children: React.ReactNode
}

export default function UserAuthGuard({ children }: Props) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [redirecting, setRedirecting] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true)
        setLoading(false)
      } else {
        setLoading(false)
        setRedirecting(true)
        router.push('/user-auth')
      }
    })

    return () => unsubscribe()
  }, [router])

  if (loading) {
    return <div className="p-4 text-center">Checking authentication...</div>
  }

  if (redirecting) {
    return <div className="p-4 text-center">Redirecting to login...</div>
  }

  // When authenticated, render children
  if (isAuthenticated) {
    return <>{children}</>
  }

  // If not authenticated and not redirecting, render nothing
  return null
}
