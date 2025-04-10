import React, { useEffect, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import axios from 'axios'

const UserProtectWrapper = ({ children }) => {
    const { user, setUser } = useContext(UserDataContext)
    const navigate = useNavigate()
    const [isloading, setIsLoading] = useState(true)

    useEffect(() => {
        const token = localStorage.getItem('userToken')

        if (!token) {
            navigate('/userLogin')
            return
        }

        const fetchUser = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/user/profile`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })

                if (response.status === 200) {
                    setUser(response.data)
                    setIsLoading(false)
                }
            } catch (error) {
                console.error("Error fetching user data:", error)
                localStorage.removeItem('userToken')
                navigate('/userLogin')
            }
        }

        fetchUser()
    }, []) 
    if (isloading) {
        return <div className='flex justify-center items-center h-screen'>Loading...</div>
    }

    return <>{children}</>
}

export default UserProtectWrapper
