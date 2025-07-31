// src/auth/ProtectedRoute.js

import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'

const ProtectedRoute = ({ children, roles = [] }) => {
  const { user } = useAuth()

  console.log("✅ ProtectedRoute - Current user:", user)
  console.log("🔑 Allowed roles for this route:", roles)

  // Not logged in
  if (!user) {
    console.warn("🚫 Access denied: not logged in")
    return <Navigate to="/login" replace />
  }

  // Normalize roles for case-insensitive comparison
  const normalizedUserRole = (user.role || '').trim().toLowerCase()
  const normalizedAllowedRoles = roles.map(role => role.trim().toLowerCase())

  console.log(`👤 User role normalized: '${normalizedUserRole}'`)
  console.log(`🔒 Allowed roles normalized:`, normalizedAllowedRoles)

  if (roles.length > 0 && !normalizedAllowedRoles.includes(normalizedUserRole)) {
    console.warn(`🚫 Unauthorized: user with role '${user.role}' tried to access restricted route.`)
    return <Navigate to="/unauthorized" replace />
  }

  // Authorized
  return children
}

export default ProtectedRoute
