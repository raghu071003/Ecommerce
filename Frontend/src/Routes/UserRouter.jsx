
import AuthComponent from '../pages/LoginSignUp'
import HomePage from '../pages/HomePage'
import Navbar from '../components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProductForm from '../components/AddProduct'
import Product from '../components/Product'

function userRoutes() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<AuthComponent/>} />
          <Route path='/signup' element={<AuthComponent/>} />
          <Route path='/admin/addProduct' element={<AddProductForm />} />
          <Route path='/product/:prodctId' element={<Product/>} />
        </Routes>
      </Router>

    </>
  )
}

export default userRoutes
