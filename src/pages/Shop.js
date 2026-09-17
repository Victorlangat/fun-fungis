import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  ShoppingBag, 
  Sparkles, 
  ArrowRight, 
  Star, 
  ChevronDown, 
  ChevronUp,
  Info,
  Heart,
  Lock,
  Unlock,
  AlertTriangle
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useProducts } from '../hooks/useProducts'
import '../styles/shop.css'

const Shop = () => {
  const [expandedProduct, setExpandedProduct] = useState(null)
  const [likedProducts, setLikedProducts] = useState([])
  const [secretMode, setSecretMode] = useState({})
  const { addToCart } = useCart()
  const { products, loading, error } = useProducts()

  const toggleExpand = (id) => {
    setExpandedProduct(expandedProduct === id ? null : id)
  }

  const toggleLike = (id) => {
    setLikedProducts(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    )
  }

  const toggleSecret = (id) => {
    setSecretMode(prev => ({
      ...prev,
      [id]: !prev[id]
    }))
  }

  const handleAddToCart = (product) => {
    if (product.inStock) {
      addToCart(product, 1)
    }
  }

  const renderStars = (rating) => {
    return (
      <div style={{ display: 'flex', gap: '1px', alignItems: 'center' }}>
        {[...Array(5)].map((_, i) => (
          <Star 
            key={i} 
            size={12} 
            fill={i < Math.floor(rating) ? '#FFEA00' : 'none'}
            color={i < Math.floor(rating) ? '#FFEA00' : 'rgba(255,255,255,0.1)'}
          />
        ))}
        <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.6rem', marginLeft: '2px' }}>
          ({rating})
        </span>
      </div>
    )
  }

  // Loading state
  if (loading) {
    return (
      <div className="shop-page">
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh',
          flexDirection: 'column',
          gap: '1rem'
        }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(255,107,0,0.2)',
            borderTopColor: '#FF6B00',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite'
          }} />
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>Loading candies...</p>
        </div>
      </div>
    )
  }

  // Error state
  if (error) {
    return (
      <div className="shop-page">
        <div className="container" style={{
          textAlign: 'center',
          padding: '4rem 1rem',
          minHeight: '60vh'
        }}>
          <h2 style={{ color: '#FF1744', marginBottom: '1rem' }}>Something went wrong</h2>
          <p style={{ color: 'rgba(255,255,255,0.5)' }}>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="shop-page">
      {/* HERO SECTION */}
      <section className="shop-hero-section">
        <div className="shop-hero-bg">
          <img 
            src="https://i.pinimg.com/736x/28/6b/87/286b870fd402addfea7d33392f259c9f.jpg"
            alt="FunFungi Candies"
            className="shop-hero-image"
          />
          <div className="shop-hero-overlay" />
        </div>

        <div className="container shop-hero-container">
          <div className="shop-hero-content">
            <div className="shop-hero-badge">
              <Sparkles size={14} color="#FF6B00" />
              <span>OUR COLLECTION</span>
            </div>
            <h1 className="shop-hero-title" style={{ color: '#FF6B00' }}>Premium Candies</h1>
            <p className="shop-hero-subtitle">
              Discover Kenya's finest handcrafted candies, made with love and the finest ingredients.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCT GRID */}
      <div className="container shop-container">
        {products.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            background: 'rgba(20,20,20,0.4)',
            borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <h3 style={{ color: 'white', marginBottom: '0.5rem', fontSize: '1.5rem' }}>No candies yet 🍬</h3>
            <p style={{ color: 'rgba(255,255,255,0.4)' }}>
              Our collection is being prepared. Check back soon!
            </p>
          </div>
        ) : (
          <div className="shop-grid">
            {products.map((product, index) => {
              const isExpanded = expandedProduct === product.id
              const isLiked = likedProducts.includes(product.id)
              const isSecret = secretMode[product.id] || false

              return (
                <div 
                  key={product.id} 
                  className={`shop-product-card ${isSecret ? 'secret-active' : ''}`}
                  style={{
                    animationDelay: `${index * 0.06}s`
                  }}
                >
                  {/* Product Image */}
                  <div className="shop-product-image">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="shop-product-img"
                      loading="lazy"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x400/FF6B00/FFFFFF?text=FunFungi'
                      }}
                    />
                    {product.badge && (
                      <span 
                        className="shop-product-badge"
                        style={{ background: product.badgeColor }}
                      >
                        {product.badge}
                      </span>
                    )}
                    {!product.inStock && (
                      <span className="shop-product-soldout">Sold Out</span>
                    )}
                    
                    <button 
                      className="shop-product-like"
                      onClick={() => toggleLike(product.id)}
                      style={{
                        background: isLiked ? 'rgba(255,23,68,0.15)' : 'rgba(255,255,255,0.05)',
                        borderColor: isLiked ? 'rgba(255,23,68,0.3)' : 'rgba(255,255,255,0.06)'
                      }}
                    >
                      <Heart 
                        size={14} 
                        fill={isLiked ? '#FF1744' : 'none'}
                        color={isLiked ? '#FF1744' : 'rgba(255,255,255,0.3)'}
                      />
                    </button>
                  </div>
                  
                  <div className="shop-product-info">
                    <div className="shop-product-top">
                      <div>
                        <div className="shop-product-category">{product.category}</div>
                        <h3 className="shop-product-name">{product.name}</h3>
                      </div>
                      <div className="shop-product-rating">
                        {renderStars(product.rating)}
                      </div>
                    </div>

                    <p className="shop-product-description">{product.description}</p>

                    <div className="shop-product-tags">
                      {(product.tags || []).map((tag) => (
                        <span key={tag} className="shop-product-tag">{tag}</span>
                      ))}
                    </div>

                    <div className="shop-product-details">
                      <button 
                        className="shop-product-toggle"
                        onClick={() => toggleExpand(product.id)}
                      >
                        <Info size={12} />
                        {isExpanded ? 'Show Less' : 'Learn More'}
                        {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                      </button>

                      {isExpanded && (
                        <div className={`shop-product-detail-content ${isSecret ? 'secret-revealed' : ''}`}>
                          <p>{product.detailedDescription || product.description}</p>
                          
                          {product.ingredients && product.ingredients.length > 0 && (
                            <div className="shop-product-ingredients">
                              <span className="ingredients-label">Ingredients:</span>
                              <span className="ingredients-list">{product.ingredients.join(', ')}</span>
                            </div>
                          )}
                          
                          {product.nutrition && (
                            <div className="shop-product-nutrition">
                              <span>🔥 {product.nutrition.calories} cal</span>
                              <span>🍬 {product.nutrition.sugar}</span>
                              <span>🧈 {product.nutrition.fat}</span>
                            </div>
                          )}
                          
                          {/* Secret Toggle */}
                          {product.secretIngredients && (
                            <>
                              <div className="shop-product-secret-toggle-wrapper">
                                <button 
                                  className={`secret-toggle ${isSecret ? 'active' : ''}`}
                                  onClick={() => toggleSecret(product.id)}
                                  title="Toggle Candyman's Secret Ingredients"
                                >
                                  {isSecret ? <Unlock size={14} /> : <Lock size={14} />}
                                  <span className="secret-toggle-label">
                                    {isSecret ? 'Hide Secret Recipe' : 'Unlock Secret Recipe'}
                                  </span>
                                </button>
                              </div>

                              {isSecret && (
                                <div className="shop-product-secret">
                                  <div className="secret-header">
                                    <AlertTriangle size={14} color="#FF1744" />
                                    <span>🧪 Candyman's Secret Recipe</span>
                                  </div>
                                  <p className="secret-text">{product.secretIngredients}</p>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </div>

                    <div className="shop-product-bottom">
                      <span className="shop-product-price" style={{ color: '#FF6B00', fontWeight: 700 }}>
                        KES {product.price}
                      </span>
                      <button 
                        className={`shop-product-btn ${!product.inStock ? 'disabled' : ''}`}
                        onClick={() => handleAddToCart(product)}
                        disabled={!product.inStock}
                      >
                        <ShoppingBag size={12} />
                        {product.inStock ? 'Add' : 'Out'}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* CTA Section */}
        <div className="shop-cta-section">
          <div className="shop-cta-content">
            <h2 style={{ color: '#FF6B00' }}>Can't Find What You're Looking For?</h2>
            <p>We're always creating new flavors. Contact us for custom orders and special requests.</p>
            <Link to="/contact" className="btn-primary">
              Contact Us
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop