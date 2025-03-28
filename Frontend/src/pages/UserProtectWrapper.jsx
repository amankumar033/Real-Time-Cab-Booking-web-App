import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const UserProtectWrapper = ({ children }) => {
    const navigate = useNavigate()
     const [isloading, setIsLoading] = useState(true)
        const {captain, setCaptain} = useContext(captainDataContext)
    useEffect(() => {
        const token = localStorage.getItem('userToken')
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
            setuser(response.data.user)
            setIsLoading(false)
        } }).catch((error) => {
         
        if (isloading) {
            return <div className='flex justify-center items-center h-screen'>Loading...</div>
        }

    return <>{children}</>
}

export default UserProtectWrapper
