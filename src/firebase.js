// src/firebase.js
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC3SyiJ5dQAnRBtBe4eLcHAzzjstgkdh_s",
  authDomain: "fun-fungi.firebaseapp.com",
  projectId: "fun-fungi",
  storageBucket: "fun-fungi.firebasestorage.app",
  messagingSenderId: "362846262328",
  appId: "1:362846262328:web:8709ba69cbf791512982cd",
  measurementId: "G-RZ62YXTN3P"
}

const app = initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)