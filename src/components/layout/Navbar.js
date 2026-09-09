import React, { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, LogOut } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'
import '../../styles/navbar.css'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const location = useLocation()
  const userMenuRef = useRef(null)
  const { getTotalItems } = useCart()
  const { user, logout, isAdmin } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/shop', label: 'Shop' },
    { to: '/contact', label: 'Contact' },
  ]

  const isActive = (path) => location.pathname === path

  const handleLogout = () => {
    logout()
    setIsUserMenuOpen(false)
  }

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <img 
              src="https://static.vecteezy.com/system/resources/previews/066/738/538/non_2x/i-put-the-fun-in-fungus-mushroom-ground-t-shirt-design-vector.jpg"
              alt="FunFungi Logo"
              className="navbar-logo-img"
            />
            <div className="navbar-logo-icon-glow" />
          </div>
          <div className="navbar-logo-text-group">
            <span className="navbar-logo-text">
              <span className="logo-fun">Fun</span>
              <span className="logo-fungi">Fungi</span>
            </span>
            <span className="navbar-logo-sub">Sweet Chaos. Delivered.</span>
          </div>
        </Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-link ${isActive(link.to) ? 'active' : ''}`}
            >
              {link.label}
              <span className="navbar-link-underline" />
            </Link>
          ))}
        </div>

        <div className="navbar-actions">
          <Link to="/cart" className="navbar-icon-btn">
            <ShoppingBag size={20} />
            {getTotalItems() > 0 && (
              <span className="navbar-cart-badge">{getTotalItems()}</span>
            )}
          </Link>

          <div style={{ position: 'relative' }} ref={userMenuRef}>
            <button className="navbar-avatar" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
              <User size={17} />
            </button>

            {isUserMenuOpen && (
              <div className="navbar-dropdown">
                {user ? (
                  <>
                    <div style={{ padding: '0.5rem 0.75rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <p style={{ color: 'white', fontWeight: 600, fontSize: '0.85rem' }}>{user.name}</p>
                      <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.75rem' }}>{user.email}</p>
                    </div>
                    <Link to="/profile" className="navbar-dropdown-item">
                      <User size={16} />
                      Profile
                    </Link>
                    <Link to="/orders" className="navbar-dropdown-item">
                      <ShoppingBag size={16} />
                      Orders
                    </Link>
                    {isAdmin() && (
                      <Link to="/admin" className="navbar-dropdown-item">
                        <User size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <div className="navbar-dropdown-divider" />
                    <button className="navbar-dropdown-item danger" onClick={handleLogout}>
                      <LogOut size={16} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="navbar-dropdown-item">
                      <User size={16} />
                      Sign In
                    </Link>
                    <Link to="/register" className="navbar-dropdown-item">
                      <User size={16} />
                      Create Account
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>

          <button className="navbar-mobile-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="navbar-mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`navbar-mobile-link ${isActive(link.to) ? 'active' : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          
          <div className="navbar-mobile-auth">
            {user ? (
              <>
                <Link to="/profile" className="btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                  <User size={16} />
                  Profile
                </Link>
                <button className="btn-secondary" onClick={handleLogout} style={{ color: '#FF1744' }}>
                  <LogOut size={16} />
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-primary" onClick={() => setIsMobileMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/register" className="btn-secondary" onClick={() => setIsMobileMenuOpen(false)}>
                  Create Account
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar