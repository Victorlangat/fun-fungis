import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, Clock, Send, Sparkles, ArrowRight, MessageSquare } from 'lucide-react'
import '../styles/contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const contactInfo = [
    { 
      icon: Mail, 
      title: 'Email Us', 
      details: 'hello@kioski.co.ke',
      description: 'We\'ll respond within 24 hours',
      color: '#FF6B00',
      bg: 'rgba(255,107,0,0.08)'
    },
    { 
      icon: Phone, 
      title: 'Call Us', 
      details: '+254 700 123 456',
      description: 'Mon-Fri, 9am - 6pm',
      color: '#00E676',
      bg: 'rgba(0,230,118,0.08)'
    },
    { 
      icon: MapPin, 
      title: 'Visit Us', 
      details: 'Nairobi, Kenya',
      description: 'Come say hello!',
      color: '#FF1744',
      bg: 'rgba(255,23,68,0.08)'
    },
    { 
      icon: Clock, 
      title: 'Working Hours', 
      details: '9:00 AM - 6:00 PM',
      description: 'Monday - Saturday',
      color: '#FFEA00',
      bg: 'rgba(255,234,0,0.08)'
    },
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      setFormData({ name: '', email: '', subject: '', message: '' })
    }, 3000)
  }

  return (
    <div className="contact-page">
      <div className="container">
        {/* Header - Matching Home/Shop */}
        <div className="contact-header">
          <div className="contact-header-badge">
            <Sparkles size={14} color="#FF6B00" />
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="contact-title" style={{ color: '#FF6B00' }}>Let's Connect</h1>
          <p className="contact-subtitle">
            Have questions, suggestions, or just want to say hello? 
            We'd love to hear from you!
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Info Cards */}
          <div className="contact-info-list">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div 
                  key={info.title} 
                  className="contact-info-card"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="contact-info-icon" style={{ background: info.bg, borderColor: `${info.color}30` }}>
                    <IconComponent size={24} color={info.color} />
                  </div>
                  <div className="contact-info-text">
                    <h3>{info.title}</h3>
                    <p className="contact-info-details">{info.details}</p>
                    <span className="contact-info-description">{info.description}</span>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Contact Form */}
          <div className="contact-form-wrapper">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <MessageSquare size={24} color="#FF6B00" />
                <h2>Send us a Message</h2>
                <p>We'll get back to you as soon as possible</p>
              </div>

              {isSubmitted ? (
                <div className="contact-success">
                  <div className="contact-success-icon">✓</div>
                  <h3>Message Sent! 🎉</h3>
                  <p>We'll get back to you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="contact-form-row">
                    <div className="contact-form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                    <div className="contact-form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        placeholder="you@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-form-group">
                    <label>Subject</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="input-field"
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div className="contact-form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="input-field contact-textarea"
                      placeholder="Tell us what's on your mind..."
                      required
                    />
                  </div>

                  <button type="submit" className="btn-primary contact-submit-btn">
                    <Send size={20} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* CTA Section - Matching Home/Shop */}
        <div className="contact-cta-section">
          <div className="contact-cta-content">
            <h2 style={{ color: '#FF6B00' }}>Prefer to Reach Out Directly?</h2>
            <p>Visit our store in Nairobi or give us a call. We're always happy to chat!</p>
            <div className="contact-cta-buttons">
              <a href="tel:+254700123456" className="btn-primary">
                <Phone size={20} />
                Call Us Now
              </a>
              <a href="mailto:hello@kioski.co.ke" className="btn-secondary">
                <Mail size={20} />
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact