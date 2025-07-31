import React, { createContext, useState, useEffect } from 'react'
import { jwtDecode } from 'jwt-decode' // ✅ Correct ESM import for Vite
import { getAccessToken, removeTokens } from './authService'

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = getAccessToken()
    if (token) {
      try {
        const decoded = jwtDecode(token)
        console.log('✅ Decoded JWT:', decoded)

        const role =
          decoded.role?.toString() ||
          decoded.user_role?.toString() ||
          decoded.type?.toString() ||
          ''

        const newUser = {
          id: decoded.user_id || decoded.id || null,
          username: decoded.username || decoded.name || decoded.email || '',
          role: role.toLowerCase().trim(),
        }

        console.log('👤 Setting user in context:', newUser)

        setUser(newUser)
      } catch (error) {
        console.error('❌ Invalid token:', error)
        removeTokens()
        setUser(null)
      }
    }
  }, [])

  const logout = () => {
    removeTokens()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
