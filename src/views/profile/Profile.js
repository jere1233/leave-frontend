import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthProvider'
import {
  CContainer,
  CCard,
  CCardBody,
  CCardHeader,
  CRow,
  CCol,
  CButton,
} from '@coreui/react'

const Profile = () => {
  const { user, logout } = useContext(AuthContext)

  return (
    <CContainer className="py-5">
      <CRow className="justify-content-center">
        <CCol md={6}>
          <CCard>
            <CCardHeader>
              <h4>My Profile</h4>
            </CCardHeader>
            <CCardBody>
              {user ? (
                <>
                  <p><strong>Username:</strong> {user.username}</p>
                  <p><strong>Role:</strong> {user.role}</p>
                  <CButton color="danger" onClick={logout}>
                    Log Out
                  </CButton>
                </>
              ) : (
                <p>No user info available.</p>
              )}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  )
}

export default Profile
