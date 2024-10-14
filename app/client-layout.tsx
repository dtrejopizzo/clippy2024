'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBaXRzj-Behx8TqpGya5ZKOju_SEfnghnM",
  authDomain: "clippy-cbc.firebaseapp.com",
  projectId: "clippy-cbc",
  storageBucket: "clippy-cbc.appspot.com",
  messagingSenderId: "1010590048595",
  appId: "1:1010590048595:web:090e6511cbe1ddd0b2c1a6",
  measurementId: "G-YFE116D95T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        if (pathname === '/login') {
          router.push('/')
        }
      } else {
        if (pathname !== '/login') {
          router.push('/login')
        }
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [router, pathname])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  return <>{children}</>
}
