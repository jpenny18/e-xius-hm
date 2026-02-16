'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function DashboardPage() {
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

  const coinNames: { [key: string]: string } = {
    BTC: 'Bitcoin',
    ETH: 'Ethereum',
    XRP: 'Ripple',
    BNB: 'Binance Coin',
    USDT: 'Tether',
    TRX: 'Tron',
    USDC: 'USD Coin',
    SOL: 'Solana',
    LTC: 'Litecoin',
  }

  const rates = activeTab === 'flexible' ? flexibleRates : fixedRates

  // Mock balance data
  const totalBalance = '$91,234.56'
  const dailyEarnings = '+$124.32'

  return (
    <div className="min-h-screen p-8">
      {/* Diagonal Teal Stripe Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none opacity-30">
        <svg
          className="absolute w-full h-full"
          width="100%"
          height="100%"
          viewBox="0 0 1920 1080"
          fill="none"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="dashboardGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#dashboardGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-medium text-white mb-2">Dashboard</h1>
          <p className="text-gray-400">Manage your crypto savings and earnings</p>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Total Balance</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <div className="text-3xl font-medium text-white">{totalBalance}</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Daily Earnings</span>
              <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div className="text-3xl font-medium text-teal-400">{dailyEarnings}</div>
          </div>

          <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Active Savings</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="text-3xl font-medium text-white">
              {activeTab === 'flexible' ? 'Flexible' : 'Fixed'}
            </div>
          </div>
        </div>

        {/* Savings Type Tabs */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-white">Your Savings</h2>
            <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab('flexible')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'flexible'
                    ? 'bg-teal-400 text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Flexible Savings
              </button>
              <button
                onClick={() => setActiveTab('fixed')}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  activeTab === 'fixed'
                    ? 'bg-teal-400 text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Fixed-Term Savings
              </button>
            </div>
          </div>

          {/* Crypto Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Object.entries(rates).map(([coin, rate]) => (
              <Link
                key={coin}
                href={`/dashboard/crypto/${coin.toLowerCase()}?type=${activeTab}`}
                className="bg-gray-800/50 border border-gray-700 rounded-xl p-6 hover:border-teal-400 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 relative">
                    <Image
                      src={coinLogos[coin]}
                      alt={coin}
                      width={48}
                      height={48}
                      className="object-contain"
                    />
                  </div>
                  <div className="text-teal-400 text-xl font-medium">{rate}%</div>
                </div>
                <div className="text-white font-medium text-lg mb-1">{coin}</div>
                <div className="text-gray-400 text-sm">{coinNames[coin]}</div>
                <div className="mt-4 flex items-center text-sm text-gray-400 group-hover:text-teal-400 transition-colors">
                  <span>View details</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
          <h3 className="text-xl font-medium text-white mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <div className="text-gray-400 text-sm mb-1">Total Assets</div>
              <div className="text-white text-xl font-medium">9</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">This Month</div>
              <div className="text-teal-400 text-xl font-medium">+$3,742.12</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">APY (Avg)</div>
              <div className="text-white text-xl font-medium">
                {activeTab === 'flexible' ? '10.6%' : '14.8%'}
              </div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Est. Yearly</div>
              <div className="text-white text-xl font-medium">$48,200</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
