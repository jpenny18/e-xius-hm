'use client'

import { useEffect, useState } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { getUserData, isAdmin } from '@/lib/auth'

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [userData, setUserData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [isAdminUser, setIsAdminUser] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      
      if (user) {
        const result = await getUserData(user.uid)
        if (result.success) {
          setUserData(result.data)
          setIsAdminUser(isAdmin(user.email))
        }
      } else {
        setUserData(null)
        setIsAdminUser(false)
      }
      
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return { user, userData, loading, isAdminUser }
}
