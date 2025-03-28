import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'
const UserSignup = () => {
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userData,setUserData] = useState({});
  const navigate = useNavigate()

  const {user, setuser} = React.useContext(UserDataContext)


  const submitHandler=async(e)=>{
    e.preventDefault();
    console.log("User Firstname:",firstname)
    console.log("User Lastname:",lastname)
    console.log("User sign up email:",email)
    console.log("User sign up password:",password)


     const newUser ={
      fullname:{
        firstname:firstname,
        lastname:lastname,
      },
      email:email,
      password:password
     }
     const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/user/register`,newUser)

     if(response.status === 201){
      const data = response.data;
      setUserData(data.user)
      localStorage.setItem('userToken',data.token)
      navigate('/Home')
     }
     console.log("Response is :",response)
     console.log("User sign up Data is :",newUser);
     setFirstname('');
     setLastname('');
    setEmail('');
    setPassword('');
  }
  return (
    <>
    <div className='p-5  h-screen flex flex-col justify-between'>
      
<div>


    <img className='w-16 mb-8' src="assets/Uber_logo.png" alt="" />
      
     <form onSubmit={submitHandler} className='flex flex-col  '>
      <h3 className='font-semibold text-lg mb-1' >What's your Name</h3>
      <div className='flex gap-3'>
      <input value={firstname} onChange={(e)=>{setFirstname(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-5 w-1/2 ' type="text"  placeholder='Firstname' />
      <input value={lastname} onChange={(e)=>{setLastname(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-5 w-1/2' type="text"  placeholder='Lastname' />
      </div>
      <h3 className='font-semibold text-lg mb-1' >Enter Your Email</h3>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-5' type="email"  placeholder='email@example.com' />
      <h3 className='font-semibold text-lg mb-1' >Enter Password</h3>
      <input  value={password} onChange={(e)=>{setPassword(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base mb-9' type="password" placeholder='password'  />
      <button className='bg-black text-white rounded py-2 mb-3 font-semibold'>Create Account</button>
     </form>
     <p className='text-center' >Already have an account? <Link to={'/userlogin'} className='text-blue-600'>Login here</Link></p>
     </div>
    <div>
      <p className='text-sm font-light text-center mb-2'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy Policy </span>and <span className='underline'>Terms of Service apply</span></p>
    </div>
    </div>
    </>
  )
}

export default UserSignup;