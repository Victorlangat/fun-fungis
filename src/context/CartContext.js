import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart')
    return saved ? JSON.parse(saved) : []
  })

  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('orders')
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders))
  }, [orders])

  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId))
  }

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setCart(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getSubtotal = () => {
    return getTotalPrice()
  }

  const getShipping = () => {
    const subtotal = getTotalPrice()
    return subtotal >= 2000 ? 0 : 200
  }

  const getTax = () => {
    return getTotalPrice() * 0.16
  }

  const getGrandTotal = () => {
    return getTotalPrice() + getShipping() + getTax()
  }

  const placeOrder = (orderData) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cart,
      subtotal: getTotalPrice(),
      shipping: getShipping(),
      tax: getTax(),
      total: getGrandTotal(),
      status: 'Pending',
      createdAt: new Date().toISOString(),
      customer: orderData,
      orderNumber: `#${String(orders.length + 1).padStart(4, '0')}`
    }
    
    setOrders(prev => [newOrder, ...prev])
    clearCart()
    return newOrder
  }

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId)
  }

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    )
  }

  const getAllOrders = () => {
    return orders
  }

  const getOrderCount = () => {
    return orders.length
  }

  const getTotalRevenue = () => {
    return orders.reduce((total, order) => total + order.total, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        orders,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        getTotalPrice,
        getSubtotal,
        getShipping,
        getTax,
        getGrandTotal,
        placeOrder,
        getOrder,
        getAllOrders,
        updateOrderStatus,
        getOrderCount,
        getTotalRevenue
      }}
    >
      {children}
    </CartContext.Provider>
  )
}