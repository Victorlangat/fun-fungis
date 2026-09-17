// src/components/admin/AdminDashboard.js
import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ShoppingBag,
  Users,
  DollarSign,
  Package,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  MessageSquare,
  ArrowUpRight
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useOrders } from '../../hooks/useOrders'
import { useProducts } from '../../hooks/useProducts'
import '../../styles/admin.css'

const AdminDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const { orders } = useOrders()
  const { products } = useProducts()

  // Real stats
  const totalOrders = orders.length
  const completedOrders = orders.filter(o => o.status === 'Completed')
  const pendingOrders = orders.filter(o => o.status === 'Pending')
  const processingOrders = orders.filter(o => o.status === 'Processing')
  const cancelledOrders = orders.filter(o => o.status === 'Cancelled')
  const totalRevenue = completedOrders.reduce((sum, o) => sum + (o.total || 0), 0)
  const totalProducts = products.length

  const stats = [
    {
      id: 'orders',
      label: 'Total Orders',
      value: totalOrders.toString(),
      change: `${pendingOrders.length} pending`,
      icon: ShoppingBag,
      color: '#FF6B00',
      bg: 'rgba(255,107,0,0.08)'
    },
    {
      id: 'revenue',
      label: 'Revenue',
      value: `KES ${totalRevenue.toLocaleString()}`,
      change: `${completedOrders.length} completed`,
      icon: DollarSign,
      color: '#00E676',
      bg: 'rgba(0,230,118,0.08)'
    },
    {
      id: 'products',
      label: 'Products',
      value: totalProducts.toString(),
      change: 'In catalog',
      icon: Package,
      color: '#2196F3',
      bg: 'rgba(33,150,243,0.08)'
    },
    {
      id: 'pending',
      label: 'Pending Orders',
      value: pendingOrders.length.toString(),
      change: 'Needs attention',
      icon: Clock,
      color: '#FFEA00',
      bg: 'rgba(255,234,0,0.08)'
    }
  ]

  const recentOrders = orders.slice(0, 4)

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed': return { color: '#00E676', bg: 'rgba(0,230,118,0.1)' }
      case 'Processing': return { color: '#FF6B00', bg: 'rgba(255,107,0,0.1)' }
      case 'Out for Delivery': return { color: '#2196F3', bg: 'rgba(33,150,243,0.1)' }
      case 'Pending': return { color: '#FFEA00', bg: 'rgba(255,234,0,0.1)' }
      case 'Cancelled': return { color: '#FF1744', bg: 'rgba(255,23,68,0.1)' }
      default: return { color: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.05)' }
    }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return '—'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="admin-dashboard-title">Dashboard</h1>
          <p className="admin-dashboard-subtitle">
            Welcome back{user?.name ? `, ${user.name}` : ''} — here's what's happening
          </p>
        </div>
        <div className="admin-dashboard-badge">
          <span className="admin-dashboard-dot" />
          <span>Live</span>
        </div>
      </div>

      <div className="admin-stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <div key={stat.id} className="admin-stat-card">
              <div className="admin-stat-header">
                <div className="admin-stat-icon" style={{ background: stat.bg, color: stat.color }}>
                  <Icon size={20} />
                </div>
                <span className="admin-stat-change" style={{ color: stat.color }}>
                  {stat.change}
                </span>
              </div>
              <div className="admin-stat-value">{stat.value}</div>
              <div className="admin-stat-label">{stat.label}</div>
            </div>
          )
        })}
      </div>

      <div className="admin-dashboard-grid">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">Recent Orders</h2>
            <button className="admin-panel-link" onClick={() => navigate('/admin?tab=orders')}>
              View All <ArrowUpRight size={14} />
            </button>
          </div>

          {recentOrders.length === 0 ? (
            <div className="admin-empty" style={{ padding: '2rem 1rem' }}>
              <ShoppingBag size={32} style={{ opacity: 0.3 }} />
              <p style={{ marginTop: '0.5rem' }}>No orders yet</p>
            </div>
          ) : (
            <div className="admin-orders-list">
              {recentOrders.map((order) => {
                const statusStyle = getStatusColor(order.status)
                return (
                  <div key={order.id} className="admin-order-row">
                    <div className="admin-order-info">
                      <div className="admin-order-id">{order.orderNumber}</div>
                      <div className="admin-order-customer">{order.customer?.name}</div>
                    </div>
                    <div className="admin-order-amount">KES {order.total?.toFixed(0)}</div>
                    <div className="admin-order-status" style={{ color: statusStyle.color, background: statusStyle.bg }}>
                      {order.status}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h2 className="admin-panel-title">Quick Actions</h2>
          </div>

          <div className="admin-actions-grid">
            <button className="admin-action-card" onClick={() => navigate('/admin?tab=catalog')}>
              <Package size={20} style={{ color: '#2196F3' }} />
              <span>Add Product</span>
            </button>
            <button className="admin-action-card" onClick={() => navigate('/admin?tab=orders')}>
              <ShoppingBag size={20} style={{ color: '#FF6B00' }} />
              <span>View Orders</span>
            </button>
            <button className="admin-action-card" onClick={() => navigate('/admin?tab=messages')}>
              <MessageSquare size={20} style={{ color: '#FFEA00' }} />
              <span>Messages</span>
            </button>
            <button className="admin-action-card" onClick={() => navigate('/shop')}>
              <TrendingUp size={20} style={{ color: '#00E676' }} />
              <span>View Store</span>
            </button>
          </div>

          <div className="admin-activity">
            <h3 className="admin-activity-title">Order Breakdown</h3>
            <div className="admin-activity-item">
              <CheckCircle size={14} style={{ color: '#00E676' }} />
              <span>{completedOrders.length} completed</span>
            </div>
            <div className="admin-activity-item">
              <Clock size={14} style={{ color: '#FF6B00' }} />
              <span>{processingOrders.length} processing</span>
            </div>
            <div className="admin-activity-item">
              <ShoppingBag size={14} style={{ color: '#FFEA00' }} />
              <span>{pendingOrders.length} pending</span>
            </div>
            <div className="admin-activity-item">
              <XCircle size={14} style={{ color: '#FF1744' }} />
              <span>{cancelledOrders.length} cancelled</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard