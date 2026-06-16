import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

import Login from '../pages/login'
import Dashboard from '../pages/dashboard/dashboard.jsx'
import Signup from '../pages/signup'
import ForgotPassword from '../pages/forgotPassword'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default: redirect to login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Auth pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboard and its section routes (render same Dashboard component) */}
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/complaints" element={<Dashboard />} />
        <Route path="/dashboard/setores" element={<Dashboard />} />
        <Route path="/dashboard/admins" element={<Dashboard />} />
        <Route path="/dashboard/reports" element={<Dashboard />} />
        <Route path="/dashboard/settings" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;