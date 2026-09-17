// src/services/products.js
import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  serverTimestamp
} from 'firebase/firestore'
import { db } from '../firebase'

const PRODUCTS_COLLECTION = 'products'

// Get all products
export const getAllProducts = async () => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const q = query(productsRef, orderBy('createdAt', 'desc'))
    const snapshot = await getDocs(q)
    
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

// Get a single product by ID
export const getProductById = async (productId) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId)
    const snapshot = await getDoc(productRef)
    
    if (!snapshot.exists()) {
      throw new Error('Product not found')
    }
    
    return {
      id: snapshot.id,
      ...snapshot.data()
    }
  } catch (error) {
    console.error('Error fetching product:', error)
    throw error
  }
}

// Add a new product (admin only)
export const addProduct = async (productData) => {
  try {
    const productsRef = collection(db, PRODUCTS_COLLECTION)
    const docRef = await addDoc(productsRef, {
      ...productData,
      createdAt: serverTimestamp()
    })
    
    return {
      id: docRef.id,
      ...productData
    }
  } catch (error) {
    console.error('Error adding product:', error)
    throw error
  }
}

// Update a product (admin only)
export const updateProduct = async (productId, updates) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId)
    await updateDoc(productRef, {
      ...updates,
      updatedAt: serverTimestamp()
    })
    
    return { id: productId, ...updates }
  } catch (error) {
    console.error('Error updating product:', error)
    throw error
  }
}

// Delete a product (admin only)
export const deleteProduct = async (productId) => {
  try {
    const productRef = doc(db, PRODUCTS_COLLECTION, productId)
    await deleteDoc(productRef)
    return productId
  } catch (error) {
    console.error('Error deleting product:', error)
    throw error
  }
}