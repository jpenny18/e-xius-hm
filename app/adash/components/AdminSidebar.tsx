'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { logoutUser } from '@/lib/auth'

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, userData } = useAuth()
  const [mobileOpen, setMobileOpen] = useState(false)

  const isActive = (path: string) => {
    if (path === '/adash') {
      return pathname === path
    }
    return pathname.startsWith(path)
  }

  const handleSignOut = async () => {
    await logoutUser()
    router.push('/adlogin')
  }

  const getInitials = () => {
    if (userData?.firstName && userData?.lastName) {
      return `${userData.firstName[0]}${userData.lastName[0]}`
    }
    if (user?.email) {
      return user.email[0].toUpperCase()
    }
    return 'A'
  }

  const closeMobileMenu = () => setMobileOpen(false)

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-gray-900/95 backdrop-blur-md border-b border-gray-800 flex items-center justify-between px-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 -ml-1 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 active:bg-gray-800"
          aria-label="Open admin menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="flex items-center gap-2">
          <Link href="/adash">
            <Image src="/exiuslogo.png" alt="Exius Admin" width={120} height={40} className="h-8 w-auto" />
          </Link>
          <span className="text-xs font-medium text-red-400 bg-red-500/10 border border-red-500/20 rounded px-2 py-0.5">Admin</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold text-sm flex-shrink-0">
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
          <div className="flex items-center gap-2">
            <Image src="/exiuslogo.png" alt="Exius Admin" width={120} height={40} className="h-8 w-auto" />
            <span className="text-xs font-medium text-red-400">Admin</span>
          </div>
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
          <Link href="/adash">
            <Image
              src="/exiuslogo.png"
              alt="Exius Admin"
              width={360}
              height={120}
              className="h-24 w-auto"
            />
          </Link>
        </div>

        {/* Admin Badge - desktop only */}
        <div className="hidden md:block px-6 py-4 border-b border-gray-800">
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2 flex items-center gap-2">
            <svg className="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-sm font-medium text-red-400">Admin Panel</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          <Link
            href="/adash"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/adash') && pathname === '/adash'
                ? 'bg-red-500/10 text-red-400'
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
            <span className="font-medium">Dashboard</span>
          </Link>

          <Link
            href="/adash/transactions"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/adash/transactions')
                ? 'bg-red-500/10 text-red-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span className="font-medium">Transactions</span>
          </Link>

          <Link
            href="/adash/manage-users"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/adash/manage-users')
                ? 'bg-red-500/10 text-red-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <span className="font-medium">Users</span>
          </Link>

          <Link
            href="/adash/analytics"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/adash/analytics')
                ? 'bg-red-500/10 text-red-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <span className="font-medium">Analytics</span>
          </Link>

          <Link
            href="/adash/interest"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/adash/interest')
                ? 'bg-red-500/10 text-red-400'
                : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
            }`}
          >
            <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-medium">Daily Interest</span>
          </Link>

          <Link
            href="/adash/settings"
            onClick={closeMobileMenu}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              isActive('/adash/settings')
                ? 'bg-red-500/10 text-red-400'
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

        {/* Admin Section */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-3 px-4 py-3">
            <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white font-semibold flex-shrink-0">
              {getInitials()}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">
                {userData?.firstName && userData?.lastName
                  ? `${userData.firstName} ${userData.lastName}`
                  : 'Admin User'}
              </div>
              <div className="text-xs text-gray-400 truncate">{user?.email || 'admin@exius.com'}</div>
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
