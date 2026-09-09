import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { 
  ShoppingBag, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowLeft,
  CreditCard,
  Truck,
  Shield,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import '../styles/cart.css'

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateQuantity, 
    clearCart,
    getTotalItems,
    getSubtotal,
    getShipping,
    getTax,
    getGrandTotal,
    placeOrder
  } = useCart()
  const { isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderDetails, setOrderDetails] = useState(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'mpesa'
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setIsCheckingOut(true)
  }

  const handlePlaceOrder = (e) => {
    e.preventDefault()
    const order = placeOrder(formData)
    setOrderDetails(order)
    setOrderPlaced(true)
    setIsCheckingOut(false)
  }

  if (cart.length === 0 && !orderPlaced) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <div className="cart-empty-icon">
              <ShoppingBag size={48} />
            </div>
            <h2>Your Bag is Empty</h2>
            <p>Looks like you haven't added any candies yet</p>
            <Link to="/shop" className="btn-primary">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (orderPlaced && orderDetails) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="order-confirmation">
            <div className="order-confirmation-icon">
              <CheckCircle size={64} color="#00E676" />
            </div>
            <h1 className="gradient-text">Order Confirmed! 🎉</h1>
            <p>Thank you for your order. We'll start preparing it right away.</p>
            
            <div className="order-confirmation-details">
              <div className="order-confirmation-card">
                <h3>Order Details</h3>
                <div className="order-confirmation-row">
                  <span>Order Number</span>
                  <span className="order-confirmation-value">{orderDetails.orderNumber}</span>
                </div>
                <div className="order-confirmation-row">
                  <span>Order ID</span>
                  <span className="order-confirmation-value">{orderDetails.id}</span>
                </div>
                <div className="order-confirmation-row">
                  <span>Total</span>
                  <span className="order-confirmation-value gradient-text">KES {orderDetails.total.toFixed(2)}</span>
                </div>
                <div className="order-confirmation-row">
                  <span>Status</span>
                  <span className="order-status-badge pending">{orderDetails.status}</span>
                </div>
              </div>

              <div className="order-confirmation-card">
                <h3>Delivery Details</h3>
                <div className="order-confirmation-row">
                  <span>Name</span>
                  <span className="order-confirmation-value">{orderDetails.customer.name}</span>
                </div>
                <div className="order-confirmation-row">
                  <span>Email</span>
                  <span className="order-confirmation-value">{orderDetails.customer.email}</span>
                </div>
                <div className="order-confirmation-row">
                  <span>Phone</span>
                  <span className="order-confirmation-value">{orderDetails.customer.phone}</span>
                </div>
                <div className="order-confirmation-row">
                  <span>Address</span>
                  <span className="order-confirmation-value">{orderDetails.customer.address}</span>
                </div>
              </div>

              <div className="order-confirmation-card">
                <h3>Items</h3>
                {orderDetails.items.map((item) => (
                  <div key={item.id} className="order-confirmation-item">
                    <span>{item.name} × {item.quantity}</span>
                    <span>KES {item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="order-confirmation-actions">
              <Link to="/shop" className="btn-primary">Continue Shopping</Link>
              <Link to="/" className="btn-secondary">Go Home</Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (isCheckingOut) {
    return (
      <div className="cart-page">
        <div className="container">
          <button 
            className="checkout-back"
            onClick={() => setIsCheckingOut(false)}
          >
            <ArrowLeft size={20} />
            Back to Cart
          </button>

          <div className="checkout-container">
            <h1 className="gradient-text checkout-title">Checkout</h1>
            
            <form onSubmit={handlePlaceOrder} className="checkout-form">
              <div className="checkout-grid">
                <div className="checkout-form-section">
                  <h2>Shipping Information</h2>
                  
                  <div className="form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="input-field"
                      required
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="input-field"
                      required
                      placeholder="you@example.com"
                    />
                  </div>

                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="input-field"
                      required
                      placeholder="+254 700 123 456"
                    />
                  </div>

                  <div className="form-group">
                    <label>Delivery Address</label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className="input-field"
                      required
                      placeholder="123 Main St, Nairobi"
                    />
                  </div>

                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="input-field"
                      required
                      placeholder="Nairobi"
                    />
                  </div>

                  <div className="form-group">
                    <label>Payment Method</label>
                    <select
                      name="paymentMethod"
                      value={formData.paymentMethod}
                      onChange={handleChange}
                      className="input-field"
                      required
                    >
                      <option value="mpesa">M-Pesa</option>
                      <option value="card">Credit/Debit Card</option>
                      <option value="cash">Cash on Delivery</option>
                    </select>
                  </div>
                </div>

                <div className="checkout-summary">
                  <h2>Order Summary</h2>
                  
                  <div className="checkout-summary-items">
                    {cart.map((item) => (
                      <div key={item.id} className="checkout-summary-item">
                        <span>{item.name} × {item.quantity}</span>
                        <span>KES {item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="checkout-summary-totals">
                    <div className="summary-row">
                      <span>Subtotal</span>
                      <span>KES {getSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping</span>
                      <span>{getShipping() === 0 ? 'Free' : `KES ${getShipping().toFixed(2)}`}</span>
                    </div>
                    <div className="summary-row">
                      <span>Tax (16%)</span>
                      <span>KES {getTax().toFixed(2)}</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total</span>
                      <span className="gradient-text">KES {getGrandTotal().toFixed(2)}</span>
                    </div>
                  </div>

                  <button type="submit" className="btn-primary checkout-submit">
                    <CreditCard size={20} />
                    Place Order
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <button className="cart-back" onClick={() => navigate(-1)}>
            <ArrowLeft size={24} />
          </button>
          <h1 className="gradient-text">Your Bag</h1>
          <span className="cart-item-count">({getTotalItems()} items)</span>
        </div>

        <div className="cart-grid">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-image">
                  <span style={{ fontSize: '2.5rem' }}>🍬</span>
                </div>
                
                <div className="cart-item-info">
                  <div className="cart-item-header">
                    <div>
                      <h3 className="cart-item-name">{item.name}</h3>
                      <p className="cart-item-category">{item.category}</p>
                    </div>
                    <button 
                      className="cart-item-remove"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                        <Minus size={16} />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                        <Plus size={16} />
                      </button>
                    </div>
                    <span className="cart-item-price gradient-text">
                      KES {item.price * item.quantity}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {cart.length > 1 && (
              <button className="cart-clear-all" onClick={clearCart}>
                <Trash2 size={16} />
                Clear All
              </button>
            )}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            
            <div className="cart-summary-row">
              <span>Subtotal</span>
              <span>KES {getSubtotal().toFixed(2)}</span>
            </div>
            <div className="cart-summary-row">
              <span>Shipping</span>
              <span>{getShipping() === 0 ? 'Free' : `KES ${getShipping().toFixed(2)}`}</span>
            </div>
            <div className="cart-summary-row">
              <span>Tax (16%)</span>
              <span>KES {getTax().toFixed(2)}</span>
            </div>
            
            <div className="cart-summary-total">
              <div className="cart-summary-row">
                <span>Total</span>
                <span className="gradient-text">KES {getGrandTotal().toFixed(2)}</span>
              </div>
            </div>

            <button 
              className="btn-primary checkout-btn"
              onClick={handleCheckout}
            >
              <CreditCard size={20} />
              Proceed to Checkout
            </button>

            <div className="cart-summary-features">
              <div className="feature-item">
                <Truck size={16} />
                <span>Free shipping over KES 2,000</span>
              </div>
              <div className="feature-item">
                <Shield size={16} />
                <span>Secure checkout</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart