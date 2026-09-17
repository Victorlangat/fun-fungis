import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Candy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import '../styles/login.css'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    try {
      await login(email, password)
      navigate('/')
    } catch (err) {
      console.error('Login error:', err.code, err.message)

      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email')
          break
        case 'auth/wrong-password':
          setError('Incorrect password. Try again.')
          break
        case 'auth/invalid-email':
          setError('Invalid email address')
          break
        case 'auth/invalid-credential':
          setError('Invalid email or password')
          break
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Try again later.')
          break
        case 'auth/user-disabled':
          setError('This account has been disabled')
          break
        case 'auth/network-request-failed':
          setError('Network error. Check your connection.')
          break
        default:
          setError('Login failed. Please try again.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      <div className="login-bg-gradient" />
      <div className="login-bg-orb-1" />
      <div className="login-bg-orb-2" />

      <div className="container login-container">
        <div className="login-card-wrapper">
          <Link to="/" className="login-back">
            <ArrowRight size={18} />
            Back to Home
          </Link>

          <div className="login-card">
            <div className="login-header">
              <div className="login-logo">
                <div className="login-logo-icon">
                  <Candy size={28} />
                </div>
                <div>
                  <span className="login-logo-text" style={{ color: '#FF6B00' }}>FunFungi</span>
                  <span className="login-logo-sub">Sweet Chaos. Delivered.</span>
                </div>
              </div>

              <div className="login-header-content">
                <div className="login-badge">
                  <Sparkles size={14} color="#FF6B00" />
                  <span>WELCOME BACK</span>
                </div>
                <h1 className="login-title">Sign In</h1>
                <p className="login-subtitle">Continue your sweet journey</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label>Email Address</label>
                <div className="login-input-wrapper">
                  <Mail className="login-input-icon" size={20} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="login-input"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </div>

              <div className="login-form-group">
                <label>Password</label>
                <div className="login-input-wrapper">
                  <Lock className="login-input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="login-options">
                <label className="login-remember">
                  <input type="checkbox" />
                  <span>Remember me</span>
                </label>
                <Link to="/forgot-password" className="login-forgot">
                  Forgot password?
                </Link>
              </div>

              {error && (
                <div className="login-error">{error}</div>
              )}

              <button
                type="submit"
                className="login-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="login-spinner" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="login-footer">
                <p>
                  Don't have an account?{' '}
                  <Link to="/register" className="login-signup-link">
                    Create one
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login