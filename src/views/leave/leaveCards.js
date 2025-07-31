import React, { useState, useEffect } from 'react'
import {
  CCard,
  CCardBody,
  CRow,
  CCol,
  CSpinner,
} from '@coreui/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const LeaveStatsCards = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    approvedRequests: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchLeaveStats()
  }, [])

  const fetchLeaveStats = async () => {
    try {
      const token = localStorage.getItem('accessToken')
      if (!token) {
        toast.error('❌ You must be logged in to view statistics.')
        setLoading(false)
        return
      }

      // Fetch user's leave applications
      const response = await axios.get('http://localhost:8000/api/leave-applications/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })

      const leaveRequests = response.data
      const totalRequests = leaveRequests.length
      const approvedRequests = leaveRequests.filter(
        (request) => request.status === 'approved' || request.status === 'Approved'
      ).length

      setStats({
        totalRequests,
        approvedRequests,
      })
    } catch (error) {
      console.error('Error fetching leave statistics:', error)
      toast.error('Error loading leave statistics')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <CRow className="mb-4 g-0">
        <CCol xs={12}>
          <CCard className="border-0 shadow-sm" style={{ borderRadius: '12px' }}>
            <CCardBody className="text-center py-5">
              <CSpinner color="primary" />
              <p className="mt-2 mb-0 text-muted">Loading statistics...</p>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    )
  }

  return (
    <CRow className="mb-4 g-0">
      {/* Total Leave Requests Card */}
      <CCol xs={12} md={6} className="pe-md-2">
        <CCard 
          className="border-0 shadow-sm h-100" 
          style={{ 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white'
          }}
        >
          <CCardBody className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="fs-6 fw-semibold text-white-50 mb-1">
                  Total Leave Requests
                </div>
                <div className="fs-1 fw-bold mb-0">
                  {stats.totalRequests}
                </div>
                <div className="small text-white-75">
                  Applications submitted
                </div>
              </div>
              <div 
                className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px' }}
              >
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                  <polyline points="14,2 14,8 20,8"></polyline>
                  <line x1="16" y1="13" x2="8" y2="13"></line>
                  <line x1="16" y1="17" x2="8" y2="17"></line>
                  <polyline points="10,9 9,9 8,9"></polyline>
                </svg>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Approved Requests Card */}
      <CCol xs={12} md={6} className="ps-md-2 mt-3 mt-md-0">
        <CCard 
          className="border-0 shadow-sm h-100" 
          style={{ 
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            color: 'white'
          }}
        >
          <CCardBody className="p-4">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <div className="fs-6 fw-semibold text-white-50 mb-1">
                  Approved Requests
                </div>
                <div className="fs-1 fw-bold mb-0">
                  {stats.approvedRequests}
                </div>
                <div className="small text-white-75">
                  Successfully approved
                </div>
              </div>
              <div 
                className="bg-white bg-opacity-20 rounded-circle d-flex align-items-center justify-content-center"
                style={{ width: '60px', height: '60px' }}
              >
                <svg 
                  width="28" 
                  height="28" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22,4 12,14.01 9,11.01"></polyline>
                </svg>
              </div>
            </div>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default LeaveStatsCards