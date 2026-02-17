'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { loginAdmin } from '@/lib/auth'
import { useAuth } from '@/hooks/useAuth'

export default function Page() {
  const router = useRouter()
  const { user, isAdminUser, loading: authLoading } = useAuth()
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!authLoading && user && isAdminUser) {
      router.push('/adash')
    } else if (!authLoading && user && !isAdminUser) {
      router.push('/dashboard')
    }
  }, [user, isAdminUser, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const result = await loginAdmin(formData.email, formData.password)
      if (result.success) {
        router.push('/adash')
      } else {
        setError(result.error || 'Failed')
      }
    } catch {
      setError('Failed')
    } finally {
      setLoading(false)
    }
  }

  // Generic/decoy form
  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 border border-gray-800 rounded-xl shadow-lg p-6 w-full max-w-sm flex flex-col space-y-4"
        autoComplete="off"
      >
        <input
          type="text"
          value={formData.email}
          autoComplete="off"
          onChange={e => setFormData({ ...formData, email: e.target.value })}
          placeholder="Username"
          required
          disabled={loading}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none"
        />
        <input
          type="password"
          value={formData.password}
          autoComplete="off"
          onChange={e => setFormData({ ...formData, password: e.target.value })}
          placeholder="Password"
          required
          disabled={loading}
          className="px-3 py-2 bg-gray-800 border border-gray-700 rounded text-white placeholder-gray-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-gray-700 text-white py-2 rounded hover:bg-gray-600 transition-all disabled:opacity-50"
        >
          {loading ? 'Loading...' : 'Submit'}
        </button>
        {error && <div className="text-xs text-red-500 text-center">{error}</div>}
      </form>
    </div>
  )
}
