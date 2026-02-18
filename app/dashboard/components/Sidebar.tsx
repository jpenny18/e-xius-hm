'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { logoutUser } from '@/lib/auth'

export default function Sidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, userData } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const handleSignOut = async () => {
    await logoutUser()
    router.push('/login')
  }

  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return 'U'
  }

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 active:bg-gray-800"
          aria-label="Open menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <Link href="/dashboard">
          <Image src="/exiuslogo.png" alt="Exius" width={160} height={53} className="h-9 w-auto" />
        </Link>
        <div className="w-9 h-9 rounded-full bg-teal-400 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
          {getInitials()}
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Panel */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-72 bg-gray-900 border-r border-gray-800 flex flex-col
          transition-transform duration-300 ease-in-out
          md:sticky md:top-0 md:bottom-auto md:h-screen md:max-h-screen md:overflow-y-auto md:z-30
          md:w-64 md:bg-gray-900/60 md:backdrop-blur-sm md:translate-x-0
          ${mobileOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'}
        `}
      >
        {/* Mobile sidebar header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800 md:hidden">
          <Image src="/exiuslogo.png" alt="Exius" width={160} height={53} className="h-9 w-auto" />
          <button
            onClick={closeMobileMenu}
            className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 active:bg-gray-800"
            aria-label="Close menu"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Desktop Logo */}
        <div className="hidden md:flex p-6 border-b border-gray-800 items-center justify-center">
          <Link href="/dashboard">
            <Image
              src="/exiuslogo.png"
              alt="Exius"
              width={360}
              height={120}
              className="h-24 w-auto"
            />
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/dashboard"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/dashboard')
                ? 'bg-teal-400/10 text-teal-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <span className="font-medium">Home</span>
          </Link>

          <Link
            href="/dashboard/settings"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/dashboard/settings')
                ? 'bg-teal-400/10 text-teal-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-teal-400 flex items-center justify-center text-primary font-semibold flex-shrink-0">
              {getInitials()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {userData?.firstName && userData?.lastName
                  ? `${userData.firstName} ${userData.lastName}`
                  : 'User'}
              </div>
              <div className="text-xs text-gray-400 truncate">{user?.email || ''}</div>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors w-full rounded-lg hover:bg-gray-800/50"
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            Sign Out
          </button>
        </div>
      </aside>
    </>
  )
}
