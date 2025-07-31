import React, { useState } from 'react'
import axios from 'axios'
import { CCard, CCardBody } from '@coreui/react'

const LeaveHistory = () => {
  const [leaves, setLeaves] = useState(null) // null means not fetched yet
  const [loading, setLoading] = useState(false)
  const [showStatus, setShowStatus] = useState(false)

  const fetchLeaves = async () => {
    setLoading(true)
    try {
      const token = localStorage.getItem('accessToken') // or wherever your token is stored
      console.log('Fetching leave records with token:', token)

      const res = await axios.get('http://127.0.0.1:8000/api/leave-applications/employee/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      console.log('Response from leave API:', res)
      if (Array.isArray(res.data)) {
        setLeaves(res.data)
      } else {
        console.error('Expected an array but got:', res.data)
        setLeaves([])
      }
    } catch (err) {
      console.error('Failed to fetch leave history:', err)
      setLeaves([])
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStatus = () => {
    const nextState = !showStatus
    setShowStatus(nextState)
    if (nextState && leaves === null) {
      fetchLeaves()
    }
  }

  const handleWithdraw = async (id) => {
    if (window.confirm('Are you sure you want to withdraw this leave request?')) {
      try {
        const token = localStorage.getItem('accessToken')
        await axios.delete(`http://127.0.0.1:8000/api/leave-applications/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        setLeaves((prev) => prev.filter((leave) => leave.id !== id))
      } catch (err) {
        console.error('Failed to withdraw leave:', err)
        alert('Could not withdraw the leave request.')
      }
    }
  }

  const handleEdit = (id) => {
    alert(`Edit form for leave ID ${id} goes here.`)
  }

  return (
    <CCard
      style={{
        borderRadius: 20,
        background: 'linear-gradient(135deg, #fce3ec, #ffe8cc)',
      }}
    >
      <CCardBody style={{ padding: '30px 20px', minHeight: '100%' }}>
        <div className="text-center mb-4">
          <button
            className="btn fw-bold"
            style={{
              backgroundColor: '#ff4081',
              color: '#fff',
              fontSize: '1.1rem',
              padding: '10px 20px',
              borderRadius: '30px',
              border: 'none',
            }}
            onClick={handleToggleStatus}
          >
            Leave Status
          </button>
        </div>

        {showStatus && (
          <>
            {loading ? (
              <p className="text-center text-muted">Loading...</p>
            ) : leaves !== null && leaves.length === 0 ? (
              <p className="text-center text-muted">No leave records found.</p>
            ) : (
              leaves !== null && (
                <ul className="list-unstyled" style={{ paddingLeft: 0 }}>
                  {leaves.map((leave) => (
                    <li
                      key={leave.id}
                      className="mb-4 p-3 rounded shadow-sm"
                      style={{
                        backgroundColor: '#fff',
                        borderLeft: `6px solid ${
                          leave.status.toLowerCase() === 'approved'
                            ? '#4caf50'
                            : leave.status.toLowerCase() === 'rejected'
                            ? '#f44336'
                            : '#ff9800'
                        }`,
                      }}
                    >
                      <div className="fw-semibold mb-1" style={{ fontSize: '1.1rem' }}>
                        {leave.leave_type?.name || 'Unknown Leave Type'}
                      </div>
                      <div className="mb-1 text-secondary">
                        📅 {leave.start_date} ➝ {leave.end_date}
                      </div>
                      <div className="mb-1 text-secondary">
                        📝 {leave.reason || 'No reason provided'}
                      </div>
                      <div
                        className="fw-medium mb-2"
                        style={{
                          color:
                            leave.status.toLowerCase() === 'approved'
                              ? '#4caf50'
                              : leave.status.toLowerCase() === 'rejected'
                              ? '#f44336'
                              : '#ff9800',
                        }}
                      >
                        Status: {leave.status.charAt(0).toUpperCase() + leave.status.slice(1).toLowerCase()}
                      </div>

                      {leave.status.toLowerCase() === 'pending' && (
                        <div className="d-flex gap-2">
                          <button
                            onClick={() => handleEdit(leave.id)}
                            className="btn btn-outline-primary btn-sm"
                          >
                            ✏️ Edit
                          </button>
                          <button
                            onClick={() => handleWithdraw(leave.id)}
                            className="btn btn-outline-danger btn-sm"
                          >
                            ❌ Withdraw
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              )
            )}
          </>
        )}
      </CCardBody>
    </CCard>
  )
}

export default LeaveHistory
