// src/views/auth/Signup.js

import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { signupService } from '../../auth/signupService'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CForm,
  CFormInput,
  CFormSelect,
  CButton,
  CAlert,
} from '@coreui/react'

const Signup = () => {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
    role: 'EMPLOYEE',
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      const payload = {
        ...form,
        role: form.role.toUpperCase(), // ensure backend format
      }

      const response = await signupService(payload)
      console.log('Signup success:', response)
      setSuccess(true)

      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      console.error('Signup error:', err)
      if (err.response?.data) {
        const messages = Object.entries(err.response.data)
          .map(([field, msg]) => `${field}: ${Array.isArray(msg) ? msg.join(', ') : msg}`)
          .join(' | ')
        setError(messages)
      } else {
        setError('Signup failed. Please try again.')
      }
    }
  }

  return (
    <CContainer className="d-flex align-items-center justify-content-center min-vh-100">
      <CCard style={{ width: '450px' }}>
        <CCardHeader>
          <h4>Create an Account</h4>
        </CCardHeader>
        <CCardBody>
          {error && <CAlert color="danger">{error}</CAlert>}
          {success && <CAlert color="success">Registration successful! Redirecting to login...</CAlert>}

          <CForm onSubmit={handleSubmit}>
            <CFormInput
              label="Username"
              name="username"
              placeholder="jsmith"
              value={form.username}
              onChange={handleChange}
              required
              className="mb-3"
            />

            <CFormInput
              label="Email"
              type="email"
              name="email"
              placeholder="jsmith@example.com"
              value={form.email}
              onChange={handleChange}
              required
              className="mb-3"
            />

            <CFormInput
              label="Password"
              type="password"
              name="password"
              placeholder="•••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="mb-3"
            />

            <CFormInput
              label="Confirm Password"
              type="password"
              name="password2"
              placeholder="•••••••••"
              value={form.password2}
              onChange={handleChange}
              required
              className="mb-3"
            />

            <CFormSelect
              label="Role"
              name="role"
              value={form.role}
              onChange={handleChange}
              className="mb-3"
              options={[
                { label: 'Employee', value: 'EMPLOYEE' },
                { label: 'Manager', value: 'MANAGER' },
                { label: 'HR', value: 'HR' },
              ]}
            />

            <CButton type="submit" color="primary" className="w-100">
              Sign Up
            </CButton>
          </CForm>

          <div className="text-center mt-3">
            <small>
              Already have an account? <Link to="/login">Log in</Link>
            </small>
          </div>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Signup
