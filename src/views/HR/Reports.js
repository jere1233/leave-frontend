// src/views/HR/Reports.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CContainer,
} from '@coreui/react'

const Reports = () => {
  const [reportData, setReportData] = useState([])

  useEffect(() => {
    axios
      .get('/api/reports/leave-usage/')
      .then((res) => setReportData(res.data))
      .catch((err) => console.error(err))
  }, [])

  return (
    <CContainer className="py-4">
      <CCard className="shadow-sm border-0 rounded-4">
        <CCardHeader className="fw-bold">Leave Usage Report</CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Employee</CTableHeaderCell>
                <CTableHeaderCell>Leave Type</CTableHeaderCell>
                <CTableHeaderCell>Days Taken</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {reportData.map((item, idx) => (
                <CTableRow key={idx}>
                  <CTableDataCell>{item.employee}</CTableDataCell>
                  <CTableDataCell>{item.leave_type}</CTableDataCell>
                  <CTableDataCell>{item.days}</CTableDataCell>
                </CTableRow>
              ))}
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default Reports
