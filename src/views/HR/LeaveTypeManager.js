// src/components/HR/LeaveTypeManager.js

import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CFormInput,
  CButton,
  CListGroup,
  CListGroupItem,
  CRow,
  CCol,
} from '@coreui/react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import axios from 'axios'

const LeaveTypeManager = () => {
  const [types, setTypes] = useState([])
  const [name, setName] = useState('')
  const [editingId, setEditingId] = useState(null)

  useEffect(() => {
    fetchTypes()
  }, [])

  const fetchTypes = () => {
    axios
      .get('/api/leave-types/')
      .then((res) => setTypes(res.data))
      .catch(() => toast.error('Failed to load leave types.'))
  }

  const handleAddOrUpdate = () => {
    if (!name.trim()) return

    if (editingId) {
      axios
        .put(`/api/leave-types/${editingId}/`, { name })
        .then(() => {
          toast.success('Leave type updated successfully.')
          setName('')
          setEditingId(null)
          fetchTypes()
        })
        .catch(() => toast.error('Failed to update leave type.'))
    } else {
      axios
        .post('/api/leave-types/', { name })
        .then(() => {
          toast.success('Leave type added successfully.')
          setName('')
          fetchTypes()
        })
        .catch(() => toast.error('Failed to add leave type.'))
    }
  }

  const handleEdit = (type) => {
    setName(type.name)
    setEditingId(type.id)
  }

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this leave type?')) {
      axios
        .delete(`/api/leave-types/${id}/`)
        .then(() => {
          toast.success('Leave type deleted successfully.')
          fetchTypes()
        })
        .catch(() => toast.error('Failed to delete leave type.'))
    }
  }

  return (
    <>
      <ToastContainer />
      <CCard className="shadow-sm border-0 rounded-4 mt-4">
        <CCardHeader className="fw-bold fs-5 bg-light">
          Manage Leave Types
        </CCardHeader>
        <CCardBody>
          <CRow className="mb-3 g-2 align-items-end">
            <CCol xs={9}>
              <CFormInput
                placeholder="Enter leave type"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </CCol>
            <CCol xs={3}>
              <CButton
                color={editingId ? 'warning' : 'primary'}
                onClick={handleAddOrUpdate}
                className="w-100 fw-semibold"
              >
                {editingId ? 'Update' : 'Add'}
              </CButton>
            </CCol>
          </CRow>

          <CListGroup>
            {Array.isArray(types) && types.length > 0 ? (
              types.map((lt) => (
                <CListGroupItem
                  key={lt.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  <span>{lt.name}</span>
                  <div>
                    <CButton
                      size="sm"
                      color="info"
                      className="me-2"
                      onClick={() => handleEdit(lt)}
                    >
                      Edit
                    </CButton>
                    <CButton
                      size="sm"
                      color="danger"
                      onClick={() => handleDelete(lt.id)}
                    >
                      Delete
                    </CButton>
                  </div>
                </CListGroupItem>
              ))
            ) : (
              <CListGroupItem>No leave types configured yet.</CListGroupItem>
            )}
          </CListGroup>
        </CCardBody>
      </CCard>
    </>
  )
}

export default LeaveTypeManager
