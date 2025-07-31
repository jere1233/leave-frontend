// src/views/HR/LeavePolicies.js
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {
  CContainer,
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CFormInput,
  CButton,
  CFormSelect,
  CSpinner,
  CAlert,
  CRow,
  CCol,
} from '@coreui/react'

const LeavePolicies = () => {
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [saving, setSaving] = useState(false)

  // For new policy form
  const [newPolicy, setNewPolicy] = useState({
    leave_type: '',
    accrual_rate: '',
    max_accrual: '',
    carry_forward: 'No',
  })

  // Fetch policies from API
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
      .get('/api/leave-policies/', getAuthHeaders())
      .then((res) => setPolicies(res.data))
      .catch((err) => setError('Failed to load leave policies.'))
      .finally(() => setLoading(false))
  }, [])

  // Handle input change for existing policies (edit inline)
  const handlePolicyChange = (id, field, value) => {
    setPolicies((prev) =>
      prev.map((policy) => (policy.id === id ? { ...policy, [field]: value } : policy)),
    )
  }

  // Save updated policy
  const handleSave = (id) => {
    const policy = policies.find((p) => p.id === id)
    if (!policy) return

    setSaving(true)
    axios
      .patch(`/api/leave-policies/${id}/`, policy, getAuthHeaders())
      .then(() => {
        alert('Policy saved.')
      })
      .catch(() => {
        alert('Failed to save policy.')
      })
      .finally(() => setSaving(false))
  }

  // Handle new policy input changes
  const handleNewPolicyChange = (field, value) => {
    setNewPolicy((prev) => ({ ...prev, [field]: value }))
  }

  // Add new policy
  const handleAddPolicy = () => {
    if (
      !newPolicy.leave_type.trim() ||
      newPolicy.accrual_rate === '' ||
      newPolicy.max_accrual === ''
    ) {
      alert('Please fill all required fields for new policy.')
      return
    }

    setSaving(true)
    axios
      .post('/api/leave-policies/', newPolicy, getAuthHeaders())
      .then((res) => {
        setPolicies((prev) => [...prev, res.data])
        setNewPolicy({
          leave_type: '',
          accrual_rate: '',
          max_accrual: '',
          carry_forward: 'No',
        })
      })
      .catch(() => alert('Failed to add new policy.'))
      .finally(() => setSaving(false))
  }

  if (loading)
    return (
      <div className="text-center py-5">
        <CSpinner color="primary" />
      </div>
    )

  if (error)
    return (
      <CAlert color="danger" className="text-center">
        {error}
      </CAlert>
    )

  return (
    <CContainer className="py-4">
      <CCard className="shadow-sm border-0 rounded-4">
        <CCardHeader className="fw-bold">Manage Leave Policies & Accrual Rules</CCardHeader>
        <CCardBody>
          <CTable striped hover responsive>
            <CTableHead>
              <CTableRow>
                <CTableHeaderCell>Leave Type</CTableHeaderCell>
                <CTableHeaderCell>Accrual Rate (days/month)</CTableHeaderCell>
                <CTableHeaderCell>Max Accrual (days)</CTableHeaderCell>
                <CTableHeaderCell>Carry Forward Allowed</CTableHeaderCell>
                <CTableHeaderCell>Actions</CTableHeaderCell>
              </CTableRow>
            </CTableHead>
            <CTableBody>
              {policies.map((policy) => (
                <CTableRow key={policy.id}>
                  <CTableDataCell>
                    <CFormInput
                      type="text"
                      value={policy.leave_type}
                      onChange={(e) => handlePolicyChange(policy.id, 'leave_type', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      min="0"
                      step="0.1"
                      value={policy.accrual_rate}
                      onChange={(e) => handlePolicyChange(policy.id, 'accrual_rate', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormInput
                      type="number"
                      min="0"
                      step="1"
                      value={policy.max_accrual}
                      onChange={(e) => handlePolicyChange(policy.id, 'max_accrual', e.target.value)}
                    />
                  </CTableDataCell>
                  <CTableDataCell>
                    <CFormSelect
                      value={policy.carry_forward ? 'Yes' : 'No'}
                      onChange={(e) =>
                        handlePolicyChange(policy.id, 'carry_forward', e.target.value === 'Yes')
                      }
                    >
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </CFormSelect>
                  </CTableDataCell>
                  <CTableDataCell>
                    <CButton
                      color="primary"
                      size="sm"
                      disabled={saving}
                      onClick={() => handleSave(policy.id)}
                    >
                      Save
                    </CButton>
                  </CTableDataCell>
                </CTableRow>
              ))}

              {/* New Policy Row */}
              <CTableRow>
                <CTableDataCell>
                  <CFormInput
                    type="text"
                    placeholder="Leave Type"
                    value={newPolicy.leave_type}
                    onChange={(e) => handleNewPolicyChange('leave_type', e.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="number"
                    min="0"
                    step="0.1"
                    placeholder="Accrual Rate"
                    value={newPolicy.accrual_rate}
                    onChange={(e) => handleNewPolicyChange('accrual_rate', e.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormInput
                    type="number"
                    min="0"
                    step="1"
                    placeholder="Max Accrual"
                    value={newPolicy.max_accrual}
                    onChange={(e) => handleNewPolicyChange('max_accrual', e.target.value)}
                  />
                </CTableDataCell>
                <CTableDataCell>
                  <CFormSelect
                    value={newPolicy.carry_forward}
                    onChange={(e) => handleNewPolicyChange('carry_forward', e.target.value)}
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </CFormSelect>
                </CTableDataCell>
                <CTableDataCell>
                  <CButton
                    color="success"
                    size="sm"
                    disabled={saving}
                    onClick={handleAddPolicy}
                  >
                    Add
                  </CButton>
                </CTableDataCell>
              </CTableRow>
            </CTableBody>
          </CTable>
        </CCardBody>
      </CCard>
    </CContainer>
  )
}

export default LeavePolicies
