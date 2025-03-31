import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const CaptainLogout = () => {
    const token =localStorage.getItem('userToken')
    const navigate = useNavigate()
    axios.get( `${import.meta.env.VITE_BACKEND_URL}/capatain/logout`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => {
        if (response.status === 200) {
            console.log("captain logout successfully")
            localStorage.removeItem('captainToken')
            navigate('/CaptainLogin')
        }
        
        
    })
  return (
    <div>
    CapatainLogout
    </div>
  )
}

export default CaptainLogout