import './App.css'
import AuthComponent from './pages/LoginSignUp'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import AddProductForm from '../../Admin_frntENd/src/Components/AddProduct'
import Product from './components/Product'
import ContactUs from './pages/ContactUs'
import { Footer } from './components/Footer'
import AdminLoginPage from '../../Admin_frntENd/src/Pages/Admin'
import AdminDashboard from '../../Admin_frntENd/src/Pages/AdminDashboard'
import { useAuth } from './Context/AuthContext'
import Profile from './pages/Profile'
import SearchPage from './pages/SearchPage'
import CartComponent from './components/Cart'
import Categories from './pages/Categories'
import Checkout from './pages/CheckOut'
import DesignShirt from './pages/DesignShirt'

function App() {

  // const { isAdmin,isLogged } = useContext(useAuth)
  // const navigate = useNavigate()
  // console.log(isLogged);
  const {isLogged} = useAuth()
  
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
              <Route path='/profile' element={<Profile />} />
              <Route path='/search/:query' element={<SearchPage/>}/>
              <Route path ="/cart" element={<CartComponent/>}/>
              <Route path="/categories" element={<Categories />}/>
              <Route path="/checkoutCart" element={<Checkout />}/>
              <Route path="/checkoutCart/:id" element={<Checkout />}/>
              <Route path='/design' element={<DesignShirt />}/>
            </Routes>
          </div>


        </div>

      </Router>

    </>
  )
}

export default App
