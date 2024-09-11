import { useState } from 'react'
import './App.css'
import AuthComponent from './pages/LoginSignUp'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar />
      <AuthComponent />

    </>
  )
}

export default App
