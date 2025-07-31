import React from 'react'

// Your app-specific lazy imports:
const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))

// Employee
const ApplyLeave = React.lazy(() => import('./views/Employee/ApplyLeave'))

// Manager
const Approvals = React.lazy(() => import('./views/Manager/ManagerBoard'))
const TeamCalendar = React.lazy(() => import('./views/Manager/TeamCalendar'))

// HR
const LeaveTypes = React.lazy(() => import('./views/HR/LeaveTypes'))
const Reports = React.lazy(() => import('./views/HR/Reports'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },

  // Employee routes
  { path: '/employee/apply-leave', name: 'Apply Leave', element: ApplyLeave },

  // Manager routes
  { path: '/manager/approvals', name: 'ManagerBoard', element: Approvals },
  { path: '/manager/team-calendar', name: 'Team Calendar', element: TeamCalendar },

  // HR routes
  { path: '/hr/leave-types', name: 'Leave Types', element: LeaveTypes },
  { path: '/hr/reports', name: 'Reports', element: Reports },
]

export default routes
