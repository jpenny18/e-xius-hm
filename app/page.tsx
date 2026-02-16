'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from './components/Header'
import HeroStats from './components/HeroStats'
import Calculator from './components/Calculator'
import FAQ from './components/FAQ'
import Footer from './components/Footer'

export default function Home() {
  const [activeTab, setActiveTab] = useState<'flexible' | 'fixed'>('flexible')

  const flexibleRates = {
    BTC: 9,
    ETH: 12.3,
    XRP: 9.3,
    BNB: 8,
    USDT: 16,
    TRX: 8,
    USDC: 14.5,
    SOL: 10,
    LTC: 7,
  }

  const fixedRates = {
    BTC: 9.8,
    ETH: 14.6,
    XRP: 10.3,
    BNB: 9.6,
    USDT: 26,
    TRX: 12,
    USDC: 22.5,
    SOL: 16,
    LTC: 13,
  }

  const coinLogos: { [key: string]: string } = {
    BTC: '/BTC.svg',
    ETH: '/ETH.svg',
    XRP: '/XRP.svg',
    BNB: '/BNB.svg',
    USDT: '/USDT.svg',
    TRX: '/TRX.svg',
    USDC: '/USDC.svg',
    SOL: '/SOL.svg',
    LTC: '/ltc.png',
  }

  const rates = activeTab === 'flexible' ? flexibleRates : fixedRates

  const scrollToSection = () => {
    document.getElementById('section-two')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <Header />
      <main className="bg-white">
        {/* Hero Section */}
      <section className="relative min-h-screen flex flex-col md:items-center md:justify-center px-4 py-8 md:py-20 bg-[#0f1419]">
        {/* Diagonal Teal Stripe - Mobile */}
        <div className="absolute inset-0 md:hidden overflow-hidden pointer-events-none">
          <svg
            className="absolute w-full h-full"
            width="100%"
            height="100%"
            viewBox="0 50 375 300"
            fill="none"
            style={{
              minWidth: '80px',
              maxWidth: '100vw',
              minHeight: '300px',
              maxHeight: '100vh',
            }}
          >
            <defs>
              <linearGradient id="mobileCurvedLine" x1="0" y1="600" x2="375" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" stopOpacity="0.34" />
                <stop offset="1" stopColor="#14b8a6" stopOpacity="0.50" />
              </linearGradient>
              {/* Opacity gradient mask: fully opaque top left, transparent bottom right */}
              <linearGradient id="fadeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="80%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="fadeMask">
                <rect x="0" y="0" width="375" height="600" fill="url(#fadeGradient)" />
              </mask>
            </defs>
            <g mask="url(#fadeMask)">
              <path
                d="
                  M 0,600
                  Q 90,450 180,300
                  Q 280,150 375,0
                  L 375,600 L 0,600 Z"
                fill="url(#mobileCurvedLine)"
              />
            </g>
          </svg>
        </div>

        {/* Diagonal Teal Stripe - Desktop */}
        <div className="hidden md:block absolute inset-0 overflow-hidden pointer-events-none">
          <svg
            className="absolute w-full h-full"
            width="100%"
            height="100%"
            viewBox="0 0 1920 1080"
            fill="none"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="desktopCurvedLine" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2dd4bf" stopOpacity="0.3" />
                <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient id="desktopFadeGradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="white" stopOpacity="1" />
                <stop offset="70%" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <mask id="desktopFadeMask">
                <rect x="0" y="0" width="1920" height="1080" fill="url(#desktopFadeGradient)" />
              </mask>
            </defs>
            <g mask="url(#desktopFadeMask)">
              <path
                d="
                  M 0,1080
                  Q 400,800 800,600
                  Q 1200,400 1600,200
                  Q 1760,100 1920,0
                  L 1920,1080 L 0,1080 Z"
                fill="url(#desktopCurvedLine)"
              />
            </g>
          </svg>
        </div>

        {/* Mobile Layout */}
        <div className="relative z-10 md:hidden w-full max-w-md mx-auto flex flex-col gap-6 py-4">
          {/* Top Content */}
          <div>
            <div className="text-left">
              <h1 className="text-4xl w-3/4 font-normal text-white mb-6 leading-tight">
                Savings that grow every day.
              </h1>
              <p className="text-lg text-gray-300 mb-8">
                Earn up to 26% yearly on your crypto
                <br />
                with daily compounding and no lockups
              </p>
            </div>
            <button
              onClick={scrollToSection}
              className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2 mb-6"
            >
              Start earning
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>

            {/* Info Card */}
            <div className="bg-gray-900/50 border border-gray-700 rounded-xl p-5 backdrop-blur-sm hidden">
              <p className="text-white text-sm leading-relaxed">
                Unlock white-glove wealth solutions when you add{' '}
                <span className="font-semibold text-white">$100,000</span> or more.
              </p>
              <a href="#" className="text-teal-400 text-sm font-medium inline-flex items-center gap-1 mt-2">
                Discover Exius Private
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Moved Bottom Content Up */}
          <div className="relative mt-32">
            {/* Daily Payouts Badge */}
            <div className="absolute -top-24 right-0 bg-gray-900/80 backdrop-blur-sm text-white px-8 py-4 rounded-2xl text-2xl font-medium border border-gray-700">
              Daily payouts
            </div>

            {/* Interest Earned Card */}
            <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 w-96 mx-auto flex flex-col items-center">
              <div className="text-gray-400 text-sm mb-2 w-full text-left">Interest earned</div>
              <div className="text-teal-400 text-5xl font-medium mb-6 text-center">$30,800.50</div>
              <div className="flex gap-3 justify-center">
                <div className="w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-2xl">
                  ₿
                </div>
                <div className="w-14 h-14 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold text-2xl">
                  ⟠
                </div>
                <div className="w-14 h-14 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-2xl">
                  $
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block relative z-10 max-w-6xl mx-auto w-full">
          <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between text-center md:text-left mb-12">
            {/* Left Side: Heading */}
            <div className="md:flex-1 md:flex md:items-start md:justify-start md:pr-12">
              <h1 className="text-4xl md:text-[56px] font-normal text-white mb-6 md:mb-0 leading-tight">
                Savings that grow every day.
              </h1>
            </div>
            {/* Right Side: Paragraph and CTA */}
            <div className="md:flex-1 flex flex-col items-center md:items-end md:justify-start">
              <p className="text-lg md:text-2xl lg:text-[24px] text-gray-300 mb-8 md:mb-8 md:max-w-md text-center md:text-right">
                Earn up to 26% yearly on your crypto with daily compounding and no lockups
              </p>
              <button
                onClick={scrollToSection}
                className="bg-teal-400 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-teal-300 transition-all inline-flex items-center gap-2"
              >
                Start earning
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Hero Stats Component - Desktop Only */}
          <HeroStats />
        </div>
      </section>

      {/* Section Two - Tabs */}
      <section id="section-two" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Tab Buttons */}
          <div className="flex justify-center mb-16">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('flexible')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'flexible'
                    ? 'bg-white text-primary shadow-md'
                    : 'text-subtext hover:text-primary'
                }`}
              >
                Flexible Savings
              </button>
              <button
                onClick={() => setActiveTab('fixed')}
                className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'fixed'
                    ? 'bg-white text-primary shadow-md'
                    : 'text-subtext hover:text-primary'
                }`}
              >
                Fixed-Term Savings
              </button>
            </div>
          </div>

          {/* Flexible Savings Content */}
          {activeTab === 'flexible' && (
            <>
              {/* Benefits Section */}
              <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-medium text-primary text-center mb-4">
                  The benefits of flexible savings
                </h2>
                <p className="text-lg text-subtext text-center mb-12 max-w-4xl mx-auto">
                  Join the Exius loyalty program and benefit from industry leading rates with an
                  account balance above $5,000
                </p>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h3 className="text-2xl font-medium text-primary mb-3">Daily compounding</h3>
                    <p className="text-subtext">
                      Build your wealth faster with up to 16% annual interest rate, paid out every
                      day.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h3 className="text-2xl font-medium text-primary mb-3">Funds available anytime</h3>
                    <p className="text-subtext">
                      Your funds are earning interest while remaining available
                    </p>
                  </div>
                </div>
              </div>

              {/* Interest Rates Grid */}
              <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-medium text-primary text-center mb-12">
                  Annual rates that drive your long-term success.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {Object.entries(rates).map(([coin, rate]) => (
                    <div
                      key={coin}
                      className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow flex flex-col items-center"
                    >
                      <div className="w-16 h-16 mb-3 relative">
                        <Image
                          src={coinLogos[coin]}
                          alt={coin}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-2xl font-medium text-primary mb-1">{coin}</div>
                      <div className="text-xl font-normal text-subtext">{rate}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Fixed-Term Savings Content */}
          {activeTab === 'fixed' && (
            <>
              {/* Benefits Section */}
              <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-medium text-primary text-center mb-4">
                  Savings that support your goals
                </h2>
                <p className="text-lg text-subtext text-center mb-12 max-w-4xl mx-auto">
                  Join the Exius Loyalty Program and benefit from industry-leading rates with an
                  account balance above $5,000
                </p>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h3 className="text-2xl font-medium text-primary mb-3">Earn even higher rates</h3>
                    <p className="text-subtext">
                      Earn extra yield on top of our flexible savings rates with 1, 3 or 12-month
                      terms
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h3 className="text-2xl font-medium text-primary mb-3">Preserve wealth over time</h3>
                    <p className="text-subtext">
                      Maintain the long-term value of your assets with steady compounding returns.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-8 rounded-xl">
                    <h3 className="text-2xl font-medium text-primary mb-3">
                      Grow your portfolio on autopilot
                    </h3>
                    <p className="text-subtext">
                      Auto-renew your term with zero effort and enjoy uninterrupted growth.
                    </p>
                  </div>
                </div>
              </div>

              {/* Interest Rates Grid */}
              <div className="mb-20">
                <h2 className="text-4xl md:text-5xl font-medium text-primary text-center mb-12">
                  Annual rates that drive your long-term success.
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                  {Object.entries(rates).map(([coin, rate]) => (
                    <div
                      key={coin}
                      className="bg-gray-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow flex flex-col items-center"
                    >
                      <div className="w-16 h-16 mb-3 relative">
                        <Image
                          src={coinLogos[coin]}
                          alt={coin}
                          width={64}
                          height={64}
                          className="object-contain"
                        />
                      </div>
                      <div className="text-2xl font-medium text-primary mb-1">{coin}</div>
                      <div className="text-xl font-normal text-subtext">{rate}%</div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Calculator Section */}
          <Calculator rates={rates} isFixed={activeTab === 'fixed'} />

          {/* FAQ Section */}
          <FAQ activeTab={activeTab} />
        </div>
      </section>

        {/* Footer */}
        <Footer />
      </main>
    </>
  )
}
