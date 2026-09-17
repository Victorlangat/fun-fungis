// src/pages/Admin.js
import React, { useState, useEffect } from 'react'
import { Navigate, useSearchParams } from 'react-router-dom'
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  Mail
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import AdminDashboard from '../components/admin/AdminDashboard'
import OrderManagement from '../components/admin/OrderManagement'
import CatalogManagement from '../components/admin/CatalogManagement'
import MessageManagement from '../components/admin/MessageManagement'
import '../styles/admin.css'

const Admin = () => {
  const { user, isAdmin, loading } = useAuth()
  const [searchParams, setSearchParams] = useSearchParams()
  const [activeTab, setActiveTab] = useState(searchParams.get('tab') || 'dashboard')

  // Sync tab with URL
  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab && tab !== activeTab) {
      setActiveTab(tab)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams])

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSearchParams({ tab: tabId })
  }

  // Loading state
  if (loading) {
    return (
      <div className="admin-page">
        <div className="container">
          <div className="admin-loading">
            <div className="admin-spinner" />
            <p>Checking access...</p>
          </div>
        </div>
      </div>
    )
  }

  // Protect route
  if (!user || !isAdmin()) {
    return <Navigate to="/" replace />
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'catalog', label: 'Catalog', icon: Package },
    { id: 'messages', label: 'Messages', icon: Mail }
  ]

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrderManagement />
      case 'catalog':
        return <CatalogManagement />
      case 'messages':
        return <MessageManagement />
      default:
        return <AdminDashboard />
    }
  }

  return (
    <div className="admin-page">
      <div className="container">
        {/* Tabs */}
        <div className="admin-tabs">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                className={`admin-tab ${isActive ? 'active' : ''}`}
                onClick={() => handleTabChange(tab.id)}
              >
                <Icon size={16} />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Content */}
        <div key={activeTab} className="admin-tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Admin