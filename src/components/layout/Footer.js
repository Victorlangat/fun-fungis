import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin, Candy, Shield } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import '../../styles/footer.css'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { isAdmin } = useAuth() // Remove 'user' since it's not used

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'All Candies', to: '/shop' },
        { label: 'Fruit Chews', to: '/shop' },
        { label: 'Gummies', to: '/shop' },
      ]
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', to: '/about' },
        { label: 'Contact', to: '/contact' },
      ]
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', to: '/help' },
        { label: 'Returns', to: '/returns' },
      ]
    }
  ]

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <div className="footer-brand-icon">
                <Candy size={24} />
              </div>
              <div>
                <div className="footer-brand-text" style={{ color: '#FF6B00', fontSize: '1.25rem', fontWeight: 800 }}>
                  FunFungi
                </div>
                <div className="footer-brand-sub">Sweet Chaos. Delivered.</div>
              </div>
            </div>
            <p className="footer-description">
              Bringing the vibrant street candy experience to your doorstep. 
              Every bite tells a story of flavor, fun, and sweet chaos.
            </p>
            <div className="footer-social">
              <a href="#" className="footer-social-link" aria-label="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="Twitter">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/>
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="YouTube">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/>
                </svg>
              </a>
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="footer-links-title">{section.title}</h3>
              <ul className="footer-links-list">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <p>© {currentYear} FunFungi Candy Co.</p>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <span className="footer-bottom-divider" />
              <Link to="/terms">Terms</Link>
              <span className="footer-bottom-divider" />
              <Link to="/cookies">Cookies</Link>
            </div>
          </div>

          <div className="footer-bottom-info">
            <span><Phone size={14} /> +254 700 123 456</span>
            <span><Mail size={14} /> hello@funfungi.co.ke</span>
            <span><MapPin size={14} /> Nairobi, Kenya</span>
          </div>

          <div className="footer-made-with">
            Made with <Heart className="footer-heart" size={14} /> in Kenya
          </div>
        </div>

        {/* SYSTEM ACCESS - Admin Only */}
        {isAdmin() && (
          <div className="footer-system-access">
            <Link to="/admin" className="footer-system-link">
              <Shield size={14} />
              <span>System Access</span>
            </Link>
          </div>
        )}
      </div>
    </footer>
  )
}

export default Footer