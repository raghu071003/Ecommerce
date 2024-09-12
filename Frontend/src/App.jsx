import './App.css'
import AuthComponent from './pages/LoginSignUp'
import HomePage from './pages/HomePage'
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {


  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<HomePage/>} />
          <Route path='/login' element={<AuthComponent/>} />
          <Route path='/signup' element={<AuthComponent/>} />
        </Routes>
      </Router>

    </>
  )
}

export default App
