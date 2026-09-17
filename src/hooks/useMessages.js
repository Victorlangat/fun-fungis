// src/hooks/useMessages.js
import { useState, useEffect } from 'react'
import { subscribeToMessages } from '../services/messages'

export const useMessages = () => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const unsubscribe = subscribeToMessages((data) => {
        setMessages(data)
        setLoading(false)
      })
      return () => unsubscribe()
    } catch (err) {
      console.error('useMessages error:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  return { messages, loading, error }
}