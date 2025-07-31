import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { loginService } from '../../auth/loginService'
import useAuth from '../../auth/useAuth'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CButton,
  CAlert,
} from '@coreui/react'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMsg, setErrorMsg] = useState('')
  const navigate = useNavigate()
  const { setUser } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    setErrorMsg('') // Clear previous errors
    try {
      const authData = await loginService({ email, password })

      // Validate structure
      if (
        !authData ||
        !authData.access ||
        !authData.refresh ||
        !authData.user ||
        !authData.user.role
      ) {
        throw new Error('Invalid login response structure')
      }

      // Store user info and redirect
      setUser(authData.user)

      // Optionally store tokens
      localStorage.setItem('accessToken', authData.access)
      localStorage.setItem('refreshToken', authData.refresh)

      navigate(`/${authData.user.role.toLowerCase()}`)
    } catch (error) {
      console.error('Login error:', error)

      if (error?.email || error?.password) {
        const emailErr = error.email?.[0] || ''
        const passErr = error.password?.[0] || ''
        setErrorMsg(`${emailErr} ${passErr}`.trim())
      } else if (error?.detail) {
        setErrorMsg(error.detail)
      } else {
        setErrorMsg('Login failed. Please check your credentials.')
      }
    }
  }

  return (
    <CContainer className="d-flex align-items-center justify-content-center min-vh-100">
      <CCard style={{ width: '400px' }}>
        <CCardHeader>
          <h4>Login</h4>
        </CCardHeader>
        <CCardBody>
          <CForm onSubmit={handleLogin}>
            {errorMsg && <CAlert color="danger">{errorMsg}</CAlert>}

            <CFormInput
              type="email"
              label="Email"
              placeholder="Enter email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="mb-3"
            />

            <CFormInput
              type="password"
              label="Password"
              placeholder="Enter password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
              className="mb-3"
            />

            <CButton type="submit" color="primary" className="w-100">
              Login
            </CButton>
          </CForm>

          <div className="text-center mt-3">
            <small>
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </small>
          </div>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Login
