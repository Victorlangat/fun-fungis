// src/hooks/useMyMessages.js
import { useState, useEffect } from 'react'
import { subscribeToUserMessages } from '../services/messages'

export const useMyMessages = (email) => {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!email) {
      setMessages([])
      setLoading(false)
      return
    }

    const unsubscribe = subscribeToUserMessages(email, (data) => {
      setMessages(data)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [email])

  return { messages, loading }
}