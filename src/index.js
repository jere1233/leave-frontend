// src/index.js
import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'

import App from './App'
import store from './store'
import { AuthProvider } from './auth/AuthProvider'  // ✅ Use named import

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider> {/* ✅ Wrap App with AuthProvider */}
      <App />
    </AuthProvider>
  </Provider>
)
