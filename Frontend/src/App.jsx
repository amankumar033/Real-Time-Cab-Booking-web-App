import React, { useContext } from 'react'
import {Routes,Route} from 'react-router-dom'
import Start from './pages/Start'
import UserLogin from './pages/userLogin'
import UserSignup from './pages/userSignup'
import CaptainLogin from './pages/captainLogin'
import CaptainSignup from './pages/captainSignup'
import { UserDataContext } from './context/userContext'
import Start from './pages/Start'


const App = () => {
  
  return (
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/userLogin" element={<UserLogin/>} />
      <Route path="/userSignup" element={<UserSignup/>} />
      <Route path="/captainSignup" element={<CaptainSignup/>} />
      <Route path="/captainLogin" element={<CaptainLogin/>} />
      <Route path="/Home" element={<Home/>} />
    </Routes>
  )
}

export default App