'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#0f1419] relative overflow-hidden">
      {/* Diagonal Teal Stripe Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute w-full h-full"
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="adminLoginGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="adminFadeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="adminFadeMask">
              <rect x="0" y="0" width="1920" height="1080" fill="url(#adminFadeGradient)" />
            </mask>
          </defs>
          <g mask="url(#adminFadeMask)">
            <path
              d="
                M 0,1080
                Q 400,800 800,600
                Q 1200,400 1600,200
                Q 1760,100 1920,0
                L 1920,1080 L 0,1080 Z"
              fill="url(#adminLoginGradient)"
            />
          </g>
        </svg>
      </div>

      {/* Header */}
      <header className="relative z-10 border-b border-gray-800">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/exiuslogo.png"
                alt="Exius"
                width={120}
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-64px)] px-4 py-12">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 shadow-2xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-500/10 rounded-full mb-4">
                <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h1 className="text-3xl font-medium text-white mb-2">Admin Access</h1>
              <p className="text-gray-400">Sign in to the admin dashboard</p>
            </div>

            {/* Login Form */}
            <form className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="admin@exius.com"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-700 bg-gray-800/50 text-red-500 focus:ring-red-500 focus:ring-offset-0"
                  />
                  <span className="ml-2 text-sm text-gray-400">Remember me</span>
                </label>
              </div>

              <Link href="/adash">
                <button
                  type="button"
                  className="w-full bg-red-500 text-white py-3 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  Sign In
                </button>
              </Link>
            </form>

            {/* Warning */}
            <div className="mt-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4">
              <p className="text-sm text-red-400 text-center">
                ⚠️ Authorized personnel only. All activity is monitored and logged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
