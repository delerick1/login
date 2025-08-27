import { useState } from 'react'
import { useSelector } from 'react-redux'

import './App.css'
import Login from './assets/Login'
import Dashboard from './pages/Dashboard'

function App() {
  const [count, setCount] = useState(0)
  const { user } = useSelector(state => state.auth)

  return (
    <>
      {user ? <Dashboard /> : <Login />}
    </>
  )
}

export default App
