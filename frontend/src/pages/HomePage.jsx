import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getToken, logout } from '../lib/auth.js'
import Footer from '../components/Footer.jsx'

export default function HomePage() {
  const [isVisible, setIsVisible] = useState(false)
  const [currentCard, setCurrentCard] = useState(0)
  const isAuthed = !!getToken()

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setCurrentCard(prev => (prev + 1) % 3)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: "🔐",
      title: "Secure Authentication",
      description: "JWT-based authentication with bcrypt password hashing for maximum security"
    },
    {
      icon: "📊",
      title: "Interactive Dashboard",
      description: "Beautiful, responsive dashboard with real-time task management and analytics"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      description: "Built with modern technologies for optimal performance and user experience"
    }
  ]

  const stats = [
    { number: "99.9%", label: "Uptime" },
    { number: "10K+", label: "Users" },
    { number: "50K+", label: "Tasks Created" },
    { number: "24/7", label: "Support" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-white/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link to="/" className="text-xl sm:text-2xl font-bold gradient-text">LuminUI</Link>
              <span className="hidden sm:inline text-gray-400">|</span>
              <span className="hidden sm:inline text-gray-600">Home</span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3">
              {!isAuthed ? (
                <>
                  <Link
                    to="/login"
                    className="px-3 sm:px-4 py-2 bg-white/60 hover:bg-white/80 rounded-lg border border-white/20 text-sm text-gray-700 transition-all duration-300"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    Get started
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    className="px-3 sm:px-4 py-2 bg-white/60 hover:bg-white/80 rounded-lg border border-white/20 text-sm text-gray-700 transition-all duration-300"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={logout}
                    className="px-3 sm:px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-600 hover:text-red-700 rounded-lg border border-red-200 hover:border-red-300 text-sm transition-all duration-300"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-400/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-400/30 rounded-full blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className={`relative z-10 text-center max-w-4xl mx-auto px-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h1 className="text-6xl md:text-8xl font-bold gradient-text mb-6 animate-glow">
            LuminUI
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
            The modern, scalable web application platform that brings your ideas to life with 
            <span className="font-semibold text-blue-600"> beautiful design</span> and 
            <span className="font-semibold text-purple-600"> powerful features</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/register" 
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </Link>
            <Link 
              to="/login" 
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-600 hover:text-white transform hover:scale-105 transition-all duration-300"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-1/4 left-10 animate-float">
          <div className="w-4 h-4 bg-blue-400 rounded-full"></div>
        </div>
        <div className="absolute top-1/3 right-16 animate-float" style={{animationDelay: '2s'}}>
          <div className="w-6 h-6 bg-purple-400 rounded-full"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/4 animate-float" style={{animationDelay: '4s'}}>
          <div className="w-3 h-3 bg-pink-400 rounded-full"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              Why Choose <span className="text-blue-600">LuminUI</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the power of modern web development with our feature-rich platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-500 border border-white/20 hover-lift ${
                  currentCard === index ? 'scale-105 shadow-2xl animate-glow' : ''
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="text-6xl mb-6 text-center">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">{feature.title}</h3>
                <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Trusted by Developers Worldwide
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of developers who have already made the switch
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-110 transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-4xl md:text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join our community and start building amazing web applications today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/register" 
              className="px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
            >
              Create Your Account
            </Link>
            <Link 
              to="/login" 
              className="px-10 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 transform hover:scale-105 transition-all duration-300 text-lg"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
