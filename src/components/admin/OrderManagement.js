// src/components/admin/OrderManagement.js
import React, { useState } from 'react'
import {
  
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  Package,
  
  XCircle,
  Truck,
  Phone,
  Mail,
  MapPin,
  Store
} from 'lucide-react'
import { useOrders } from '../../hooks/useOrders'
import { updateOrderStatus } from '../../services/orders'

const OrderManagement = () => {
  const { orders, loading, error } = useOrders()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('newest')
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [updatingId, setUpdatingId] = useState(null)

  const statuses = ['all', 'Pending', 'Processing', 'Out for Delivery', 'Completed', 'Cancelled']

  const getStatusStyle = (status) => {
    const styles = {
      Pending: { color: '#FFEA00', bg: 'rgba(255,234,0,0.1)' },
      Processing: { color: '#FF6B00', bg: 'rgba(255,107,0,0.1)' },
      'Out for Delivery': { color: '#2196F3', bg: 'rgba(33,150,243,0.1)' },
      Completed: { color: '#00E676', bg: 'rgba(0,230,118,0.1)' },
      Cancelled: { color: '#FF1744', bg: 'rgba(255,23,68,0.1)' }
    }
    return styles[status] || { color: 'rgba(255,255,255,0.5)', bg: 'rgba(255,255,255,0.05)' }
  }

  const formatDate = (timestamp) => {
    if (!timestamp) return '—'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId)
    try {
      await updateOrderStatus(orderId, newStatus)
    } catch (err) {
      console.error('Status update failed:', err)
      alert('Failed to update status')
    } finally {
      setUpdatingId(null)
    }
  }

  const filteredOrders = orders
    .filter(order => {
      const term = searchTerm.toLowerCase()
      const matchesSearch =
        order.orderNumber?.toLowerCase().includes(term) ||
        order.customer?.name?.toLowerCase().includes(term) ||
        order.customer?.email?.toLowerCase().includes(term)
      const matchesStatus = filterStatus === 'all' || order.status === filterStatus
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt || 0)
      const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt || 0)
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB
    })

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-empty">
        <XCircle size={48} />
        <h3>Couldn't load orders</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="admin-dashboard-title">Orders</h1>
          <p className="admin-dashboard-subtitle">
            {filteredOrders.length} order{filteredOrders.length !== 1 ? 's' : ''} · {orders.filter(o => o.status === 'Pending').length} pending
          </p>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search by order number, customer, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="admin-filter-select">
          <Filter size={14} />
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            {statuses.map(status => (
              <option key={status} value={status}>
                {status === 'all' ? 'All Statuses' : status}
              </option>
            ))}
          </select>
        </div>
        <div className="admin-filter-select">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="admin-empty">
          <Package size={48} />
          <h3>No orders found</h3>
          <p>{orders.length === 0 ? 'Orders will appear here when customers check out' : 'Try adjusting your filters'}</p>
        </div>
      ) : (
        <div className="admin-orders-list">
          {filteredOrders.map(order => {
            const statusStyle = getStatusStyle(order.status)
            const isExpanded = expandedOrder === order.id

            return (
              <div key={order.id} className="admin-order-card">
                <div
                  className="admin-order-card-header"
                  onClick={() => setExpandedOrder(isExpanded ? null : order.id)}
                >
                  <div className="admin-order-card-info">
                    <div className="admin-order-id">{order.orderNumber}</div>
                    <div className="admin-order-customer">{order.customer?.name || 'Unknown'}</div>
                    <div className="admin-order-date">{formatDate(order.createdAt)}</div>
                  </div>

                  <div className="admin-order-card-meta">
                    <div className="admin-order-amount">KES {order.total?.toFixed(2)}</div>
                    <div className="admin-order-status" style={{ color: statusStyle.color, background: statusStyle.bg }}>
                      {order.status}
                    </div>
                    <button className="admin-order-expand">
                      {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="admin-order-card-body">
                    <div className="admin-order-detail-grid">
                      <div>
                        <h4>Customer</h4>
                        <p>{order.customer?.name}</p>
                        <p className="admin-detail-muted"><Mail size={12} style={{ display: 'inline', marginRight: 4 }} />{order.customer?.email}</p>
                        <p className="admin-detail-muted"><Phone size={12} style={{ display: 'inline', marginRight: 4 }} />{order.customer?.phone}</p>
                        {order.orderType === 'delivery' && order.customer?.address && (
                          <p className="admin-detail-muted"><MapPin size={12} style={{ display: 'inline', marginRight: 4 }} />{order.customer.address}, {order.customer.city}</p>
                        )}
                      </div>
                      <div>
                        <h4>Order Info</h4>
                        <p style={{ textTransform: 'capitalize', display: 'flex', alignItems: 'center', gap: 6 }}>
                          {order.orderType === 'pickup' ? <Store size={14} /> : <Truck size={14} />}
                          {order.orderType}
                        </p>
                        <p className="admin-detail-muted">Payment: {order.paymentMethod}</p>
                        <p className="admin-detail-muted">Payment Status: {order.paymentStatus}</p>
                        {order.customer?.notes && (
                          <p className="admin-detail-muted">Notes: {order.customer.notes}</p>
                        )}
                      </div>
                    </div>

                    <div className="admin-order-items">
                      <h4>Items</h4>
                      {order.items?.map((item, idx) => (
                        <div key={idx} className="admin-order-item-row">
                          <span>{item.name} × {item.quantity}</span>
                          <span>KES {(item.price * item.quantity).toLocaleString()}</span>
                        </div>
                      ))}
                      <div className="admin-order-item-total">
                        <span>Total</span>
                        <span>KES {order.total?.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="admin-order-actions">
                      <label>Update Status:</label>
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                        disabled={updatingId === order.id}
                      >
                        {statuses.filter(s => s !== 'all').map(status => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>
                      {updatingId === order.id && <span className="admin-detail-muted">Updating...</span>}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default OrderManagement