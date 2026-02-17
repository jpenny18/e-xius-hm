'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAdmin?: boolean
}

export default function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { user, loading, isAdminUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (!user) {
        // Not logged in, redirect to appropriate login page
        router.push(requireAdmin ? '/adlogin' : '/login')
      } else if (requireAdmin && !isAdminUser) {
        // Logged in but not admin, redirect to user dashboard
        router.push('/dashboard')
      }
    }
  }, [user, loading, isAdminUser, requireAdmin, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f1419] flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-400 mb-4"></div>
          <p className="text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || (requireAdmin && !isAdminUser)) {
    return null
  }

  return <>{children}</>
}
