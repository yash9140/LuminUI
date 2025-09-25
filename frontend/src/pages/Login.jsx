import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import client from '../lib/api.js'
import { setToken } from '../lib/auth.js'
import Footer from '../components/Footer.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  function validateForm() {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email')
      return false
    }
    if (!password || password.length < 8) {
      setError('Password must be at least 8 characters')
      return false
    }
    return true
  }

  async function onSubmit(e) {
    e.preventDefault()
    setError('')
    if (!validateForm()) return
    
    setLoading(true)
    try {
      const { data } = await client.post('/auth/login', { email, password })
      setToken(data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/" className="text-xl sm:text-2xl font-bold gradient-text">LuminUI</Link>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="hidden sm:inline text-gray-600">Sign in</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                to="/register"
                className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Create account
              </Link>
              <Link
                to="/"
                className="px-3 sm:px-4 py-2 bg-white/60 hover:bg-white/80 rounded-lg border border-white/20 text-sm text-gray-700 transition-all duration-300"
              >
                Home
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Hero Background Ornaments */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <div className="text-center mb-6">
            <Link to="/" className="text-4xl font-extrabold gradient-text">LuminUI</Link>
            <p className="text-gray-600 mt-2">Welcome back! Please sign in to continue.</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-white/20 animate-fade-in-scale">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Sign in</h1>
            {error && <div className="mb-3 p-3 bg-red-100 border border-red-300 text-red-700 rounded">{error}</div>}
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input className="w-full" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input className="w-full" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
              </div>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50" type="submit" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
            <div className="mt-4 text-sm text-center">
              No account? <Link className="text-blue-600 hover:underline" to="/register">Create one</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}


