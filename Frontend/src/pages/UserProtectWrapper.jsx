import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import axios from 'axios'
const UserProtectWrapper = ({ children }) => {
    const {user, setUser} = useContext(UserDataContext)
    const navigate = useNavigate()
     const [isloading, setIsLoading] = useState(true)
     const token = localStorage.getItem('userToken')
    useEffect(() => {
        if (!token) {
            navigate('/userLogin')
        }
    }, [token])
    axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      }).then((response) => {
        if (response.status === 200) {
            setUser(response.data.user)
            setIsLoading(false)
        } }).catch((error) => {
            console.error("Error fetching captain data:", error)
            localStorage.removeItem('userToken')
            navigate('/UserLogin')
        })
    
    
        if (isloading) {
            return <div className='flex justify-center items-center h-screen'>Loading...</div>
        }

    return <>{children}</>
}

export default UserProtectWrapper
