// src/components/admin/MessageManagement.js
import React, { useState } from 'react'
import { Search, Mail, MailOpen, Trash2, Reply, Send, Calendar, AlertCircle } from 'lucide-react'
import { useMessages } from '../../hooks/useMessages'
import { markMessageAsRead, replyToMessage, deleteMessage } from '../../services/messages'

const MessageManagement = () => {
  const { messages, loading, error } = useMessages()
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [replyingTo, setReplyingTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [busyId, setBusyId] = useState(null)

  const filteredMessages = messages.filter(msg => {
    const matchesSearch =
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || msg.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Just now'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    })
  }

  const handleReply = (id) => {
    const msg = messages.find(m => m.id === id)
    setReplyingTo(id)
    setReplyText(msg?.reply || '')
  }

  const sendReply = async () => {
    if (!replyText.trim() || !replyingTo) return
    setBusyId(replyingTo)
    try {
      await replyToMessage(replyingTo, replyText)
      setReplyingTo(null)
      setReplyText('')
    } catch (err) {
      console.error('Reply failed:', err)
      alert('Failed to send reply')
    } finally {
      setBusyId(null)
    }
  }

  const handleMarkRead = async (id) => {
    setBusyId(id)
    try {
      await markMessageAsRead(id)
    } catch (err) {
      console.error('Mark read failed:', err)
    } finally {
      setBusyId(null)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this message?')) return
    setBusyId(id)
    try {
      await deleteMessage(id)
    } catch (err) {
      console.error('Delete failed:', err)
      alert('Failed to delete message')
    } finally {
      setBusyId(null)
    }
  }

  const unreadCount = messages.filter(m => m.status === 'unread').length

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="admin-spinner" />
        <p>Loading messages...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="admin-empty">
        <AlertCircle size={48} />
        <h3>Couldn't load messages</h3>
        <p>{error}</p>
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard-header">
        <div>
          <h1 className="admin-dashboard-title">Messages</h1>
          <p className="admin-dashboard-subtitle">
            {unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'} · {messages.length} total
          </p>
        </div>
      </div>

      <div className="admin-filters">
        <div className="admin-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search messages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="admin-filter-select">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Messages</option>
            <option value="unread">Unread</option>
            <option value="read">Read</option>
          </select>
        </div>
      </div>

      {filteredMessages.length === 0 ? (
        <div className="admin-empty">
          <Mail size={48} />
          <h3>No messages found</h3>
          <p>{messages.length === 0 ? 'Customer messages will appear here' : 'Try adjusting your filters'}</p>
        </div>
      ) : (
        <div className="admin-messages-list">
          {filteredMessages.map(msg => (
            <div
              key={msg.id}
              className={`admin-message-card ${msg.status === 'unread' ? 'unread' : ''}`}
            >
              <div className="admin-message-header">
                <div className="admin-message-icon">
                  {msg.status === 'unread' ? (
                    <Mail size={16} color="#FF6B00" />
                  ) : (
                    <MailOpen size={16} color="rgba(255,255,255,0.3)" />
                  )}
                </div>
                <div className="admin-message-info">
                  <div className="admin-message-top">
                    <span className="admin-message-name">{msg.name}</span>
                    {msg.status === 'unread' && (
                      <span className="admin-message-badge">NEW</span>
                    )}
                  </div>
                  <div className="admin-message-email">{msg.email}</div>
                </div>
                <div className="admin-message-meta">
                  <span className="admin-message-date">
                    <Calendar size={12} /> {formatDate(msg.createdAt)}
                  </span>
                </div>
              </div>

              <div className="admin-message-body">
                <div className="admin-message-subject">{msg.subject}</div>
                <p className="admin-message-text">{msg.message}</p>

                {msg.reply && (
                  <div className="admin-message-reply">
                    <strong>Your reply:</strong> {msg.reply}
                  </div>
                )}

                {replyingTo === msg.id && (
                  <div className="admin-message-reply-box">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Type your reply..."
                      rows={4}
                    />
                    <div className="admin-message-reply-actions">
                      <button
                        onClick={sendReply}
                        className="admin-btn-primary"
                        disabled={busyId === msg.id}
                      >
                        <Send size={14} /> {busyId === msg.id ? 'Sending...' : 'Send'}
                      </button>
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="admin-btn-secondary"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="admin-message-actions">
                {msg.status === 'unread' && (
                  <button onClick={() => handleMarkRead(msg.id)} disabled={busyId === msg.id}>
                    <MailOpen size={14} /> Mark Read
                  </button>
                )}
                <button onClick={() => handleReply(msg.id)}>
                  <Reply size={14} /> Reply
                </button>
                <button
                  onClick={() => handleDelete(msg.id)}
                  className="danger"
                  disabled={busyId === msg.id}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MessageManagement