import React from 'react';
import Dashboard from '../pages/dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import AdminRoute from './AdminRoute';

interface RouteConfig {
  path: string;
  element: React.ReactNode;
  children?: RouteConfig[];
}

export const routes: RouteConfig[] = [
  {
    path: '/dashboard',
    element: <ProtectedRoute />,
    children: [
      { path: '', element: <Dashboard /> },
    ],
  },
  {
    path: '/admin',
    element: <AdminRoute />,
    children: [
      { path: '', element: <Dashboard /> },
    ],
  },
];