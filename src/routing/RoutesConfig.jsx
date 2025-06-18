import React from 'react';
import { Navigate } from 'react-router-dom';
import { AdminRoute, ProtectedRoute } from './ProtectedRoutes'

import PortalLayout from '../pages/layouts/PortalLayout'
import CenterScreenLayout from '../pages/layouts/CenterScreenLayout'

import Projects from '../pages/Projects'

const routesConfig = [
  {
    element: (
      <ProtectedRoute>
        <PortalLayout />
      </ProtectedRoute>
    ),
    children: [
      { path: "/admin/projects", element: <Projects /> },
      { path: "*", element: <Navigate to="/admin/projects" replace /> }
    ]
  },
]

export default routesConfig;