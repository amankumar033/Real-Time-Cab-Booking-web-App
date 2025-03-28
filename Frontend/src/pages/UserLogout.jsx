import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const UserLogout = () => {
    const token =localStorage.getItem('userToken')
    const navigate = useNavigate()
    axios.get( `${import.meta.env.VITE_BACKEND_URL}/user/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            console.log("User logout successfully")
            localStorage.removeItem('userToken')
            navigate('/userLogin')
        }
        
        
    })
  return (
    <div>
    UserLogout
    </div>
  )
}

export default UserLogout