import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/login'
import Dashboard from '../pages/dashboard/dashboard.jsx'
import Signup from '../pages/signup'
import ForgotPassword from '../pages/forgotPassword'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;