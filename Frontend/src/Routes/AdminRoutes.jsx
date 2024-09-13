import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const AdminRoutes = () => {
  return (
    <Router>
        <Routes>
          <Route path='/admin' element={<HomePage/>} />
          <Route path='/admin/login' element={<AuthComponent/>} />
          {/* <Route path='/signup' element={<AuthComponent/>} /> */}
          <Route path='/admin/addProduct' element={<AddProductForm />} />
        </Routes>
      </Router>
  )
}

export default AdminRoutes