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
import '../styles/shop.css'

const Shop = () => {
  const [expandedProduct, setExpandedProduct] = useState(null)
  const [likedProducts, setLikedProducts] = useState([])
  const [secretMode, setSecretMode] = useState({})
  const { addToCart } = useCart()

  const products = [
    {
      id: 1,
      name: 'Mango Tango',
      category: 'Fruit Chews',
      price: 450,
      image: 'https://i.pinimg.com/1200x/0b/4b/18/0b4b18bc4ab01627ef457becce8a7594.jpg',
      description: 'Explosive mango with chili heat',
      detailedDescription: 'A tropical explosion that starts sweet and finishes with a gentle warmth. Made with real mango puree and a touch of African chili.',
      secretIngredients: '🔥 TOP SECRET: Infused with Ghost Pepper extract for that extra kick! Only 5% of batch contains this. Handle with care!',
      rating: 4.8,
      reviews: 234,
      inStock: true,
      badge: 'Bestseller',
      badgeColor: '#FF6B00',
      tags: ['Tropical', 'Spicy'],
      ingredients: ['Mango puree', 'Sugar', 'Chili extract', 'Citric acid'],
      nutrition: { calories: 380, sugar: '42g', fat: '0g' }
    },
    {
      id: 2,
      name: 'Tamarind Twist',
      category: 'Sour Candies',
      price: 420,
      image: 'https://i.pinimg.com/736x/5b/54/b5/5b54b5b148ea33b9e905f1297e9ed309.jpg',
      description: 'Sweet & sour tamarind',
      detailedDescription: 'Inspired by traditional Kenyan street candy, this modern interpretation balances the natural tanginess of tamarind with just the right amount of sweetness.',
      secretIngredients: '🧪 TOP SECRET: Aged in oak barrels for 30 days with a hint of smoked paprika. Only 100 pieces made!',
      rating: 4.6,
      reviews: 189,
      inStock: true,
      badge: 'Popular',
      badgeColor: '#00E676',
      tags: ['Sour', 'Traditional'],
      ingredients: ['Tamarind paste', 'Sugar', 'Glucose syrup', 'Citric acid'],
      nutrition: { calories: 350, sugar: '38g', fat: '0.5g' }
    },
    {
      id: 3,
      name: 'Passion Pop',
      category: 'Fruit Chews',
      price: 480,
      image: 'https://i.pinimg.com/1200x/6d/9e/4f/6d9e4fc23b97bc8927547128a1835ce1.jpg',
      description: 'Tropical passion fruit with pop',
      detailedDescription: 'Each bite is a celebration! The intense passion fruit flavor is perfectly complemented by popping candy that crackles and dances on your tongue.',
      secretIngredients: '✨ TOP SECRET: Contains popping candy infused with edible glitter and a splash of champagne extract. Party in every bite!',
      rating: 4.9,
      reviews: 312,
      inStock: true,
      badge: 'New',
      badgeColor: '#FF1744',
      tags: ['Tropical', 'Fun'],
      ingredients: ['Passion fruit juice', 'Sugar', 'Popping candy', 'Natural flavors'],
      nutrition: { calories: 400, sugar: '45g', fat: '1g' }
    },
    {
      id: 4,
      name: 'Blackcurrant Storm',
      category: 'Gummies',
      price: 500,
      image: 'https://i.pinimg.com/736x/40/86/39/40863939a8881e3e3dd56e7afc02bb07.jpg',
      description: 'Intense blackcurrant gummies',
      detailedDescription: 'Bold, dark, and intensely flavored. These gummies deliver a powerful blackcurrant punch that hits you immediately, followed by a wave of sour.',
      secretIngredients: '🌙 TOP SECRET: Made with moonlit blackcurrants picked at midnight. Infused with a touch of lavender for a calming effect.',
      rating: 4.7,
      reviews: 267,
      inStock: true,
      badge: 'Premium',
      badgeColor: '#9C27B0',
      tags: ['Sour', 'Berry'],
      ingredients: ['Blackcurrant juice', 'Sugar', 'Gelatin', 'Citric acid'],
      nutrition: { calories: 420, sugar: '40g', fat: '1.5g' }
    },
    {
      id: 5,
      name: 'Pineapple Fizz',
      category: 'Hard Candies',
      price: 380,
      image: 'https://i.pinimg.com/736x/89/07/98/8907985655faae19ab40476e1cdb0814.jpg',
      description: 'Pineapple with fizzy center',
      detailedDescription: 'A hard candy that transforms as you enjoy it! The outer layer delivers sweet pineapple flavor, and as it melts, you discover a fizzy center.',
      secretIngredients: '💎 TOP SECRET: Contains a rare volcanic salt from Mount Kenya. Creates an electrifying fizz that lasts 30 seconds!',
      rating: 4.5,
      reviews: 156,
      inStock: false,
      badge: 'Limited',
      badgeColor: '#FFEA00',
      tags: ['Fizzy', 'Tropical'],
      ingredients: ['Pineapple extract', 'Sugar', 'Glucose syrup', 'Carbonated powder'],
      nutrition: { calories: 320, sugar: '35g', fat: '0g' }
    },
    {
      id: 6,
      name: 'Chili Mango Fire',
      category: 'Spicy Candies',
      price: 520,
      image: 'https://i.pinimg.com/736x/89/db/a6/89dba6151461c7ef7a929e531b08dd24',
      description: 'Mango with serious chili heat',
      detailedDescription: 'Not for the faint of heart! This candy starts with sweet, juicy mango and slowly builds to a serious chili heat that lingers.',
      secretIngredients: '🔥 TOP SECRET: Blended with Carolina Reaper powder and honey from bees that feed on chili flowers. Maximum heat guaranteed!',
      rating: 4.8,
      reviews: 198,
      inStock: true,
      badge: 'Hot!',
      badgeColor: '#FF1744',
      tags: ['Spicy', 'Extreme'],
      ingredients: ['Mango puree', 'Chili extract', 'Sugar', 'Citric acid'],
      nutrition: { calories: 390, sugar: '43g', fat: '0.5g' }
    },
    {
      id: 7,
      name: 'Coconut Dream',
      category: 'Creamy Candies',
      price: 460,
      image: 'https://i.pinimg.com/1200x/af/2b/e0/af2be0c9e44edef507e839048867a1f1.jpg',
      description: 'Creamy coconut bliss',
      detailedDescription: 'Pure tropical bliss! This creamy coconut candy delivers the rich, nutty flavor of fresh coconut in a smooth, melt-in-your-mouth texture.',
      secretIngredients: '🥥 TOP SECRET: Made with coconut milk from a single 100-year-old tree in Malindi. Aged for 6 months in clay pots.',
      rating: 4.4,
      reviews: 143,
      inStock: true,
      badge: 'Creamy',
      badgeColor: '#FFB300',
      tags: ['Creamy', 'Coconut'],
      ingredients: ['Coconut milk', 'Sugar', 'Butter', 'Natural flavors'],
      nutrition: { calories: 450, sugar: '38g', fat: '12g' }
    },
    {
      id: 8,
      name: 'Sour Apple Bites',
      category: 'Gummies',
      price: 440,
      image: 'https://i.pinimg.com/1200x/22/3b/32/223b32e09658340c4f118531ee3565cd.jpg',
      description: 'Sour apple gummy bites',
      detailedDescription: 'The ultimate sour experience! These gummy bites deliver a powerful sour apple punch that will make your taste buds tingle.',
      secretIngredients: '🍏 TOP SECRET: Infused with Granny Smith apple extract and a touch of wasabi for a surprise kick. Not for the faint-hearted!',
      rating: 4.6,
      reviews: 201,
      inStock: true,
      badge: 'Sour Power',
      badgeColor: '#00E676',
      tags: ['Sour', 'Gummy'],
      ingredients: ['Apple extract', 'Sugar', 'Gelatin', 'Malic acid'],
      nutrition: { calories: 360, sugar: '39g', fat: '0.8g' }
    }
  ]

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
                    {product.tags.map((tag) => (
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
                        <p>{product.detailedDescription}</p>
                        <div className="shop-product-ingredients">
                          <span className="ingredients-label">Ingredients:</span>
                          <span className="ingredients-list">{product.ingredients.join(', ')}</span>
                        </div>
                        <div className="shop-product-nutrition">
                          <span>🔥 {product.nutrition.calories} cal</span>
                          <span>🍬 {product.nutrition.sugar}</span>
                          <span>🧈 {product.nutrition.fat}</span>
                        </div>
                        
                        {/* Secret Toggle - ONLY visible when Learn More is expanded */}
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

                        {/* Secret Ingredients - Only shown when toggled */}
                        {isSecret && (
                          <div className="shop-product-secret">
                            <div className="secret-header">
                              <AlertTriangle size={14} color="#FF1744" />
                              <span>🧪 Candyman's Secret Recipe</span>
                            </div>
                            <p className="secret-text">{product.secretIngredients}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="shop-product-bottom">
                    <span className="shop-product-price" style={{ color: '#FF6B00', fontWeight: 700 }}>KES {product.price}</span>
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