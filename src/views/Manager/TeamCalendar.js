import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CListGroup,
  CListGroupItem,
  CSpinner,
  CContainer,
} from '@coreui/react'

const TeamCalendar = () => {
  const [teamLeaves, setTeamLeaves] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get('/api/team-leaves/')
      .then((res) => {
        if (Array.isArray(res.data)) {
          setTeamLeaves(res.data)
        } else {
          console.error('Expected array, got:', res.data)
          setTeamLeaves([])
        }
      })
      .catch((err) => {
        console.error('Failed to fetch team leaves:', err)
        setTeamLeaves([])
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <CContainer className="py-4">
      <CCard className="shadow-sm">
        <CCardHeader className="bg-primary text-white fw-bold">
          Team Leave Calendar
        </CCardHeader>
        <CCardBody>
          {loading ? (
            <div className="text-center py-5">
              <CSpinner color="primary" />
            </div>
          ) : teamLeaves.length === 0 ? (
            <div className="text-center text-muted">No team leave records found.</div>
          ) : (
            <CListGroup flush>
              {teamLeaves.map((entry) => (
                <CListGroupItem key={entry.id} className="d-flex flex-column gap-1">
                  <div className="fw-semibold">
                    👤 {entry.employee || 'Unknown Employee'}
                  </div>
                  <div>
                    📅 <strong>{entry.leave_type?.name || 'Leave'}</strong>{' '}
                    from <strong>{entry.start_date}</strong> to{' '}
                    <strong>{entry.end_date}</strong>
                  </div>
                </CListGroupItem>
              ))}
            </CListGroup>
          )}
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default TeamCalendar
