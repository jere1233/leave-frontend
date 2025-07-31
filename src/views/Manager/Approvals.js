import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CContainer,
  CSpinner,
  CAlert,
  CAvatar,
  CRow,
  CCol,
  CButton,
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CFormTextarea,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'

const Approvals = () => {
  const [requests, setRequests] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [comments, setComments] = useState({})
  const [selectedRequest, setSelectedRequest] = useState(null)
  const [visible, setVisible] = useState(false)

  const getAuthHeaders = () => {
    const token = localStorage.getItem('accessToken')
    return {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    }
  }

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/leave-applications/pending_requests/', getAuthHeaders())
      .then((res) => {
        setRequests(Array.isArray(res.data) ? res.data : [])
      })
      .catch((err) => {
        console.error('Error fetching approvals:', err)
        setError('Something went wrong loading leave requests.')
      })
      .finally(() => setLoading(false))
  }, [])

  const handleAction = (id, status) => {
    const comment = comments[id] || ''
    axios
      .post(
        `http://localhost:8000/api/leave-applications/${id}/review/`,
        { status: status.toUpperCase(), reviewer_comments: comment },
        getAuthHeaders(),
      )
      .then(() => {
        setRequests((prev) => prev.filter((req) => req.id !== id))
        setComments((prev) => {
          const updated = { ...prev }
          delete updated[id]
          return updated
        })
        setVisible(false)
        setSelectedRequest(null)
      })
      .catch((err) => {
        // <-- Enhanced error logging added here:
        if (err.response) {
          console.error(`Failed to ${status} leave:`, err.response.data)
          alert(`Could not ${status.toLowerCase()} the request: ${JSON.stringify(err.response.data)}`)
        } else {
          console.error(`Failed to ${status} leave:`, err)
          alert(`Could not ${status.toLowerCase()} the request.`)
        }
      })
  }

  return (
    <CContainer className="py-5">
      {loading ? (
        <div className="text-center py-5">
          <CSpinner color="dark" />
        </div>
      ) : error ? (
        <CAlert color="danger" className="text-center">
          {error}
        </CAlert>
      ) : (
        <CRow className="g-4">
          {requests.map((req) => (
            <CCol key={req.id} sm={12} md={6} xl={4}>
              <CCard
                className="shadow border-0 rounded-4 hover-shadow cursor-pointer"
                style={{ height: '160px' }}
                onClick={() => {
                  setSelectedRequest(req)
                  setVisible(true)
                }}
              >
                <CCardBody className="d-flex align-items-center p-4">
                  <CAvatar size="xl" className="me-4 bg-light">
                    <CIcon icon={cilUser} size="xxl" />
                  </CAvatar>
                  <div>
                    <h5 className="mb-2 fw-bold">{req.employee_name || 'Unknown'}</h5>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      )}

      {/* Leave Request Modal */}
      {selectedRequest && (
        <CModal
          alignment="center"
          visible={visible}
          onClose={() => setVisible(false)}
          backdrop="static"
          className="rounded-4"
          size="md" // this reduces modal width
        >
          <CModalHeader>
            <strong>Leave Request Details</strong>
          </CModalHeader>
          <CModalBody>
            <p><strong>Employee:</strong> {selectedRequest.employee_name}</p>
            <p><strong>Leave Type:</strong> {selectedRequest.leave_type}</p>
            <p><strong>Start Date:</strong> {selectedRequest.start_date}</p>
            <p><strong>End Date:</strong> {selectedRequest.end_date}</p>
            <p><strong>Reason:</strong> {selectedRequest.reason}</p>

            <CFormTextarea
              rows={3}
              className="mt-3"
              placeholder="Add a comment or reason (optional)..."
              value={comments[selectedRequest.id] || ''}
              onChange={(e) =>
                setComments((prev) => ({
                  ...prev,
                  [selectedRequest.id]: e.target.value,
                }))
              }
            />
          </CModalBody>
          <CModalFooter className="d-flex justify-content-between">
            <CButton
              color="success"
              variant="outline"
              onClick={() => handleAction(selectedRequest.id, 'APPROVED')}
            >
              ✅ Approve
            </CButton>
            <CButton
              color="danger"
              variant="outline"
              onClick={() => handleAction(selectedRequest.id, 'REJECTED')}
            >
              ❌ Reject
            </CButton>
            <CButton color="secondary" onClick={() => setVisible(false)}>
              Close
            </CButton>
          </CModalFooter>
        </CModal>
      )}
    </CContainer>
  )
}

export default Approvals
