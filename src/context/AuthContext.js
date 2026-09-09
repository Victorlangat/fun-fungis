import React, { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')
    return savedUser ? JSON.parse(savedUser) : null
  })

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  const login = (email, password) => {
    const isAdmin = email === 'admin@funfungi.co.ke' || email === 'admin@kioski.co.ke'
    const isAdminByPassword = password === 'admin' || password === 'admin123'
    
    const mockUser = {
      id: isAdmin || isAdminByPassword ? '999' : '1',
      email,
      name: isAdmin || isAdminByPassword ? 'Admin User' : 'John Doe',
      role: isAdmin || isAdminByPassword ? 'admin' : 'customer',
    }
    setUser(mockUser)
    return mockUser
  }

  const register = (name, email, password) => {
    const mockUser = {
      id: '1',
      email,
      name,
      role: 'customer',
    }
    setUser(mockUser)
    return mockUser
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  const isAdmin = () => {
    return user?.role === 'admin'
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        isAdmin,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}