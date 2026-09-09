import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Mail, Lock, Eye, EyeOff, Sparkles, ArrowRight, Candy } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import '../styles/login.css'

const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      await register(name, email, password)
      navigate('/')
    } catch (err) {
      setError('Registration failed. Please try again.')
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
                  <span className="login-logo-text gradient-text">Kioski</span>
                  <span className="login-logo-sub">Sweet Chaos. Delivered.</span>
                </div>
              </div>

              <div className="login-header-content">
                <div className="login-badge">
                  <Sparkles size={14} color="#FF6B00" />
                  <span>JOIN THE FUN</span>
                </div>
                <h1 className="login-title">Create Account</h1>
                <p className="login-subtitle">Start your sweet journey today</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="login-form-group">
                <label>Full Name</label>
                <div className="login-input-wrapper">
                  <User className="login-input-icon" size={20} />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="login-input"
                    placeholder="John Doe"
                    required
                  />
                </div>
              </div>

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

              <div className="login-form-group">
                <label>Confirm Password</label>
                <div className="login-input-wrapper">
                  <Lock className="login-input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="login-input"
                    placeholder="••••••••"
                    required
                  />
                </div>
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
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              <div className="login-footer">
                <p>
                  Already have an account?{' '}
                  <Link to="/login" className="login-signup-link">
                    Sign in
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

export default Register