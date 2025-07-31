import React, { useEffect, useState } from 'react'
import {
  CAlert,
  CAlertHeading,
  CButton,
  CSpinner
} from '@coreui/react'
import axios from 'axios'

const Alerts = () => {
  const [notifications, setNotifications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/notifications/`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        setNotifications(response.data)
      } catch (err) {
        setError('Failed to load notifications')
      } finally {
        setLoading(false)
      }
    }

    fetchNotifications()
  }, [])

  const getColor = (status) => {
    switch (status) {
      case 'APPROVED':
        return 'success'
      case 'REJECTED':
        return 'danger'
      case 'CANCELLED':
        return 'warning'
      default:
        return 'info'
    }
  }

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }

  return (
    <div className="p-4">
      <h2 className="mb-4">Notifications</h2>

      {loading ? (
        <div className="text-center">
          <CSpinner color="primary" />
        </div>
      ) : error ? (
        <CAlert color="danger">{error}</CAlert>
      ) : notifications.length === 0 ? (
        <CAlert color="info">No notifications available</CAlert>
      ) : (
        notifications.map((notification) => (
          <CAlert
            key={notification.id}
            color={getColor(notification.status)}
            dismissible
            onClose={() => dismissNotification(notification.id)}
            className="shadow-sm"
          >
            <CAlertHeading>
              Leave {notification.status}
            </CAlertHeading>
            <p>{notification.message}</p>
            <small className="text-muted">Received: {new Date(notification.timestamp).toLocaleString()}</small>
          </CAlert>
        ))
      )}
    </div>
  )
}

export default Alerts
