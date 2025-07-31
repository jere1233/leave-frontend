import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CSpinner,
  CAlert,
  CAvatar,
  CRow,
  CCol,
  CBadge,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilUser } from '@coreui/icons'
import axios from 'axios'

const ApprovedRequests = () => {
  const [approved, setApproved] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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
      .get('http://localhost:8000/api/leave-applications/approved_requests/', getAuthHeaders())
      .then((res) => {
        setApproved(Array.isArray(res.data) ? res.data : [])
      })
      .catch((err) => {
        console.error('Error fetching approved requests:', err)
        setError('Could not load approved requests.')
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <div>
      {loading ? (
        <div className="text-center py-3">
          <CSpinner color="success" />
        </div>
      ) : error ? (
        <CAlert color="danger" className="text-center">
          {error}
        </CAlert>
      ) : approved.length === 0 ? (
        <div className="text-center text-muted">No approved requests yet.</div>
      ) : (
        <CRow className="g-3">
          {approved.map((req) => (
            <CCol key={req.id} xs={12}>
              <CCard className="border border-success rounded-4 shadow-sm">
                <CCardBody>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <div className="d-flex align-items-center">
                      <CAvatar size="lg" className="me-3 bg-light">
                        <CIcon icon={cilUser} size="xl" />
                      </CAvatar>
                      <div>
                        <h6 className="mb-0 fw-semibold">{req.employee}</h6>
                        <small className="text-success fw-bold">
                          {req.leave_type} • {req.start_date} → {req.end_date}
                        </small>
                      </div>
                    </div>
                    <CBadge color="success" className="fs-6 px-3 py-1 rounded-pill">
                      Approved
                    </CBadge>
                  </div>
                  <div className="mt-2">
                    <strong>Reason:</strong>{' '}
                    <span className="text-muted">{req.reason || '—'}</span>
                  </div>
                </CCardBody>
              </CCard>
            </CCol>
          ))}
        </CRow>
      )}
    </div>
  )
}

export default ApprovedRequests
