// src/components/MessageThread.js
import React from 'react'
import { MessageSquare, Send, CheckCheck, Clock } from 'lucide-react'

const MessageThread = ({ messages, loading }) => {
  if (loading) {
    return (
      <div className="message-thread-empty">
        <div className="admin-spinner" />
        <p>Loading conversation...</p>
      </div>
    )
  }

  if (!messages || messages.length === 0) {
    return (
      <div className="message-thread-empty">
        <MessageSquare size={32} />
        <p>No messages yet</p>
      </div>
    )
  }

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now'
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return date.toLocaleString('en-GB', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="message-thread">
      {messages.map((msg) => (
        <div key={msg.id} className="message-thread-item">
          {/* Customer's original message */}
          <div className="message-bubble message-from-user">
            <div className="message-bubble-header">
              <span className="message-bubble-subject">{msg.subject}</span>
              <span className="message-bubble-time">{formatTime(msg.createdAt)}</span>
            </div>
            <p className="message-bubble-text">{msg.message}</p>
          </div>

          {/* Admin reply */}
          {msg.reply && (
            <div className="message-bubble message-from-admin">
              <div className="message-bubble-header">
                <span className="message-bubble-sender">
                  <Send size={12} />
                  FunFungi Team
                </span>
                <span className="message-bubble-time">{formatTime(msg.repliedAt)}</span>
              </div>
              <p className="message-bubble-text">{msg.reply}</p>
              <div className="message-bubble-footer">
                <CheckCheck size={14} />
                <span>Replied</span>
              </div>
            </div>
          )}

          {/* Awaiting reply indicator */}
          {!msg.reply && (
            <div className="message-bubble message-pending">
              <Clock size={14} />
              <span>Awaiting reply</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default MessageThread