// src/views/HR/LeaveTypes.js

import React from 'react'
import { CContainer, CRow, CCol, CCard, CCardBody } from '@coreui/react'
import LeaveTypeManager from '../HR/LeaveTypeManager'

const LeaveTypes = () => {
  return (
    <CContainer className="py-4">
      {/* Cards Summary */}
      <CRow className="mb-4">
        <CCol md={6}>
          <CCard
            className="text-white bg-primary shadow-lg border-0"
            style={{ minHeight: '200px', borderRadius: '20px' }}
          >
            <CCardBody className="d-flex flex-column justify-content-center align-items-start">
              <h5 className="fw-bold mb-2">Total Leave Types</h5>
              <h1 style={{ fontSize: '3rem' }}>6</h1> {/* can be dynamic */}
              <p className="mt-2">Configured types of leave</p>
            </CCardBody>
          </CCard>
        </CCol>

        <CCol md={6}>
          <CCard
            className="text-white bg-success shadow-lg border-0"
            style={{ minHeight: '200px', borderRadius: '20px' }}
          >
            <CCardBody className="d-flex flex-column justify-content-center align-items-start">
              <h5 className="fw-bold mb-2">Pending Requests</h5>
              <h1 style={{ fontSize: '3rem' }}>12</h1>
              <p className="mt-2">Leave requests awaiting HR action</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Leave Type Manager */}
      <LeaveTypeManager />
    </CContainer>
  )
}

export default LeaveTypes
