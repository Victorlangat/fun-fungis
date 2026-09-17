// src/hooks/useOrders.js
import { useState, useEffect } from 'react'
import { subscribeToAllOrders } from '../services/orders'

export const useOrders = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    try {
      const unsubscribe = subscribeToAllOrders((data) => {
        setOrders(data)
        setLoading(false)
      })
      return () => unsubscribe()
    } catch (err) {
      console.error('useOrders error:', err)
      setError(err.message)
      setLoading(false)
    }
  }, [])

  return { orders, loading, error }
}