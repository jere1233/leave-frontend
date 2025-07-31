import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilSpeedometer,
  cilClipboard,
  cilCalendar,
  cilCheckCircle,
  cilChartPie,
  cilUser,
} from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Employee',
  },
  {
    component: CNavItem,
    name: 'Apply for Leave',
    to: '/employee/apply-leave',
    icon: <CIcon icon={cilClipboard} customClassName="nav-icon" />,
  },
  // Removed Leave History item here
  {
    component: CNavTitle,
    name: 'Manager',
  },
  {
    component: CNavItem,
    name: 'Team Calendar',
    to: '/manager/team-calendar',
    icon: <CIcon icon={cilCalendar} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Manager Board',
    to: '/manager/Approvals',
    icon: <CIcon icon={cilCheckCircle} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'HR',
  },
  {
    component: CNavItem,
    name: 'Leave Types',
    to: '/hr/leave-types',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Reports',
    to: '/hr/reports',
    icon: <CIcon icon={cilChartPie} customClassName="nav-icon" />,
  },
]

export default _nav
