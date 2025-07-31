import React, { useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CForm,
  CFormInput,
  CFormTextarea,
  CButton,
  CRow,
  CCol,
} from '@coreui/react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ApplyLeaveFormModal = ({ visible, onClose }) => {
  const [form, setForm] = useState({
    leave_type: '',
    start_date: '',
    end_date: '',
    reason: '',
  })

  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)

    const token = localStorage.getItem('accessToken')
    if (!token) {
      toast.error('❌ You must be logged in to submit a leave request.')
      setLoading(false)
      return
    }

    const formattedForm = {
      ...form,
      start_date: new Date(form.start_date).toISOString().split('T')[0],
      end_date: new Date(form.end_date).toISOString().split('T')[0],
    }

    axios
      .post('http://localhost:8000/api/leave-applications/', formattedForm, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      })
      .then(() => {
        toast.success('✅ Leave request submitted!')
        setForm({
          leave_type: '',
          start_date: '',
          end_date: '',
          reason: '',
        })
        onClose() // close modal on success
      })
      .catch((error) => {
        console.error('Error submitting leave request:', error.response || error.message)
        if (error.response && error.response.data) {
          toast.error(`Error: ${JSON.stringify(error.response.data)}`)
        } else {
          toast.error('Error submitting leave request')
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <CModal visible={visible} onClose={onClose} size="lg" backdrop="static" scrollable>
      <CModalHeader>
        <CModalTitle>Apply for Leave</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm onSubmit={handleSubmit}>
          <CFormInput
            label="Leave Type"
            placeholder="e.g. Sick Leave, Vacation, Personal"
            value={form.leave_type}
            onChange={(e) => setForm({ ...form, leave_type: e.target.value })}
            required
            className="mb-3"
          />

          <CRow className="mb-3">
            <CCol md={6}>
              <CFormInput
                type="date"
                label="Start Date"
                value={form.start_date}
                onChange={(e) => setForm({ ...form, start_date: e.target.value })}
                required
              />
            </CCol>
            <CCol md={6}>
              <CFormInput
                type="date"
                label="End Date"
                value={form.end_date}
                onChange={(e) => setForm({ ...form, end_date: e.target.value })}
                required
              />
            </CCol>
          </CRow>

          <CFormTextarea
            label="Reason"
            rows={5}
            placeholder="Explain the reason for your leave request..."
            value={form.reason}
            onChange={(e) => setForm({ ...form, reason: e.target.value })}
            required
            className="mb-3"
            style={{ resize: 'none', minHeight: 120, maxHeight: 200 }}
          />

          <CModalFooter>
            <CButton
              color="secondary"
              onClick={onClose}
              disabled={loading}
              type="button"
            >
              Cancel
            </CButton>
            <CButton
              type="submit"
              color="primary"
              disabled={loading}
              style={{ minWidth: 140 }}
            >
              {loading ? 'Submitting...' : 'Submit Leave Request'}
            </CButton>
          </CModalFooter>
        </CForm>
      </CModalBody>
    </CModal>
  )
}

export default ApplyLeaveFormModal
