import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate()
    const [isloading, setIsLoading] = useState(true)
    const {captain, setCaptain} = useContext(captainDataContext)
    useEffect(() => {
        const token = localStorage.getItem('captainToken')
        if (!token) {
            navigate('/CaptainLogin')
        }
    }, [token])
   
  axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }).then((response) => {
    if (response.status === 200) {
        setCaptain(response.data.captain)
        setIsLoading(false)
    } }).catch((error) => {
        console.error("Error fetching captain data:", error)
        localStorage.removeItem('captainToken')
        navigate('/CaptainLogin')
    })


    if (isloading) {
        return <div className='flex justify-center items-center h-screen'>Loading...</div>
    }

    return <>{children}</>
}

export default CaptainProtectWrapper
