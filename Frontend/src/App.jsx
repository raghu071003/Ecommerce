import './App.css'
import AuthComponent from './pages/LoginSignUp'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AddProductForm from './components/AddProduct'
import Product from './components/Product'
import ContactUs from './pages/ContactUs'
import { Footer } from './components/Footer'
import AdminLoginPage from './pages/Admin'
import AdminDashboard from './pages/AdminDashboard'
import { AuthContext } from './Context/AuthContext'
import { useContext } from 'react'

function App() {

  const { isAdmin } = useContext(AuthContext)
  return (
    <>
      <Router>
        <div className='flex flex-col flex-between'>
          <header>
            <Navbar />
          </header>
          <div>
            <Routes>
              <Route path='/' element={<HomePage />} />
              <Route path='/login' element={<AuthComponent />} />
              <Route path='/signup' element={<AuthComponent />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/contact' element={<ContactUs />} />
              <Route path='/admin' element={<AdminLoginPage />} />
            //secure Routes

              <Route path='/admin/dashboard' element={isAdmin?<AdminDashboard />:<p>Invalid Request</p>} />
              <Route path='/admin/addProduct' element={isAdmin?<AddProductForm />:<p>Invalid Request</p>} />

            </Routes>
          </div>


        </div>

      </Router>

    </>
  )
}

export default App
