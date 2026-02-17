'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { getMultiplePrices } from '@/lib/prices'
import { getUserTransactions } from '@/lib/transactions'

export default function DashboardPage() {
  const { user, userData } = useAuth()
  const [activeTab, setActiveTab] = useState<'flexible' | 'fixed'>('flexible')
  const [totalBalance, setTotalBalance] = useState(0)
  const [totalEarnings, setTotalEarnings] = useState(0)
  const [loadingBalances, setLoadingBalances] = useState(true)
  const [userTransactions, setUserTransactions] = useState<any[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(true)

  // Calculate total balances
  useEffect(() => {
    const calculateTotals = async () => {
      if (!userData?.balances) {
        setLoadingBalances(false)
        return
      }

      let flexibleTotal = 0
      let fixedTotal = 0
      let earningsTotal = 0

      Object.entries(userData.balances).forEach(([key, balance]: [string, any]) => {
        const [coin, savingsType] = key.split('_')
        
        if (savingsType === 'flexible') {
          flexibleTotal += balance.usdValue || 0
        } else {
          fixedTotal += balance.usdValue || 0
        }
        
        earningsTotal += balance.totalEarned || 0
      })

      setTotalBalance(flexibleTotal + fixedTotal)
      setTotalEarnings(earningsTotal)
      setLoadingBalances(false)
    }

    calculateTotals()
  }, [userData])

  // Load user transactions
  useEffect(() => {
    const loadTransactions = async () => {
      if (!user) return
      
      setLoadingTransactions(true)
      const result = await getUserTransactions(user.uid)
      if (result.success) {
        // Get most recent 10 transactions
        setUserTransactions(result.transactions.slice(0, 10))
      }
      setLoadingTransactions(false)
    }
    
    loadTransactions()
  }, [user])

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
            <div className="text-3xl font-medium text-teal-400">
              {loadingBalances ? '...' : `+$${(totalBalance * 0.12 / 365).toFixed(2)}`}
            </div>
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

        {/* Recent Transactions */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-white">Recent Transactions</h3>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                userTransactions.filter(t => t.status === 'pending').length > 0
                  ? 'bg-yellow-500/20 text-yellow-400'
                  : 'bg-gray-700 text-gray-400'
              }`}>
                {userTransactions.filter(t => t.status === 'pending').length} Pending
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {loadingTransactions ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-teal-400 mb-2"></div>
                <p className="text-gray-400 text-sm">Loading transactions...</p>
              </div>
            ) : userTransactions.length === 0 ? (
              <div className="text-center py-8">
                <svg className="w-16 h-16 text-gray-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-400 mb-1">No transactions yet</p>
                <p className="text-gray-500 text-sm">Make your first deposit to get started</p>
              </div>
            ) : (
              userTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700 rounded-xl hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 relative flex-shrink-0">
                      <Image
                        src={coinLogos[tx.coin] || '/BTC.svg'}
                        alt={tx.coin}
                        width={40}
                        height={40}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="text-white font-medium capitalize">{tx.type}</div>
                        {tx.status === 'pending' && (
                          <span className="px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded-full">
                            Pending
                          </span>
                        )}
                        {tx.status === 'confirmed' && (
                          <span className="px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full">
                            Confirmed
                          </span>
                        )}
                        {tx.status === 'rejected' && (
                          <span className="px-2 py-0.5 bg-red-500/20 text-red-400 text-xs rounded-full">
                            Rejected
                          </span>
                        )}
                      </div>
                      <div className="text-gray-400 text-sm">
                        {new Date(tx.createdAt).toLocaleDateString()} at {new Date(tx.createdAt).toLocaleTimeString()}
                      </div>
                      <div className="text-gray-500 text-xs mt-1">
                        {tx.coin} • {tx.savingsType === 'flexible' ? 'Flexible' : 'Fixed-Term'}
                        {tx.network && ` • ${tx.network}`}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white text-lg font-medium">
                      ${tx.usdValue.toFixed(2)}
                    </div>
                    <div className="text-gray-400 text-sm">{tx.coin}</div>
                  </div>
                </div>
              ))
            )}
          </div>

          {userTransactions.length > 0 && (
            <div className="mt-4 text-center">
              <p className="text-gray-400 text-sm">
                Showing {userTransactions.length} most recent {userTransactions.length === 1 ? 'transaction' : 'transactions'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
