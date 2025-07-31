// src/auth/useAuth.js
import { useContext } from 'react';
import { AuthContext } from './AuthProvider'; // ✅ Correctly import from AuthProvider

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined || context === null) {
    throw new Error('❌ useAuth must be used within an <AuthProvider>');
  }

  return context;
};

export default useAuth;
