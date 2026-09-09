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
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="login-page">
      {/* Background Effects */}
      <div className="login-bg-gradient" />
      <div className="login-bg-orb-1" />
      <div className="login-bg-orb-2" />

      <div className="container login-container">
        <div className="login-card-wrapper">
          {/* Back Button */}
          <Link to="/" className="login-back">
            <ArrowRight size={18} />
            Back to Home
          </Link>

          <div className="login-card">
            {/* Header */}
            <div className="login-header">
              <div className="login-logo">
                <div className="login-logo-icon">
                  <Candy size={28} />
                </div>
                <div>
                  <span className="login-logo-text gradient-text">Kioski</span>
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

            {/* Form */}
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