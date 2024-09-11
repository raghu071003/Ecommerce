import { useState } from 'react'
import './App.css'
import AuthComponent from './pages/LoginSignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AuthComponent />

    </>
  )
}

export default App
