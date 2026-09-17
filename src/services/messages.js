// src/services/messages.js
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'

const MESSAGES_COLLECTION = 'messages'

// Submit a new message (from contact form)
export const submitMessage = async (messageData) => {
  try {
    const messagesRef = collection(db, MESSAGES_COLLECTION)
    const docRef = await addDoc(messagesRef, {
      ...messageData,
      status: 'unread',
      reply: null,
      repliedAt: null,
      createdAt: serverTimestamp()
    })

    return { id: docRef.id, ...messageData }
  } catch (error) {
    console.error('Error submitting message:', error)
    throw error
  }
}

// Get all messages (for admin)
export const getAllMessages = async () => {
  try {
    const messagesRef = collection(db, MESSAGES_COLLECTION)
    const q = query(messagesRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching messages:', error)
    throw error
  }
}

// Mark as read
export const markMessageAsRead = async (messageId) => {
  try {
    const messageRef = doc(db, MESSAGES_COLLECTION, messageId)
    await updateDoc(messageRef, {
      status: 'read',
      updatedAt: serverTimestamp()
    })
    return messageId
  } catch (error) {
    console.error('Error marking message as read:', error)
    throw error
  }
}

// Reply to message (admin)
export const replyToMessage = async (messageId, replyText) => {
  try {
    const messageRef = doc(db, MESSAGES_COLLECTION, messageId)
    await updateDoc(messageRef, {
      reply: replyText,
      status: 'read',
      repliedAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    })
    return { id: messageId, reply: replyText }
  } catch (error) {
    console.error('Error replying to message:', error)
    throw error
  }
}

// Delete a message
export const deleteMessage = async (messageId) => {
  try {
    const messageRef = doc(db, MESSAGES_COLLECTION, messageId)
    await deleteDoc(messageRef)
    return messageId
  } catch (error) {
    console.error('Error deleting message:', error)
    throw error
  }
}

// Real-time subscription to all messages (admin)
export const subscribeToMessages = (callback) => {
  const messagesRef = collection(db, MESSAGES_COLLECTION)
  const q = query(messagesRef, orderBy('createdAt', 'desc'))

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(messages)
  }, (error) => {
    console.error('Messages subscription error:', error)
  })
}

// Real-time subscription to messages for one email (customer thread)
export const subscribeToUserMessages = (email, callback) => {
  if (!email) {
    callback([])
    return () => {}
  }

  const messagesRef = collection(db, MESSAGES_COLLECTION)
  const q = query(
    messagesRef,
    where('email', '==', email),
    orderBy('createdAt', 'desc')
  )

  return onSnapshot(q, (snapshot) => {
    const messages = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    callback(messages)
  }, (error) => {
    console.error('User messages subscription error:', error)
  })
}