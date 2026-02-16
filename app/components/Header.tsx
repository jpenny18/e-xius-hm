'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-[#0f1419] border-b border-gray-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0 transform md:translate-y-[10px] transition-all">
            <Image
              src="/exiuslogo.png"
              alt="Exius"
              width={480}
              height={160}
              className="h-10 md:h-40 w-auto transition-all"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center w-full">
            {/* Center group */}
            <div className="flex flex-1 justify-center space-x-8">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Personal
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Company
              </a>
            </div>
            {/* Right group */}
            <div className="flex items-center space-x-6 ml-auto">
              <Link
                href="/login"
                className="text-gray-300 hover:text-white transition-colors font-medium"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="bg-teal-400 text-primary px-6 py-2 rounded-lg font-semibold hover:bg-teal-300 transition-all"
              >
                Signup
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white md:text-primary p-2"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-64 pb-2' : 'max-h-0'
          }`}
        >
          <div className="flex flex-col space-y-3 pt-4 pb-1">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Personal
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Company
            </a>
            <Link
              href="/login"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Login
            </Link>
            <Link
              href="/login"
              className="bg-teal-400 text-primary px-5 py-2 rounded-lg font-semibold hover:bg-teal-300 transition-all text-center"
            >
              Signup
            </Link>
          </div>
        </div>
      </nav>
    </header>
  )
}
