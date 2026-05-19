import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Login from '../pages/login'
import Dashboard from '../pages/dashboard'

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes;