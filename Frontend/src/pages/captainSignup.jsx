import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CaptainContext'; 

const CaptainSignup = () => {
 const { captain, setCaptain,captainName, setCaptainName } = useContext(CaptainDataContext)

  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [vehicleColor, setVehicleColor] = useState('');
  const [vehicleCapacity, setVehicleCapacity] = useState('');
  const [vehiclePlate, setVehiclePlate] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [captainData,setCaptainData] = useState({});
    const navigate = useNavigate()
  const submitHandler=async(e)=>{
    e.preventDefault();
    console.log("Captain Firstname:",firstname)
    console.log("Captain Lastname:",lastname)
    console.log("Captain sign up email:",email)
    console.log("Captain sign up password:",password)
    console.log("vehicle",typeof(vehicleType))
    const  newCaptain={
      fullname:{
        firstname:firstname,
        lastname:lastname,
      },
      email:email,
      password:password,
      vehicle:{
        color:vehicleColor,
        capacity:vehicleCapacity,
        plate:vehiclePlate,
        vehicleType:vehicleType
      }
     }

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/register`,newCaptain)
    if(response.status === 201){
      const data = response.data;
      setCaptainData(data.captain)
      console.log("Captain Data  token is:",data.token)
      localStorage.setItem('captainToken',data.token)
      navigate('/CaptainHome')
    }
    setFirstname('');
    setLastname('');
    setEmail('');
    setPassword('');
    setVehicleCapacity('');
    setVehicleColor('');
    setVehiclePlate('');
    setVehicleType('');
  }
  
  return (
    <>
    <div className='p-5  h-screen flex flex-col justify-between'>
      
<div>


    <img className='w-16 mb-1' src="assets/uber-driver.svg" alt="" />
      
     <form onSubmit={submitHandler} className='flex flex-col  '>
      <h3 className='font-semibold text-lg mb-1' >What's your Name</h3>
      <div className='flex gap-3'>
      <input value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-4 w-1/2 ' type="text"  placeholder='Firstname' />
      <input value={lastname} onChange={(e)=>{setLastname(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-4 w-1/2' type="text"  placeholder='Lastname' />
      </div>
      <h3 className='font-semibold text-lg mb-1' >Enter Your Email</h3>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-4' type="email"  placeholder='email@example.com' />
      <h3 className='font-semibold text-lg mb-1' >Enter Password</h3>
      <input  value={password} onChange={(e)=>{setPassword(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base mb-4' type="password" placeholder='password'  />
      
      <h3 className='font-semibold text-lg mb-1' >Vehicle Information</h3>
      <div className='flex gap-3 flex-wrap '>
      <input value={vehiclePlate} onChange={(e)=>{setVehiclePlate(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-2 w-[48%] ' type="text"  placeholder='Vehicle Plate ' />
      <input value={vehicleColor} onChange={(e)=>{setVehicleColor(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-2 w-[48%]' type="text"  placeholder='Vehicle Color' />
      <input value={vehicleCapacity} onChange={(e)=>{setVehicleCapacity(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-7 w-[48%]' type="number"  placeholder='Vehicle Capacity' />
      <select 
       required 
       className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base rounded mb-7 w-[48%]'
            value={vehicleType} 
            onChange={(e) => setVehicleType(e.target.value)}
     >     
            <option value="" disabled hidden>Select Vehicle</option>
            <option value="auto">Auto</option>
            <option value="car">Car</option>
            <option value="moto">Bike</option>
     </select>

      </div>
      <button  className='bg-black text-white rounded py-2 mb-3 font-semibold'>Create Captain Account</button>
     </form>
     <p className='text-center' >Already have an account? <Link to={'/captainlogin'} className='text-blue-600'>Login here</Link></p>
     </div>
    <div>
      <p className='text-sm font-light text-center mb-2'>By proceeding you consent to get calls and messages on your registerd mobile number and email from Uber</p>
    </div>
    </div>
    </>
  )
}

export default CaptainSignup;