'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login')
  const [accountType, setAccountType] = useState<'personal' | 'corporate'>('personal')
  const [signupStep, setSignupStep] = useState(1)
  const [formData, setFormData] = useState({
    email: '',
    referralCode: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleNextStep = () => {
    setSignupStep(prev => Math.min(prev + 1, 4))
  }

  const handlePrevStep = () => {
    setSignupStep(prev => Math.max(prev - 1, 1))
  }

  const resetSignupFlow = () => {
    setSignupStep(1)
    setAccountType('personal')
    setFormData({
      email: '',
      referralCode: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    })
  }

  const handleTabChange = (tab: 'login' | 'signup') => {
    setActiveTab(tab)
    if (tab === 'login') {
      resetSignupFlow()
    }
  }

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
            <linearGradient id="loginCurvedLine" x1="0" y1="1080" x2="1920" y2="0" gradientUnits="userSpaceOnUse">
              <stop stopColor="#2dd4bf" stopOpacity="0.3" />
              <stop offset="1" stopColor="#14b8a6" stopOpacity="0.5" />
            </linearGradient>
            <linearGradient id="loginFadeGradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="70%" stopColor="white" stopOpacity="0" />
            </linearGradient>
            <mask id="loginFadeMask">
              <rect x="0" y="0" width="1920" height="1080" fill="url(#loginFadeGradient)" />
            </mask>
          </defs>
          <g mask="url(#loginFadeMask)">
            <path
              d="
                M 0,1080
                Q 400,800 800,600
                Q 1200,400 1600,200
                Q 1760,100 1920,0
                L 1920,1080 L 0,1080 Z"
              fill="url(#loginCurvedLine)"
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
            <Link
              href="/"
              className="text-gray-300 hover:text-white transition-colors font-medium"
            >
              Back to Home
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
              <h1 className="text-3xl font-medium text-white mb-2">
                Welcome to Exius
              </h1>
              <p className="text-gray-400">
                {activeTab === 'login' 
                  ? 'Sign in to access your account' 
                  : 'Create an account to get started'}
              </p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 mb-8 bg-gray-800/50 p-1 rounded-lg">
              <button
                onClick={() => handleTabChange('login')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'login'
                    ? 'bg-teal-400 text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => handleTabChange('signup')}
                className={`flex-1 py-3 rounded-lg font-semibold transition-all ${
                  activeTab === 'signup'
                    ? 'bg-teal-400 text-primary'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Account Type Selection - Only for Signup */}
            {activeTab === 'signup' && (
              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  Account Type
                </label>
                <div className="flex gap-2 bg-gray-800/50 p-1 rounded-lg">
                  <button
                    onClick={() => setAccountType('personal')}
                    className={`flex-1 py-2.5 rounded-lg font-medium transition-all text-sm ${
                      accountType === 'personal'
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Personal
                  </button>
                  <button
                    onClick={() => setAccountType('corporate')}
                    className={`flex-1 py-2.5 rounded-lg font-medium transition-all text-sm ${
                      accountType === 'corporate'
                        ? 'bg-gray-700 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    Corporate
                  </button>
                </div>
              </div>
            )}

            {/* Login Form */}
            {activeTab === 'login' && (
              <form className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
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
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-gray-700 bg-gray-800/50 text-teal-400 focus:ring-teal-400 focus:ring-offset-0"
                    />
                    <span className="ml-2 text-sm text-gray-400">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-teal-400 hover:text-teal-300 transition-colors">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all"
                >
                  Sign In
                </button>
              </form>
            )}

            {/* Signup Form - Multi-Step */}
            {activeTab === 'signup' && (
              <div className="space-y-6">
                {/* Progress Indicator */}
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center flex-1">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                          step < signupStep
                            ? 'bg-teal-400 text-primary'
                            : step === signupStep
                            ? 'bg-teal-400 text-primary'
                            : 'bg-gray-700 text-gray-400'
                        }`}
                      >
                        {step}
                      </div>
                      {step < 4 && (
                        <div
                          className={`h-1 flex-1 mx-2 rounded transition-all ${
                            step < signupStep ? 'bg-teal-400' : 'bg-gray-700'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>

                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  {/* Step 1: Email */}
                  {signupStep === 1 && (
                    <>
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-medium text-white mb-2">Enter your email</h3>
                        <p className="text-sm text-gray-400">
                          We'll use this to create your {accountType} account
                        </p>
                      </div>
                      <div>
                        <label htmlFor="signupEmail" className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address
                        </label>
                        <input
                          id="signupEmail"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="referralCode" className="block text-sm font-medium text-gray-300 mb-2">
                          Referral Code <span className="text-gray-500 font-normal">(Optional)</span>
                        </label>
                        <input
                          id="referralCode"
                          name="referralCode"
                          type="text"
                          value={formData.referralCode}
                          onChange={handleInputChange}
                          placeholder="Enter referral code"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                        />
                        <p className="text-gray-400 text-xs mt-2 flex items-center gap-1">
                          <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                            />
                          </svg>
                          Both you and your referrer will earn bonus rewards
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={handleNextStep}
                        className="w-full bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all"
                      >
                        Continue
                      </button>
                    </>
                  )}

                  {/* Step 2: Name */}
                  {signupStep === 2 && (
                    <>
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-medium text-white mb-2">What's your name?</h3>
                        <p className="text-sm text-gray-400">
                          Let us know how to address you
                        </p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="firstName" className="block text-sm font-medium text-gray-300 mb-2">
                            First Name
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            value={formData.firstName}
                            onChange={handleInputChange}
                            placeholder="John"
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="lastName" className="block text-sm font-medium text-gray-300 mb-2">
                            Last Name
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            value={formData.lastName}
                            onChange={handleInputChange}
                            placeholder="Doe"
                            className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                            required
                          />
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex-1 bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all"
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  )}

                  {/* Step 3: Password */}
                  {signupStep === 3 && (
                    <>
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-medium text-white mb-2">Create a password</h3>
                        <p className="text-sm text-gray-400">
                          Must be at least 8 characters
                        </p>
                      </div>
                      <div>
                        <label htmlFor="signupPassword" className="block text-sm font-medium text-gray-300 mb-2">
                          Password
                        </label>
                        <input
                          id="signupPassword"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                          Confirm Password
                        </label>
                        <input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleInputChange}
                          placeholder="••••••••"
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-400 focus:border-transparent transition-all"
                          required
                        />
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleNextStep}
                          className="flex-1 bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all"
                        >
                          Continue
                        </button>
                      </div>
                    </>
                  )}

                  {/* Step 4: Terms & Submit */}
                  {signupStep === 4 && (
                    <>
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-medium text-white mb-2">Almost done!</h3>
                        <p className="text-sm text-gray-400">
                          Please review and accept our terms
                        </p>
                      </div>
                      <div className="bg-gray-800/30 border border-gray-700 rounded-lg p-4 mb-4">
                        <p className="text-sm text-gray-300 mb-2">
                          <strong>Account Summary:</strong>
                        </p>
                        <p className="text-sm text-gray-400">Email: {formData.email}</p>
                        <p className="text-sm text-gray-400">
                          Name: {formData.firstName} {formData.lastName}
                        </p>
                        <p className="text-sm text-gray-400">Account Type: {accountType}</p>
                        {formData.referralCode && (
                          <p className="text-sm text-teal-400 mt-2 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                              />
                            </svg>
                            Referral Code: {formData.referralCode}
                          </p>
                        )}
                      </div>
                      <div className="flex items-start">
                        <input
                          type="checkbox"
                          id="terms"
                          name="agreeToTerms"
                          checked={formData.agreeToTerms}
                          onChange={handleInputChange}
                          className="w-4 h-4 mt-1 rounded border-gray-700 bg-gray-800/50 text-teal-400 focus:ring-teal-400 focus:ring-offset-0"
                        />
                        <label htmlFor="terms" className="ml-2 text-sm text-gray-400">
                          I agree to the{' '}
                          <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">
                            Terms of Service
                          </a>{' '}
                          and{' '}
                          <a href="#" className="text-teal-400 hover:text-teal-300 transition-colors">
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={handlePrevStep}
                          className="flex-1 bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-all"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={!formData.agreeToTerms}
                          className="flex-1 bg-teal-400 text-primary py-3 rounded-lg font-semibold hover:bg-teal-300 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Create Account
                        </button>
                      </div>
                    </>
                  )}
                </form>
              </div>
            )}

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/60 text-gray-400">Or continue with</span>
              </div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white hover:bg-gray-800 transition-all">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
                GitHub
              </button>
            </div>
          </div>

          {/* Additional Info */}
          <p className="text-center text-gray-400 text-sm mt-6">
            By signing in, you agree to our secure authentication process
          </p>
        </div>
      </div>
    </div>
  )
}
