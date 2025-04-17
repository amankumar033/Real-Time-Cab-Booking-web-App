import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainProtectWrapper = ({ children }) => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const { captain, setCaptain,captainName, setCaptainName } = useContext(CaptainDataContext)
    const token = localStorage.getItem('captainToken')

    useEffect(() => {
        console.log("Fetching Captain Profile...");
    
        if (!token) {
            console.log("No token found, redirecting...");
            navigate('/CaptainLogin');
            return;
        }
    
        const fetchCaptainData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
    
                // console.log("Captain data received:", response.data.captain?.fullname?.firstname);
                setCaptainName(response.data);
                setCaptain(response.data);
               
            } catch (error) {
                console.error("Error fetching captain data:", error);
                localStorage.removeItem('captainToken');
                navigate('/CaptainLogin');
            } finally {
                setIsLoading(false);  // ✅ Ensure loading stops in both success & failure cases
            }
        };
    
        fetchCaptainData();
    }, [token]); 
    
      
    if (isLoading) {
        return <div className='flex justify-center items-center h-screen'>Loading...</div>
    }

    return <>{children}</>
}

export default CaptainProtectWrapper
