import React from 'react'
import { LayoutDashboard, ShoppingBag, Package, Mail } from 'lucide-react'

const Admin = () => {
  const stats = [
    { title: 'Total Orders', value: '156', icon: ShoppingBag, color: 'rgba(255,107,0,0.15)' },
    { title: 'Revenue', value: 'KES 245,000', icon: LayoutDashboard, color: 'rgba(0,230,118,0.15)' },
    { title: 'Products', value: '8', icon: Package, color: 'rgba(255,23,68,0.15)' },
    { title: 'Messages', value: '12', icon: Mail, color: 'rgba(255,234,0,0.15)' },
  ]

  return (
    <div className="shop-page">
      <div className="container">
        <div className="admin-header">
          <h1 className="gradient-text">Admin Dashboard</h1>
          <p>Manage your store</p>
        </div>

        <div className="admin-stats">
          {stats.map((stat) => (
            <div key={stat.title} className="admin-stat-card">
              <div className="admin-stat-icon" style={{ background: stat.color }}>
                <stat.icon size={24} />
              </div>
              <div className="admin-stat-title">{stat.title}</div>
              <div className="admin-stat-value">{stat.value}</div>
            </div>
          ))}
        </div>

        <div className="admin-recent-orders">
          <h2>Recent Orders</h2>
          {[1, 2, 3].map((order) => (
            <div key={order} className="admin-order-item">
              <div className="admin-order-info">
                <p>Order #{order}</p>
                <p>Customer Name</p>
              </div>
              <div className="admin-order-meta">
                <span className="admin-order-amount">KES 450</span>
                <span className="admin-order-status">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Admin
