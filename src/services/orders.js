// src/services/orders.js
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'

const ORDERS_COLLECTION = 'orders'

// Generate human-readable order number
const generateOrderNumber = (count) => {
  return `ORD-${String(count + 1).padStart(4, '0')}`
}

// Get count of all orders (for order number generation)
export const getOrderCount = async () => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION)
    const snapshot = await getDocs(ordersRef)
    return snapshot.size
  } catch (error) {
    console.error('Error counting orders:', error)
    return 0
  }
}

// Place a new order
export const placeOrder = async (orderData) => {
  try {
    const count = await getOrderCount()
    const orderNumber = generateOrderNumber(count)

    const ordersRef = collection(db, ORDERS_COLLECTION)
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      orderNumber,
      status: 'Pending',
      paymentStatus: 'unpaid',
      statusHistory: [
        { status: 'Pending', at: new Date().toISOString() }
      ],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })

    return { id: docRef.id, orderNumber, ...orderData }
  } catch (error) {
    console.error('Error placing order:', error)
    throw error
  }
}

// Get all orders (for admin)
export const getAllOrders = async () => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION)
    const q = query(ordersRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching orders:', error)
    throw error
  }
}

// Get orders for a specific user
export const getUserOrders = async (userId) => {
  try {
    const ordersRef = collection(db, ORDERS_COLLECTION)
    const q = query(
      ordersRef,
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching user orders:', error)
    throw error
  }
}

// Update order status (admin)
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId)
    const orderSnap = await getDoc(orderRef)

    if (!orderSnap.exists()) {
      throw new Error('Order not found')
    }

    const currentData = orderSnap.data()
    const statusHistory = currentData.statusHistory || []
    statusHistory.push({
      status: newStatus,
      at: new Date().toISOString()
    })

    await updateDoc(orderRef, {
      status: newStatus,
      statusHistory,
      updatedAt: serverTimestamp()
    })

    return { id: orderId, status: newStatus }
  } catch (error) {
    console.error('Error updating order status:', error)
    throw error
  }
}

// Update payment status (admin)
export const updatePaymentStatus = async (orderId, paymentStatus) => {
  try {
    const orderRef = doc(db, ORDERS_COLLECTION, orderId)
    await updateDoc(orderRef, {
      paymentStatus,
      updatedAt: serverTimestamp()
    })
    return { id: orderId, paymentStatus }
  } catch (error) {
    console.error('Error updating payment status:', error)
    throw error
  }
}

// Real-time subscription to all orders (admin)
export const subscribeToAllOrders = (callback) => {
  const ordersRef = collection(db, ORDERS_COLLECTION)
  const q = query(ordersRef, orderBy('createdAt', 'desc'))

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(orders)
  }, (error) => {
    console.error('Orders subscription error:', error)
  })
}

// Real-time subscription to user's orders
export const subscribeToUserOrders = (userId, callback) => {
  const ordersRef = collection(db, ORDERS_COLLECTION)
  const q = query(
    ordersRef,
    where('userId', '==', userId),
    orderBy('createdAt', 'desc')
  )

  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(orders)
  }, (error) => {
    console.error('User orders subscription error:', error)
  })
}