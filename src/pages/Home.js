import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Star, Truck, Clock, Gift, Sparkles } from 'lucide-react'

const Home = () => {
  const features = [
    {
      icon: Truck,
      title: 'Free Delivery',
      description: 'On orders over KES 2,000',
      color: '#FF6B00',
      bg: 'rgba(255,107,0,0.08)'
    },
    {
      icon: Clock,
      title: 'Fast Shipping',
      description: 'Delivered within 24-48 hours',
      color: '#FF1744',
      bg: 'rgba(255,23,68,0.08)'
    },
    {
      icon: Gift,
      title: 'Special Offers',
      description: 'Monthly deals and discounts',
      color: '#00E676',
      bg: 'rgba(0,230,118,0.08)'
    },
    {
      icon: Star,
      title: 'Premium Quality',
      description: 'Made with love in Kenya',
      color: '#FFEA00',
      bg: 'rgba(255,234,0,0.08)'
    },
  ]

  return (
    <div>
      {/* HERO SECTION */}
      <section style={{
        position: 'relative',
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        padding: '2rem 0'
      }}>
        {/* Background Image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://i.pinimg.com/1200x/e2/9f/87/e29f876535e16bac072e928fd8552263.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          zIndex: 0
        }} />
        
        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, #0A0A0A 0%, #0A0A0A 30%, rgba(10,10,10,0.7) 55%, rgba(10,10,10,0.3) 75%, transparent 100%)',
          zIndex: 1
        }} />

        {/* Bottom Gradient Fade */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '30%',
          background: 'linear-gradient(to top, #0A0A0A, transparent)',
          zIndex: 1
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '4rem',
            alignItems: 'center',
            minHeight: '70vh'
          }}>
            {/* Left Content */}
            <div style={{ maxWidth: '600px' }}>
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(255,107,0,0.15)',
                border: '1px solid rgba(255,107,0,0.2)',
                padding: '0.4rem 1rem',
                borderRadius: '50px',
                marginBottom: '1.5rem'
              }}>
                <Sparkles size={14} color="#FF6B00" />
                <span style={{ color: '#FF6B00', fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  New Collection
                </span>
              </div>

              <h1 style={{
                fontSize: '4.5rem',
                fontWeight: 900,
                lineHeight: '1.05',
                marginBottom: '1.5rem',
                letterSpacing: '-0.03em'
              }}>
                <span style={{ color: 'white' }}>Sweet Chaos,</span>
                <br />
                <span style={{ color: '#FF6B00' }}>Delivered.</span>
              </h1>

              <p style={{
                fontSize: '1.15rem',
                color: 'rgba(255,255,255,0.6)',
                maxWidth: '480px',
                marginBottom: '2.5rem',
                lineHeight: '1.8',
                fontWeight: 400
              }}>
                Discover Kenya's most vibrant candy experience. From tangy tamarind 
                to fiery chili mango — every bite tells a story.
              </p>

              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/shop" className="btn-primary" style={{ padding: '1rem 2.5rem' }}>
                  Explore Collection
                  <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-secondary">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Right Content - Empty */}
            <div />
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section style={{ padding: '5rem 0', borderTop: '1px solid rgba(255,255,255,0.04)', background: '#0A0A0A' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.8rem', fontWeight: 800, color: '#FF6B00' }}>Why Choose FunFungi?</h2>
            <p style={{ color: 'rgba(255,255,255,0.4)', marginTop: '0.5rem' }}>We make sweet moments happen</p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1.5rem'
          }}>
            {features.map((feature, index) => (
              <div 
                key={feature.title} 
                style={{
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.04)',
                  borderRadius: '16px',
                  transition: 'all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  cursor: 'default'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.borderColor = 'rgba(255,107,0,0.12)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.2)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <div style={{
                  width: '60px',
                  height: '60px',
                  margin: '0 auto 1.2rem',
                  borderRadius: '14px',
                  background: feature.bg,
                  border: `1px solid ${feature.color}20`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <feature.icon size={28} color={feature.color} />
                </div>
                <h3 style={{ 
                  color: 'white', 
                  fontWeight: 700, 
                  fontSize: '1.1rem',
                  marginBottom: '0.4rem'
                }}>
                  {feature.title}
                </h3>
                <p style={{ 
                  color: 'rgba(255,255,255,0.3)', 
                  fontSize: '0.9rem',
                  lineHeight: '1.6'
                }}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{
        padding: '6rem 0',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0A0A'
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(255,107,0,0.06), transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,23,68,0.06), transparent 60%)'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div style={{ 
            textAlign: 'center', 
            maxWidth: '650px', 
            margin: '0 auto',
            padding: '4rem',
            background: 'rgba(20,20,20,0.5)',
            backdropFilter: 'blur(24px)',
            borderRadius: '24px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: 800, 
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              color: '#FF6B00'
            }}>
              Ready for Sweet Chaos?
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              color: 'rgba(255,255,255,0.5)', 
              marginBottom: '2.5rem',
              lineHeight: '1.7'
            }}>
              Join thousands of happy customers and get your candy fix 
              delivered right to your doorstep.
            </p>
            <Link to="/shop" className="btn-primary" style={{ 
              fontSize: '1.1rem', 
              padding: '1rem 3rem'
            }}>
              Start Shopping Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home