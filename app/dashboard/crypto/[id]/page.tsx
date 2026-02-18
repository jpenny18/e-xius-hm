'use client'

import { useState, useEffect, useMemo } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { createDepositTransaction, getUserTransactions } from '@/lib/transactions'
import { sendDepositPendingEmail, sendAdminDepositNotification } from '@/lib/email'
import { usdToCrypto, formatCryptoAmount, getCryptoPrice } from '@/lib/prices'
import { getAPY } from '@/lib/interest'

export default function CryptoDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const coinId = params.id as string
  // URL sends 'flexible' or 'fixed'; normalise to the canonical savings type
  const rawType = searchParams.get('type') || 'flexible'
  const savingsType: 'flexible' | 'fixed-term' = rawType === 'flexible' ? 'flexible' : 'fixed-term'
  // Keep 'type' as the raw URL value so balance keys remain consistent with stored data
  const type = rawType
  const { user, userData } = useAuth()

  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<string>('trx')
  const [depositStep, setDepositStep] = useState(1)
  const [depositAmount, setDepositAmount] = useState('')
  const [cryptoAmount, setCryptoAmount] = useState(0)
  const [trackingPhrase, setTrackingPhrase] = useState('')
  const [userPhraseInput, setUserPhraseInput] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [loadingPrice, setLoadingPrice] = useState(false)
  const [userTransactions, setUserTransactions] = useState<any[]>([])
  const [loadingTransactions, setLoadingTransactions] = useState(true)

  const coinLogos: { [key: string]: string } = {
    btc: '/BTC.svg',
    eth: '/ETH.svg',
    xrp: '/XRP.svg',
    bnb: '/BNB.svg',
    usdt: '/USDT.svg',
    trx: '/TRX.svg',
    usdc: '/USDC.svg',
    sol: '/SOL.svg',
    ltc: '/ltc.png',
  }

  const coinNames: { [key: string]: string } = {
    btc: 'Bitcoin',
    eth: 'Ethereum',
    xrp: 'Ripple',
    bnb: 'Binance Coin',
    usdt: 'Tether',
    trx: 'Tron',
    usdc: 'USD Coin',
    sol: 'Solana',
    ltc: 'Litecoin',
  }

  // Wallet addresses
  const walletAddresses: { [key: string]: string | { [network: string]: string } } = {
    btc: 'bc1qsf2q5d75hn6ctel74jfxp8l4vlehmt0pgupk65',
    eth: '0x84Eb11591dc00fE6aA4793f91B709f0a370d8c2b',
    bnb: '0x84Eb11591dc00fE6aA4793f91B709f0a370d8c2b',
    trx: 'TMtJ4FvSxVTKQdRA5JjKXFUGbTMxVKuqVv',
    sol: '7sqqjduEXcUiT7q7g2A7Vj4RE8Leie9LXGrEEJ6g13C6',
    xrp: 'rpcaghtzYgG17BSzHSMWEWzCHEbQfHFm1B',
    ltc: 'ltc1qjzvv6mczt2wf6h7mhm6m22m975wxwecrpmc5zw',
    usdt: {
      trx: 'TMtJ4FvSxVTKQdRA5JjKXFUGbTMxVKuqVv',
      eth: '0x84Eb11591dc00fE6aA4793f91B709f0a370d8c2b',
      sol: '7sqqjduEXcUiT7q7g2A7Vj4RE8Leie9LXGrEEJ6g13C6',
    },
    usdc: {
      eth: '0x84Eb11591dc00fE6aA4793f91B709f0a370d8c2b',
      sol: '7sqqjduEXcUiT7q7g2A7Vj4RE8Leie9LXGrEEJ6g13C6',
    },
  }

  // Get deposit address based on coin and network
  const getDepositAddress = () => {
    const walletData = walletAddresses[coinId]
    if (typeof walletData === 'string') {
      return walletData
    } else if (walletData && typeof walletData === 'object') {
      return walletData[selectedNetwork] || Object.values(walletData)[0]
    }
    return ''
  }

  // Check if coin has multiple networks
  const hasMultipleNetworks = () => {
    const walletData = walletAddresses[coinId]
    return walletData && typeof walletData === 'object'
  }

  // Get available networks for coin
  const getAvailableNetworks = () => {
    const walletData = walletAddresses[coinId]
    if (walletData && typeof walletData === 'object') {
      return Object.keys(walletData)
    }
    return []
  }

  // Generate random 5-word phrase for tracking
  const generateTrackingPhrase = () => {
    const words = [
      'alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'golf', 'hotel',
      'india', 'juliet', 'kilo', 'lima', 'mike', 'november', 'oscar', 'papa',
      'quebec', 'romeo', 'sierra', 'tango', 'uniform', 'victor', 'whiskey', 'xray',
      'yankee', 'zulu', 'phoenix', 'dragon', 'tiger', 'eagle', 'falcon', 'hawk',
      'raven', 'wolf', 'bear', 'lion', 'panther', 'cobra', 'viper', 'shark'
    ]
    const selectedWords = []
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * words.length)
      selectedWords.push(words[randomIndex])
    }
    return selectedWords.join(' ')
  }

  // Generate QR code URL with amount and network info
  const getQRCodeUrl = (address: string, amount?: string, network?: string) => {
    let qrData = address
    
    // For crypto URIs with amount
    if (amount && parseFloat(amount) > 0) {
      // Handle multi-network tokens (USDT, USDC) based on selected network
      if ((coinId === 'usdt' || coinId === 'usdc') && network) {
        if (network === 'eth') {
          // Ethereum network - use ERC20 format
          qrData = `ethereum:${address}?value=${amount}`
        } else if (network === 'trx') {
          // Tron network - use TRC20 format
          qrData = `tron:${address}?amount=${amount}`
        } else if (network === 'sol') {
          // Solana network
          qrData = `solana:${address}?amount=${amount}`
        }
      } 
      // Handle single-network tokens
      else if (coinId === 'btc') {
        qrData = `bitcoin:${address}?amount=${amount}`
      } else if (coinId === 'eth') {
        qrData = `ethereum:${address}?value=${amount}`
      } else if (coinId === 'bnb') {
        qrData = `bnb:${address}?amount=${amount}`
      } else if (coinId === 'xrp') {
        qrData = `ripple:${address}?amount=${amount}`
      } else if (coinId === 'trx') {
        qrData = `tron:${address}?amount=${amount}`
      } else if (coinId === 'sol') {
        qrData = `solana:${address}?amount=${amount}`
      } else if (coinId === 'ltc') {
        qrData = `litecoin:${address}?amount=${amount}`
      } else {
        // Fallback for any other coins
        qrData = `${coinId}:${address}?amount=${amount}`
      }
    }
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`
  }

  // Single source of truth — reads from lib/interest.ts so rates can never drift
  const rate = getAPY(coinId, savingsType)
  const coinName = coinNames[coinId] || coinId.toUpperCase()
  const coinLogo = coinLogos[coinId] || '/BTC.svg'
  const depositAddress = getDepositAddress()

  // Balance key matches what confirmTransaction stores: `COIN_flexible` or `COIN_fixed`
  const balanceKey = `${coinId.toUpperCase()}_${type}`

  // Memoised so it only recomputes when userData or the URL params change
  const userBalance = useMemo(() => {
    const empty = { amount: 0, usdValue: 0, totalEarned: 0, startDate: '' }
    if (!userData?.balances) return empty
    return (userData.balances[balanceKey] as typeof empty) || empty
  }, [userData, balanceKey])

  // Derived calculations — guaranteed to use the canonical APR from lib/interest.ts
  const estDailyInterest = userBalance.usdValue * (rate / 100 / 365)

  // Load user transactions
  useEffect(() => {
    const loadTransactions = async () => {
      if (!user) return
      
      setLoadingTransactions(true)
      const result = await getUserTransactions(user.uid)
      if (result.success) {
        // Filter transactions for this coin
        const coinTransactions = result.transactions.filter(
          (t: any) => t.coin.toLowerCase() === coinId.toLowerCase()
        )
        setUserTransactions(coinTransactions)
      }
      setLoadingTransactions(false)
    }
    
    loadTransactions()
  }, [user, coinId])

  // Calculate crypto amount when USD amount changes
  useEffect(() => {
    const calculateCryptoAmount = async () => {
      if (!depositAmount || parseFloat(depositAmount) <= 0) {
        setCryptoAmount(0)
        return
      }
      
      setLoadingPrice(true)
      try {
        const amount = await usdToCrypto(parseFloat(depositAmount), coinId)
        setCryptoAmount(amount)
      } catch (error) {
        console.error('Error calculating crypto amount:', error)
      } finally {
        setLoadingPrice(false)
      }
    }
    
    calculateCryptoAmount()
  }, [depositAmount, coinId])

  return (
    <div className="min-h-screen p-4 md:p-8">
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
            <linearGradient id="cryptoGradient" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
          </defs>
          <path
            d="M 0,1080 Q 400,800 800,600 Q 1200,400 1600,200 Q 1760,100 1920,0 L 1920,1080 L 0,1080 Z"
            fill="url(#cryptoGradient)"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4 md:mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Crypto Header */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-8 mb-4 md:mb-8">
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div className="flex items-center gap-3 md:gap-4">
              <div className="w-12 h-12 md:w-16 md:h-16 relative flex-shrink-0">
                <Image src={coinLogo} alt={coinName} width={64} height={64} className="object-contain w-full h-full" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-medium text-white">{coinId.toUpperCase()}</h1>
                <p className="text-gray-400 text-sm md:text-base">{coinName}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-xs md:text-sm text-gray-400 mb-0.5">{type === 'flexible' ? 'Flexible' : 'Fixed-Term'} APY</div>
              <div className="text-3xl md:text-4xl font-medium text-teal-400">{rate}%</div>
            </div>
          </div>

          {/* Balance */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-4 md:mb-6">
            <div className="bg-gray-800/30 rounded-xl p-3 md:p-0 md:bg-transparent">
              <div className="text-gray-400 text-xs md:text-sm mb-1">Your Balance</div>
              <div className="text-white text-xl md:text-2xl font-medium">
                {userBalance.amount > 0 ? formatCryptoAmount(userBalance.amount, coinId) : '0'} {coinId.toUpperCase()}
              </div>
              <div className="text-gray-400 text-sm">
                ${userBalance.usdValue.toFixed(2)}
              </div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-3 md:p-0 md:bg-transparent">
              <div className="text-gray-400 text-xs md:text-sm mb-1">Total Earned</div>
              <div className="text-teal-400 text-xl md:text-2xl font-medium">
                +${(userBalance.totalEarned || 0).toFixed(2)}
              </div>
              <div className="text-gray-400 text-sm">Compounded daily</div>
            </div>
            <div className="bg-gray-800/30 rounded-xl p-3 md:p-0 md:bg-transparent">
              <div className="text-gray-400 text-xs md:text-sm mb-1">Est. Daily Interest</div>
              <div className="text-white text-xl md:text-2xl font-medium">
                +${estDailyInterest.toFixed(4)}
              </div>
              <div className="text-gray-400 text-sm">Per day at {rate}% APR</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 md:gap-4">
            <button
              onClick={() => {
                setShowDepositModal(true)
                setDepositStep(1)
                setDepositAmount('')
                setUserPhraseInput('')
                setTrackingPhrase(generateTrackingPhrase())
                if (hasMultipleNetworks()) {
                  setSelectedNetwork(getAvailableNetworks()[0])
                }
              }}
              className="flex-1 bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all flex items-center justify-center gap-2 text-sm md:text-base active:scale-95"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Deposit
            </button>
            <button
              onClick={() => setShowWithdrawModal(true)}
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all flex items-center justify-center gap-2 text-sm md:text-base active:scale-95"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
              </svg>
              Withdraw
            </button>
            <button className="bg-gray-700 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition-all active:scale-95 flex-shrink-0">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Transactions */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-4 md:p-6">
          <div className="flex items-center justify-between mb-4 md:mb-6 gap-3">
            <h2 className="text-xl md:text-2xl font-medium text-white">Transactions</h2>
            <div className="flex gap-1.5 md:gap-2">
              <button className="px-2.5 md:px-4 py-1.5 md:py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:text-white transition-colors text-xs md:text-sm">
                All
              </button>
              <button className="px-2.5 md:px-4 py-1.5 md:py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:text-white transition-colors text-xs md:text-sm">
                Deposits
              </button>
              <button className="px-2.5 md:px-4 py-1.5 md:py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:text-white transition-colors text-xs md:text-sm">
                Interest
              </button>
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
                <p className="text-gray-400">No transactions yet</p>
                <p className="text-gray-500 text-sm mt-1">Make your first deposit to get started</p>
              </div>
            ) : (
              userTransactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex items-center justify-between p-4 bg-gray-800/30 border border-gray-700 rounded-lg hover:border-gray-600 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        tx.type === 'deposit'
                          ? 'bg-teal-400/10 text-teal-400'
                          : 'bg-blue-400/10 text-blue-400'
                      }`}
                    >
                      {tx.type === 'deposit' ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                          />
                        </svg>
                      )}
                    </div>
                    <div>
                      <div className="text-white font-medium capitalize">{tx.type}</div>
                      <div className="text-gray-400 text-sm">{new Date(tx.createdAt).toLocaleString()}</div>
                      {tx.status === 'pending' && (
                        <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                          Pending Confirmation
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-white font-medium">
                      ${tx.usdValue.toFixed(2)}
                    </div>
                    <div className="text-gray-400 text-sm">{tx.coin}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-[#111827] border border-gray-700/80 rounded-t-2xl sm:rounded-2xl w-full sm:max-w-md max-h-[92vh] overflow-y-auto shadow-2xl">

            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 relative flex-shrink-0">
                  <Image src={coinLogo} alt={coinName} width={32} height={32} className="object-contain w-full h-full" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white leading-none">Deposit {coinId.toUpperCase()}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{type === 'flexible' ? 'Flexible' : 'Fixed-Term'} • {rate}% APY</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowDepositModal(false)
                  setDepositStep(1)
                  setDepositAmount('')
                  setUserPhraseInput('')
                }}
                className="p-1.5 text-gray-500 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center px-5 py-3 border-b border-gray-800/60">
              <div className={`flex items-center gap-2 ${depositStep === 1 ? 'text-teal-400' : 'text-teal-400/60'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${depositStep >= 1 ? 'bg-teal-400 text-primary' : 'bg-gray-700 text-gray-400'}`}>
                  {depositStep > 1 ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : '1'}
                </div>
                <span className="text-xs font-medium">Amount</span>
              </div>
              <div className={`flex-1 mx-3 h-px ${depositStep >= 2 ? 'bg-teal-400' : 'bg-gray-700'}`} />
              <div className={`flex items-center gap-2 ${depositStep === 2 ? 'text-teal-400' : 'text-gray-500'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${depositStep >= 2 ? 'bg-teal-400 text-primary' : 'bg-gray-700 text-gray-400'}`}>
                  2
                </div>
                <span className="text-xs font-medium">Send & Confirm</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              {/* ── STEP 1: Enter Amount ── */}
              {depositStep === 1 && (
                <>
                  {/* Network Selection for USDT/USDC */}
                  {hasMultipleNetworks() && (
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Network</label>
                      <div className="flex gap-2">
                        {getAvailableNetworks().map((network) => (
                          <button
                            key={network}
                            onClick={() => setSelectedNetwork(network)}
                            className={`flex-1 px-3 py-2.5 rounded-lg font-semibold transition-all uppercase text-sm ${
                              selectedNetwork === network
                                ? 'bg-teal-400 text-primary'
                                : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
                            }`}
                          >
                            {network}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-medium text-gray-400 mb-2 uppercase tracking-wide">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="50.00"
                        min="50"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3.5 bg-gray-800/70 border border-gray-700 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-lg font-medium"
                      />
                    </div>
                    {depositAmount && parseFloat(depositAmount) < 50 ? (
                      <p className="text-red-400 text-xs mt-2">Minimum deposit is $50 USD</p>
                    ) : (
                      <p className="text-gray-600 text-xs mt-2">Minimum deposit: $50 USD</p>
                    )}
                  </div>

                  <div className="flex items-start gap-2.5 bg-teal-400/8 border border-teal-400/20 rounded-xl p-3.5">
                    <svg className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <p className="text-xs text-teal-400/90 leading-relaxed">
                      Starts earning <span className="font-semibold text-teal-400">{rate}% APY</span> immediately after blockchain confirmation.
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      if (depositAmount && parseFloat(depositAmount) >= 50) {
                        setDepositStep(2)
                      }
                    }}
                    disabled={!depositAmount || parseFloat(depositAmount) < 50}
                    className="w-full bg-teal-400 text-primary py-3.5 rounded-xl font-semibold hover:bg-teal-300 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed text-sm"
                  >
                    Continue →
                  </button>
                </>
              )}

              {/* ── STEP 2: Send & Confirm ── */}
              {depositStep === 2 && (
                <>
                  {/* Network warning banner */}
                  <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/25 rounded-xl px-3.5 py-2.5">
                    <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p className="text-xs text-amber-300 leading-snug">
                      {hasMultipleNetworks()
                        ? `Send ${coinId.toUpperCase()} via ${selectedNetwork.toUpperCase()} network only. Wrong network = lost funds.`
                        : `Only send ${coinId.toUpperCase()} to this address. Other assets will be lost.`
                      }
                    </p>
                  </div>

                  {/* Amount to send */}
                  <div className="bg-gray-800/60 border border-gray-700/60 rounded-xl p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-gray-500 mb-1">Send exactly</p>
                        <p className="text-xl font-bold text-white">
                          {loadingPrice ? (
                            <span className="text-gray-500">Calculating...</span>
                          ) : (
                            <>{formatCryptoAmount(cryptoAmount, coinId)} <span className="text-teal-400">{coinId.toUpperCase()}</span></>
                          )}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500 mb-1">Value</p>
                        <p className="text-white font-semibold">${depositAmount} USD</p>
                        {hasMultipleNetworks() && (
                          <span className="text-xs text-teal-400 font-medium">{selectedNetwork.toUpperCase()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* QR Code + Address — compact side-by-side on sm, stacked on xs */}
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                      {/* QR */}
                      <div className="flex-shrink-0">
                        <img
                          src={getQRCodeUrl(depositAddress, formatCryptoAmount(cryptoAmount, coinId), hasMultipleNetworks() ? selectedNetwork : undefined)}
                          alt="Deposit QR Code"
                          width="140"
                          height="140"
                          className="rounded-lg"
                        />
                      </div>
                      {/* Address */}
                      <div className="flex-1 min-w-0 text-center sm:text-left">
                        <p className="text-gray-500 text-xs mb-2 font-medium">Deposit Address</p>
                        <p className="font-mono text-gray-800 text-xs break-all leading-relaxed mb-3">{depositAddress}</p>
                        <button
                          onClick={() => navigator.clipboard.writeText(depositAddress)}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors px-3 py-1.5 rounded-lg"
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy Address
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Tracking phrase — display + confirmation input combined */}
                  <div className="border border-gray-700/80 rounded-xl overflow-hidden">
                    <div className="bg-gray-800/50 px-4 py-3 border-b border-gray-700/60">
                      <div className="flex items-center justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-xs text-gray-400 mb-1 font-medium">Your tracking phrase</p>
                          <p className="font-mono text-teal-400 text-sm font-semibold leading-relaxed break-words">{trackingPhrase}</p>
                        </div>
                        <button
                          onClick={() => navigator.clipboard.writeText(trackingPhrase)}
                          className="flex-shrink-0 p-2 text-gray-500 hover:text-teal-400 hover:bg-gray-700/60 rounded-lg transition-colors"
                          title="Copy phrase"
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className="bg-gray-900/40 px-4 py-3">
                      <p className="text-xs text-gray-500 mb-2">Once sent, type the phrase above to confirm:</p>
                      <input
                        type="text"
                        value={userPhraseInput}
                        onChange={(e) => setUserPhraseInput(e.target.value)}
                        placeholder="Type phrase to unlock submission..."
                        className={`w-full px-3 py-2.5 bg-gray-800/80 border rounded-lg text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-2 focus:border-transparent transition-all font-mono ${
                          userPhraseInput && userPhraseInput === trackingPhrase
                            ? 'border-teal-500 focus:ring-teal-400'
                            : userPhraseInput
                            ? 'border-red-500/60 focus:ring-red-400'
                            : 'border-gray-700 focus:ring-teal-400'
                        }`}
                      />
                      {userPhraseInput && userPhraseInput !== trackingPhrase && (
                        <p className="text-red-400 text-xs mt-1.5">Phrase doesn't match — check spacing and case.</p>
                      )}
                      {userPhraseInput && userPhraseInput === trackingPhrase && (
                        <p className="text-teal-400 text-xs mt-1.5 flex items-center gap-1 font-medium">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                          Confirmed — ready to submit
                        </p>
                      )}
                    </div>
                  </div>

                  {submitError && (
                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 rounded-xl p-3.5">
                      <svg className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-sm text-red-400">{submitError}</p>
                    </div>
                  )}

                  <div className="flex gap-3 pt-1">
                    <button
                      onClick={() => setDepositStep(1)}
                      className="flex-shrink-0 px-5 py-3 bg-gray-800 text-gray-300 hover:text-white rounded-xl font-semibold hover:bg-gray-700 active:scale-[0.98] transition-all text-sm"
                    >
                      ← Back
                    </button>
                    <button
                      onClick={async () => {
                        if (!user || !userData) {
                          setSubmitError('User not authenticated')
                          return
                        }

                        setSubmitting(true)
                        setSubmitError('')

                        try {
                          const userName = `${userData.firstName} ${userData.lastName}`

                          const result = await createDepositTransaction(
                            user.uid,
                            user.email || '',
                            coinId,
                            hasMultipleNetworks() ? selectedNetwork : undefined,
                            cryptoAmount,
                            parseFloat(depositAmount),
                            trackingPhrase,
                            depositAddress,
                            type as 'flexible' | 'fixed-term',
                            userName
                          )

                          if (result.success) {
                            
                            await sendDepositPendingEmail(
                              user.email || '',
                              userName,
                              coinId.toUpperCase(),
                              parseFloat(depositAmount),
                              trackingPhrase
                            )

                            const adminEmails = process.env.NEXT_PUBLIC_ADMIN_EMAILS?.split(',') || []
                            await sendAdminDepositNotification(
                              adminEmails,
                              user.email || '',
                              coinId.toUpperCase(),
                              parseFloat(depositAmount),
                              parseFloat(depositAmount),
                              trackingPhrase,
                              result.transactionId || ''
                            )

                            alert('Deposit submitted successfully! You will receive an email confirmation shortly.')
                            setShowDepositModal(false)
                            setDepositStep(1)
                            setDepositAmount('')
                            setUserPhraseInput('')
                            setCryptoAmount(0)
                            const txResult = await getUserTransactions(user.uid)
                            if (txResult.success) {
                              const coinTransactions = txResult.transactions.filter(
                                (t: any) => t.coin.toLowerCase() === coinId.toLowerCase()
                              )
                              setUserTransactions(coinTransactions)
                            }
                          } else {
                            setSubmitError(result.error || 'Failed to submit deposit')
                          }
                        } catch (error: any) {
                          setSubmitError(error.message || 'An error occurred')
                        } finally {
                          setSubmitting(false)
                        }
                      }}
                      disabled={userPhraseInput !== trackingPhrase || submitting}
                      className="flex-1 bg-teal-400 text-primary py-3 rounded-xl font-semibold hover:bg-teal-300 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary/30 border-t-primary"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Deposit Sent
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-t-2xl sm:rounded-2xl p-5 sm:p-8 w-full sm:max-w-md">
            <div className="flex items-center justify-between mb-5 md:mb-6">
              <h3 className="text-xl md:text-2xl font-medium text-white">Withdraw {coinId.toUpperCase()}</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800/50 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Amount</label>
                <input
                  type="number"
                  placeholder="0.00"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
                <div className="text-sm text-gray-400 mt-2">Available: 0.75 {coinId.toUpperCase()}</div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Withdrawal Address</label>
                <input
                  type="text"
                  placeholder="Enter address"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                />
              </div>

              <div className="bg-yellow-400/10 border border-yellow-400/20 rounded-lg p-4">
                <p className="text-sm text-yellow-400">
                  Withdrawals may take up to 24 hours to process. You will stop earning interest on withdrawn
                  funds.
                </p>
              </div>

              <button className="w-full bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all">
                Withdraw
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
