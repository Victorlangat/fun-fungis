import React, { useState } from 'react'
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, AlertCircle } from 'lucide-react'
import { submitMessage } from '../services/messages'
import { useMyMessages } from '../hooks/useMyMessages'
import MessageThread from '../components/MessageThread'
import '../styles/contact.css'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [activeEmail, setActiveEmail] = useState('')

  // Watch messages for whichever email was last used
  const { messages, loading: threadLoading } = useMyMessages(activeEmail)

  const contactInfo = [
    { icon: Mail, title: 'Email Us', details: 'hello@funfungi.co.ke', description: 'We\'ll respond within 24 hours', color: '#FF6B00', bg: 'rgba(255,107,0,0.08)' },
    { icon: Phone, title: 'Call Us', details: '+254 700 123 456', description: 'Mon-Fri, 9am - 6pm', color: '#00E676', bg: 'rgba(0,230,118,0.08)' },
    { icon: MapPin, title: 'Visit Us', details: 'Nairobi, Kenya', description: 'Come say hello!', color: '#FF1744', bg: 'rgba(255,23,68,0.08)' },
    { icon: Clock, title: 'Working Hours', details: '9:00 AM - 6:00 PM', description: 'Monday - Saturday', color: '#FFEA00', bg: 'rgba(255,234,0,0.08)' }
  ]

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
    if (error) setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)

    const email = formData.email.trim()
    const name = formData.name.trim()

    try {
      await submitMessage({
        name,
        email,
        subject: formData.subject.trim(),
        message: formData.message.trim()
      })

      // Switch to show the thread for this email
      setActiveEmail(email)

      // Clear only the subject and message, keep name & email so thread continues
      setFormData({
        ...formData,
        subject: '',
        message: ''
      })
    } catch (err) {
      console.error('Message submission failed:', err)
      setError('Failed to send message. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const startNewConversation = () => {
    setActiveEmail('')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div className="contact-page">
      <div className="container">
        <div className="contact-header">
          <div className="contact-header-badge">
            <span>GET IN TOUCH</span>
          </div>
          <h1 className="contact-title" style={{ color: '#FF6B00' }}>Let's Connect</h1>
          <p className="contact-subtitle">
            Have questions, suggestions, or just want to say hello? 
            We'd love to hear from you!
          </p>
        </div>

        <div className="contact-grid">
          <div className="contact-info-list">
            {contactInfo.map((info, index) => {
              const IconComponent = info.icon
              return (
                <div key={info.title} className="contact-info-card" style={{ animationDelay: `${index * 0.1}s` }}>
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

          <div className="contact-form-wrapper">
            <div className="contact-form-card">
              <div className="contact-form-header">
                <MessageSquare size={24} color="#FF6B00" />
                <h2>{activeEmail ? 'Your Conversation' : 'Send us a Message'}</h2>
                <p>
                  {activeEmail
                    ? `Chatting as ${activeEmail}`
                    : "We'll get back to you as soon as possible"}
                </p>
              </div>

              {/* Chat thread — shows when we have an active email */}
              {activeEmail && (
                <>
                  <MessageThread messages={messages} loading={threadLoading} />

                  <div className="contact-thread-actions">
                    <button
                      type="button"
                      onClick={startNewConversation}
                      className="contact-new-convo"
                    >
                      Start New Conversation
                    </button>
                  </div>

                  <div className="contact-thread-divider">
                    <span>Send another message</span>
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit} className="contact-form">
                {/* Show name+email only if not in an active thread */}
                {!activeEmail && (
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
                        disabled={isSubmitting}
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
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                )}

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
                    disabled={isSubmitting}
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
                    disabled={isSubmitting}
                  />
                </div>

                {error && (
                  <div className="contact-error">
                    <AlertCircle size={16} />
                    <span>{error}</span>
                  </div>
                )}

                <button type="submit" className="btn-primary contact-submit-btn" disabled={isSubmitting}>
                  <Send size={20} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="contact-cta-section">
          <div className="contact-cta-content">
            <h2 style={{ color: '#FF6B00' }}>Prefer to Reach Out Directly?</h2>
            <p>Visit our store in Nairobi or give us a call. We're always happy to chat!</p>
            <div className="contact-cta-buttons">
              <a href="tel:+254700123456" className="btn-primary">
                <Phone size={20} />
                Call Us Now
              </a>
              <a href="mailto:hello@funfungi.co.ke" className="btn-secondary">
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