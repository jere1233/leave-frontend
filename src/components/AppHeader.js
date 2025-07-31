import React, { useEffect, useRef, useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
  CAvatar,
  CSpinner,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilBell,
  cilContrast,
  cilEnvelopeOpen,
  cilList,
  cilMenu,
  cilMoon,
  cilSun,
  cilUser,
  cilAccountLogout,
} from '@coreui/icons'

import { AppBreadcrumb } from './index'
import { AuthContext } from '../auth/AuthProvider'
import axios from 'axios'

const AppHeader = () => {
  const headerRef = useRef()
  const { colorMode, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')

  const dispatch = useDispatch()
  const sidebarShow = useSelector((state) => state.sidebarShow)
  const navigate = useNavigate()

  const { user, logout } = useContext(AuthContext)

  const [notifications, setNotifications] = React.useState([])
  const [loading, setLoading] = React.useState(false)

  useEffect(() => {
    document.addEventListener('scroll', () => {
      if (headerRef.current) {
        headerRef.current.classList.toggle('shadow-sm', document.documentElement.scrollTop > 0)
      }
    })

    fetchNotifications()
  }, [])

  const fetchNotifications = async () => {
    try {
      setLoading(true)
      const response = await axios.get('http://localhost:8000/api/notifications/')
      setNotifications(response.data)
    } catch (error) {
      console.error('Failed to fetch notifications:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CHeader
      position="sticky"
      ref={headerRef}
      className="p-0"
      style={{ height: 80, boxSizing: 'border-box' }}
    >
      <CContainer
        fluid
        className="border-bottom px-4"
        style={{
          height: 60,
          display: 'flex',
          alignItems: 'center',
          paddingTop: 0,
          paddingBottom: 0,
          boxSizing: 'border-box',
        }}
      >
        <CHeaderToggler
          onClick={() => dispatch({ type: 'set', sidebarShow: !sidebarShow })}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              Dashboard
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav className="ms-auto">
          {/* ✅ Active Notification Dropdown */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CIcon icon={cilBell} size="lg" />
            </CDropdownToggle>
            <CDropdownMenu style={{ minWidth: '300px', maxHeight: '400px', overflowY: 'auto' }}>
              <CDropdownItem header className="fw-bold">
                Notifications
              </CDropdownItem>
              {loading ? (
                <CDropdownItem className="text-center">
                  <CSpinner size="sm" /> Loading...
                </CDropdownItem>
              ) : notifications.length === 0 ? (
                <CDropdownItem className="text-muted text-center">No notifications</CDropdownItem>
              ) : (
                notifications.map((notif, index) => (
                  <CDropdownItem key={index}>
                    <strong>{notif.title}</strong>
                    <div className="small text-muted">{notif.timestamp}</div>
                    <div>{notif.message}</div>
                  </CDropdownItem>
                ))
              )}
            </CDropdownMenu>
          </CDropdown>

          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>

        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          {/* Theme Toggle */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === 'dark' ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === 'auto' ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem active={colorMode === 'light'} onClick={() => setColorMode('light')}>
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem active={colorMode === 'dark'} onClick={() => setColorMode('dark')}>
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem active={colorMode === 'auto'} onClick={() => setColorMode('auto')}>
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          {/* Profile Dropdown */}
          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <CAvatar color="primary" size="md">
                {user?.username?.charAt(0).toUpperCase() || 'U'}
              </CAvatar>
            </CDropdownToggle>
            <CDropdownMenu className="pt-0">
              <CDropdownItem className="fw-bold text-center" header>
                {user?.username} <br />
                <small className="text-muted text-capitalize">{user?.role?.toLowerCase()}</small>
              </CDropdownItem>
              <CDropdownItem onClick={() => navigate('/profile')}>
                <CIcon icon={cilUser} className="me-2" /> Profile
              </CDropdownItem>
              <CDropdownItem onClick={logout}>
                <CIcon icon={cilAccountLogout} className="me-2" /> Log Out
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
        </CHeaderNav>
      </CContainer>

      {/* Breadcrumb Container */}
      <CContainer
        fluid
        className="px-4"
        style={{
          height: 20,
          display: 'flex',
          alignItems: 'center',
          boxSizing: 'border-box',
        }}
      >
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
