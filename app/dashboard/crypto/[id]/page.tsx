'use client'

import { useState } from 'react'
import { useParams, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

export default function CryptoDetailPage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const coinId = params.id as string
  const type = searchParams.get('type') || 'flexible'

  const [showDepositModal, setShowDepositModal] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [selectedNetwork, setSelectedNetwork] = useState<string>('trx')
  const [depositStep, setDepositStep] = useState(1)
  const [depositAmount, setDepositAmount] = useState('')
  const [trackingPhrase, setTrackingPhrase] = useState('')
  const [userPhraseInput, setUserPhraseInput] = useState('')

  const flexibleRates: { [key: string]: number } = {
    btc: 9,
    eth: 12.3,
    xrp: 9.3,
    bnb: 8,
    usdt: 16,
    trx: 8,
    usdc: 14.5,
    sol: 10,
    ltc: 7,
  }

  const fixedRates: { [key: string]: number } = {
    btc: 9.8,
    eth: 14.6,
    xrp: 10.3,
    bnb: 9.6,
    usdt: 26,
    trx: 12,
    usdc: 22.5,
    sol: 16,
    ltc: 13,
  }

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
    ltc: 'LTC1234567890abcdefghijklmnopqrstuv', // Placeholder
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
      const coinUpper = coinId.toUpperCase()
      // Format varies by coin type
      if (coinId === 'btc') {
        qrData = `bitcoin:${address}?amount=${amount}`
      } else if (coinId === 'eth' || coinId === 'bnb' || coinId === 'usdt' || coinId === 'usdc') {
        qrData = `ethereum:${address}?value=${amount}`
      } else if (coinId === 'xrp') {
        qrData = `ripple:${address}?amount=${amount}`
      } else {
        // Generic format for other coins
        qrData = `${coinId}:${address}?amount=${amount}`
      }
      
      // Add network info if available
      if (network) {
        qrData += `&network=${network.toUpperCase()}`
      }
    }
    
    return `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`
  }

  const rates = type === 'flexible' ? flexibleRates : fixedRates
  const rate = rates[coinId] || 0
  const coinName = coinNames[coinId] || coinId.toUpperCase()
  const coinLogo = coinLogos[coinId] || '/BTC.svg'
  const depositAddress = getDepositAddress()

  // Mock transaction data
  const transactions = [
    {
      id: 1,
      type: 'deposit',
      amount: '0.5',
      usdValue: '$45,500.00',
      date: '2026-02-10 14:32',
      status: 'completed',
    },
    {
      id: 2,
      type: 'interest',
      amount: '0.0012',
      usdValue: '$109.20',
      date: '2026-02-10 00:00',
      status: 'completed',
    },
    {
      id: 3,
      type: 'deposit',
      amount: '0.25',
      usdValue: '$22,750.00',
      date: '2026-02-08 09:15',
      status: 'completed',
    },
    {
      id: 4,
      type: 'interest',
      amount: '0.0006',
      usdValue: '$54.60',
      date: '2026-02-09 00:00',
      status: 'completed',
    },
  ]

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
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Dashboard
        </Link>

        {/* Crypto Header */}
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 relative">
                <Image src={coinLogo} alt={coinName} width={64} height={64} className="object-contain" />
              </div>
              <div>
                <h1 className="text-3xl font-medium text-white">{coinId.toUpperCase()}</h1>
                <p className="text-gray-400">{coinName}</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">{type === 'flexible' ? 'Flexible' : 'Fixed-Term'} APY</div>
              <div className="text-4xl font-medium text-teal-400">{rate}%</div>
            </div>
          </div>

          {/* Balance */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div>
              <div className="text-gray-400 text-sm mb-1">Your Balance</div>
              <div className="text-white text-2xl font-medium">0.75 {coinId.toUpperCase()}</div>
              <div className="text-gray-400 text-sm">$68,250.00</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Total Earned</div>
              <div className="text-teal-400 text-2xl font-medium">0.0018 {coinId.toUpperCase()}</div>
              <div className="text-gray-400 text-sm">$163.80</div>
            </div>
            <div>
              <div className="text-gray-400 text-sm mb-1">Est. Daily Interest</div>
              <div className="text-white text-2xl font-medium">0.0002 {coinId.toUpperCase()}</div>
              <div className="text-gray-400 text-sm">$18.20</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
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
              className="flex-1 bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-7a2 2 0 012-2h2m3-4H9a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-1m-1 4l-3 3m0 0l-3-3m3 3V3" />
              </svg>
              Withdraw
            </button>
            <button className="bg-gray-700 text-white p-3 rounded-lg font-semibold hover:bg-gray-600 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
        <div className="bg-gray-900/60 backdrop-blur-sm border border-gray-700 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-medium text-white">Transactions</h2>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:text-white transition-colors text-sm">
                All
              </button>
              <button className="px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:text-white transition-colors text-sm">
                Deposits
              </button>
              <button className="px-4 py-2 bg-gray-800/50 text-gray-400 rounded-lg hover:text-white transition-colors text-sm">
                Interest
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {transactions.map((tx) => (
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
                    <div className="text-gray-400 text-sm">{tx.date}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-white font-medium">
                    {tx.type === 'deposit' ? '+' : '+'}{tx.amount} {coinId.toUpperCase()}
                  </div>
                  <div className="text-gray-400 text-sm">{tx.usdValue}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Deposit Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-medium text-white">
                Deposit {coinId.toUpperCase()} 
                <span className="text-gray-500 text-base ml-2">
                  (Step {depositStep} of 3)
                </span>
              </h3>
              <button
                onClick={() => {
                  setShowDepositModal(false)
                  setDepositStep(1)
                  setDepositAmount('')
                  setUserPhraseInput('')
                }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Progress Indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  depositStep >= 1 ? 'bg-teal-400 text-primary' : 'bg-gray-700 text-gray-400'
                }`}>
                  1
                </div>
                <div className={`w-12 h-0.5 ${depositStep >= 2 ? 'bg-teal-400' : 'bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  depositStep >= 2 ? 'bg-teal-400 text-primary' : 'bg-gray-700 text-gray-400'
                }`}>
                  2
                </div>
                <div className={`w-12 h-0.5 ${depositStep >= 3 ? 'bg-teal-400' : 'bg-gray-700'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  depositStep >= 3 ? 'bg-teal-400 text-primary' : 'bg-gray-700 text-gray-400'
                }`}>
                  3
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Step 1: Enter Amount */}
              {depositStep === 1 && (
                <>
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-medium text-white mb-1">Enter Deposit Amount</h4>
                    <p className="text-sm text-gray-400">Minimum deposit: $50 USD</p>
                  </div>

                  {/* Network Selection for USDT/USDC */}
                  {hasMultipleNetworks() && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Select Network</label>
                      <div className="flex gap-2">
                        {getAvailableNetworks().map((network) => (
                          <button
                            key={network}
                            onClick={() => {
                              setSelectedNetwork(network)
                            }}
                            className={`flex-1 px-4 py-3 rounded-lg font-medium transition-all uppercase ${
                              selectedNetwork === network
                                ? 'bg-teal-400 text-primary'
                                : 'bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700'
                            }`}
                          >
                            {network}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Amount (USD)</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">$</span>
                      <input
                        type="number"
                        value={depositAmount}
                        onChange={(e) => setDepositAmount(e.target.value)}
                        placeholder="50.00"
                        min="50"
                        step="0.01"
                        className="w-full pl-8 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all text-lg"
                      />
                    </div>
                    {depositAmount && parseFloat(depositAmount) < 50 && (
                      <p className="text-red-400 text-sm mt-2">Minimum deposit amount is $50 USD</p>
                    )}
                  </div>

                  <div className="bg-teal-400/10 border border-teal-400/20 rounded-lg p-4">
                    <div className="flex gap-2">
                      <svg className="w-5 h-5 text-teal-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="text-sm text-teal-400">
                        Your deposit will start earning {rate}% APY immediately after confirmation on the blockchain.
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      if (depositAmount && parseFloat(depositAmount) >= 50) {
                        setDepositStep(2)
                      }
                    }}
                    disabled={!depositAmount || parseFloat(depositAmount) < 50}
                    className="w-full bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue to QR Code
                  </button>
                </>
              )}

              {/* Step 2: QR Code Display */}
              {depositStep === 2 && (
                <>
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-medium text-white mb-1">Scan QR Code to Deposit</h4>
                    <p className="text-sm text-gray-400">
                      Amount: ${depositAmount} USD {hasMultipleNetworks() && `• Network: ${selectedNetwork.toUpperCase()}`}
                    </p>
                  </div>

                  {/* Warning Box */}
                  <div className="bg-gray-800/50 border border-gray-600 rounded-lg p-4">
                    <div className="flex gap-3">
                      <svg className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <div>
                        <p className="text-sm text-gray-300">
                          {hasMultipleNetworks() 
                            ? `Only send ${coinId.toUpperCase()} via the ${selectedNetwork.toUpperCase()} network to this address. Sending via wrong network will result in permanent loss of funds.`
                            : `Only send ${coinId.toUpperCase()} to this address. Sending other cryptocurrencies will result in permanent loss of funds.`
                          }
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* QR Code Display */}
                  <div className="bg-white rounded-lg p-6 text-center">
                    <div className="mb-4">
                      <img
                        src={getQRCodeUrl(depositAddress, depositAmount, hasMultipleNetworks() ? selectedNetwork : undefined)}
                        alt="Deposit QR Code"
                        width="250"
                        height="250"
                        className="mx-auto"
                      />
                    </div>
                    <div className="text-gray-600 text-xs font-mono break-all mb-3">{depositAddress}</div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(depositAddress)
                      }}
                      className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors font-medium"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        />
                      </svg>
                      Copy Address
                    </button>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setDepositStep(1)}
                      className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setDepositStep(3)}
                      className="flex-1 bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all"
                    >
                      I've Sent the Deposit
                    </button>
                  </div>
                </>
              )}

              {/* Step 3: Tracking Phrase Verification */}
              {depositStep === 3 && (
                <>
                  <div className="text-center mb-4">
                    <h4 className="text-lg font-medium text-white mb-1">Verify Your Transaction</h4>
                    <p className="text-sm text-gray-400">Enter the tracking phrase to confirm your deposit</p>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6">
                    <div className="text-sm text-gray-400 mb-2">Your tracking phrase (case sensitive):</div>
                    <div className="bg-teal-400/10 border border-teal-400/30 rounded-lg p-4 mb-4">
                      <div className="font-mono text-teal-400 text-lg text-center tracking-wide">
                        {trackingPhrase}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 text-center">
                      Copy this phrase exactly as shown. It will be used to track your transaction.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Enter Tracking Phrase</label>
                    <input
                      type="text"
                      value={userPhraseInput}
                      onChange={(e) => setUserPhraseInput(e.target.value)}
                      placeholder="Type the phrase exactly..."
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all font-mono"
                    />
                    {userPhraseInput && userPhraseInput !== trackingPhrase && (
                      <p className="text-red-400 text-sm mt-2">Phrase does not match. Please check spelling and case.</p>
                    )}
                    {userPhraseInput && userPhraseInput === trackingPhrase && (
                      <p className="text-teal-400 text-sm mt-2 flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Phrase verified!
                      </p>
                    )}
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                    <p className="text-sm text-blue-400">
                      Once you submit, your deposit will be tracked and processed. You'll receive a confirmation once it's verified on the blockchain.
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setDepositStep(2)}
                      className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => {
                        // TODO: Firebase submission will go here
                        alert(`Deposit submitted!\nAmount: $${depositAmount}\nCoin: ${coinId.toUpperCase()}\nNetwork: ${hasMultipleNetworks() ? selectedNetwork.toUpperCase() : 'N/A'}\nTracking: ${trackingPhrase}`)
                        setShowDepositModal(false)
                      }}
                      disabled={userPhraseInput !== trackingPhrase}
                      className="flex-1 bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Deposit Sent
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
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-8 max-w-md w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-medium text-white">Withdraw {coinId.toUpperCase()}</h3>
              <button
                onClick={() => setShowWithdrawModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
