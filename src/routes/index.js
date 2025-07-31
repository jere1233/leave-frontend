import React from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

import ApplyLeave from '../views/Employee/ApplyLeave';
import LeaveHistory from '../views/Employee/LeaveHistory';
import Approvals from '../views/Manager/Approvals';
import TeamCalendar from '../views/Manager/TeamCalendar';
import LeaveTypes from '../views/HR/LeaveTypes';
import Reports from '../views/HR/Reports';

import Login from '../views/Login';

const getUserRole = () => {
  // TODO: Implement your auth and decode JWT here to get role
  return 'Employee'; // Example fixed role
};

export default function Router() {
  const role = getUserRole();

  let routes;

  if (role === 'Employee') {
    routes = [
      { path: '/apply-leave', element: <ApplyLeave /> },
      { path: '/leave-history', element: <LeaveHistory /> },
      { path: '*', element: <Navigate to="/apply-leave" /> },
    ];
  } else if (role === 'Manager') {
    routes = [
      { path: '/approvals', element: <Approvals /> },
      { path: '/team-calendar', element: <TeamCalendar /> },
      { path: '*', element: <Navigate to="/approvals" /> },
    ];
  } else if (role === 'HR') {
    routes = [
      { path: '/leave-types', element: <LeaveTypes /> },
      { path: '/reports', element: <Reports /> },
      { path: '*', element: <Navigate to="/leave-types" /> },
    ];
  } else {
    routes = [{ path: '*', element: <Navigate to="/login" /> }];
  }

  return useRoutes(routes);
}
