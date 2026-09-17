import React from 'react'
import { Link } from 'react-router-dom'
import { Package, Clock, CheckCircle, XCircle, Truck, Store } from 'lucide-react'
import { useMyOrders } from '../hooks/useMyOrders'
import '../styles/cart.css'

const Orders = () => {
  const { orders, loading, error } = useMyOrders()

  const getStatusStyle = (status) => {
    const styles = {
      Pending: { color: '#FFEA00', bg: 'rgba(255,234,0,0.1)', icon: Clock },
      Processing: { color: '#FF6B00', bg: 'rgba(255,107,0,0.1)', icon: Package },
      'Out for Delivery': { color: '#2196F3', bg: 'rgba(33,150,243,0.1)', icon: Truck },
      Completed: { color: '#00E676', bg: 'rgba(0,230,118,0.1)', icon: CheckCircle },
      Cancelled: { color: '#FF1744', bg: 'rgba(255,23,68,0.1)', icon: XCircle }
    }
    return styles[status] || { color: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.05)', icon: Clock }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  if (loading) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Loading orders...</p>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <XCircle size={48} color="#FF1744" />
            <h2>Couldn't load orders</h2>
            <p>{error}</p>
          </div>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <div className="cart-empty">
            <Package size={48} />
            <h2>No Orders Yet</h2>
            <p>Your sweet journey hasn't started. Place your first order!</p>
            <Link to="/shop" className="btn-primary">Start Shopping</Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="cart-page">
      <div className="container">
        <div className="cart-header">
          <h1 style={{ color: '#FF6B00', fontSize: '2rem', fontWeight: 800 }}>My Orders</h1>
          <span className="cart-item-count">({orders.length})</span>
        </div>

        <div className="user-orders-list">
          {orders.map(order => {
            const status = getStatusStyle(order.status)
            const StatusIcon = status.icon

            return (
              <div key={order.id} className="user-order-card">
                <div className="user-order-header">
                  <div>
                    <div className="user-order-number">{order.orderNumber}</div>
                    <div className="user-order-date">{formatDate(order.createdAt)}</div>
                  </div>
                  <div className="user-order-status" style={{ color: status.color, background: status.bg }}>
                    <StatusIcon size={14} />
                    {order.status}
                  </div>
                </div>

                <div className="user-order-body">
                  <div className="user-order-type">
                    {order.orderType === 'pickup' ? <Store size={14} /> : <Truck size={14} />}
                    <span style={{ textTransform: 'capitalize' }}>{order.orderType}</span>
                    <span className="user-order-sep">·</span>
                    <span>{order.paymentMethod}</span>
                  </div>

                  <div className="user-order-items">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="user-order-item">
                        <span>{item.name} × {item.quantity}</span>
                        <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                      </div>
                    ))}
                  </div>

                  <div className="user-order-total">
                    <span>Total</span>
                    <span style={{ color: '#FF6B00', fontWeight: 700 }}>
                      KES {order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Orders