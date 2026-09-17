// src/hooks/useMyOrders.js
import { useState, useEffect } from 'react'
import { subscribeToUserOrders } from '../services/orders'
import { useAuth } from '../context/AuthContext'

export const useMyOrders = () => {
  const { user } = useAuth()
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user) {
      setOrders([])
      setLoading(false)
      return
    }

    try {
      const unsubscribe = subscribeToUserOrders(user.id, (data) => {
        setOrders(data)
        setLoading(false)
      })
      return () => unsubscribe()
    } catch (err) {
      console.error('useMyOrders error:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [user])

  return { orders, loading, error }
}