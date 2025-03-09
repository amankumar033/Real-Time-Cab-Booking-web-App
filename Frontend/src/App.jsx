import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import UserLogin from './pages/userLogin'
import UserSignup from './pages/userSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'
import { UserDataContext } from './context/userContext'


const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/userLogin" element={<UserLogin/>} />
      <Route path="/userSignup" element={<UserSignup/>} />
      <Route path="/captainSignup" element={<CaptainSignup/>} />
      <Route path="/captainLogin" element={<CaptainLogin/>} />
    </Routes>
  )
}

export default App