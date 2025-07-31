import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CContainer,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
} from '@coreui/react'
import { FaHourglassHalf, FaCheckCircle, FaClipboardList } from 'react-icons/fa'
import axios from 'axios'
import Approvals from './Approvals'
import ApprovedRequests from './ApprovedRequests'

const ManagerBoard = () => {
  const [showPendingModal, setShowPendingModal] = useState(false)
  const [showApprovedModal, setShowApprovedModal] = useState(false)

  const [pendingCount, setPendingCount] = useState(0)
  const [approvedCount, setApprovedCount] = useState(0)

  // Helper to get auth headers with token
  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken')
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  }

  // Fetch pending count
  const fetchPendingCount = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/leave-applications/pending_requests/', getAuthHeaders())
      setPendingCount(Array.isArray(res.data) ? res.data.length : 0)
    } catch (err) {
      console.error('Failed to fetch pending requests count:', err)
      setPendingCount(0)
    }
  }

  // Fetch approved count
  const fetchApprovedCount = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/leave-applications/approved_requests/', getAuthHeaders())
      setApprovedCount(Array.isArray(res.data) ? res.data.length : 0)
    } catch (err) {
      console.error('Failed to fetch approved requests count:', err)
      setApprovedCount(0)
    }
  }

  // Fetch counts on component mount
  useEffect(() => {
    fetchPendingCount()
    fetchApprovedCount()
  }, [])

  const openPendingModal = () => setShowPendingModal(true)
  const closePendingModal = () => setShowPendingModal(false)

  const openApprovedModal = () => setShowApprovedModal(true)
  const closeApprovedModal = () => setShowApprovedModal(false)

  return (
    <CContainer className="py-5">
      <CRow className="g-4">
        {/* Pending Requests Card */}
        <CCol md={6}>
          <CCard
            className="rounded-4 shadow-lg h-100"
            style={{
              background: 'linear-gradient(135deg, #FFB347 0%, #FFCC33 100%)', // warm gold gradient
              color: 'white',
              border: 'none',
            }}
          >
            <CCardBody className="text-center">
              <FaHourglassHalf size={48} className="mb-3" />
              <h4 className="fw-bold">Pending Requests</h4>
              <p className="fs-1 fw-semibold mb-0">{pendingCount}</p>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Approved Requests Card */}
        <CCol md={6}>
          <CCard
            className="rounded-4 shadow-lg h-100"
            style={{
              background: 'linear-gradient(135deg, #4CAF50 0%, #087f23 100%)', // rich green gradient
              color: 'white',
              border: 'none',
            }}
          >
            <CCardBody className="text-center">
              <FaCheckCircle size={48} className="mb-3" />
              <h4 className="fw-bold">Approved Requests</h4>
              <p className="fs-1 fw-semibold mb-0">{approvedCount}</p>
            </CCardBody>
          </CCard>
        </CCol>

        {/* Review Requests Card */}
        <CCol md={12}>
          <CCard className="border-start border-4 border-primary rounded-4 shadow-lg h-100 d-flex flex-column justify-content-between">
            <CCardBody className="d-flex flex-column justify-content-between">
              <div className="text-center mb-4">
                <FaClipboardList size={48} className="text-primary mb-3" />
                <h4 className="fw-bold text-primary">Review Leave Requests</h4>
                <p className="text-muted">Manage both pending and approved leave requests.</p>
              </div>

              <div className="d-flex justify-content-end gap-2">
                <CButton
                  color="primary"
                  size="lg"
                  onClick={openPendingModal}
                  className="d-flex align-items-center"
                >
                  <span className="me-2">View Pending</span>
                </CButton>
                <CButton
                  color="success"
                  size="lg"
                  onClick={openApprovedModal}
                  className="d-flex align-items-center"
                >
                  <span className="me-2">View Approved</span>
                </CButton>
              </div>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>

      {/* Pending Approvals Modal */}
      <CModal
        alignment="center"
        visible={showPendingModal}
        onClose={closePendingModal}
        size="lg"
        backdrop="static"
        scrollable
      >
        <CModalHeader>
          <strong>Pending Leave Approvals</strong>
        </CModalHeader>
        <CModalBody>
          <Approvals />
        </CModalBody>
        <CModalFooter className="d-flex justify-content-end">
          <CButton color="secondary" onClick={closePendingModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* Approved Requests Modal */}
      <CModal
        alignment="center"
        visible={showApprovedModal}
        onClose={closeApprovedModal}
        size="lg"
        backdrop="static"
        scrollable
      >
        <CModalHeader>
          <strong>Approved Leave Requests</strong>
        </CModalHeader>
        <CModalBody>
          <ApprovedRequests />
        </CModalBody>
        <CModalFooter className="d-flex justify-content-end">
          <CButton color="secondary" onClick={closeApprovedModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>
    </CContainer>
  )
}

export default ManagerBoard
