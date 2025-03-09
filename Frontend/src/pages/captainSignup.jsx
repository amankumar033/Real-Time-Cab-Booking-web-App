import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptainSignup = () => {
  const [firstname,setFirstname] = useState('');
  const [lastname,setLastname] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [captainData,setCaptainData] = useState({});
  const submitHandler=(e)=>{
    e.preventDefault();
    console.log("Captain Firstname:",firstname)
    console.log("Captain Lastname:",lastname)
    console.log("Captain sign up email:",email)
    console.log("Captain sign up password:",password)
     setCaptainData({
      fullname:{
        firstname:firstname,
        lastname:lastname,
      },
      email:email,
      password:password
     })
     console.log("Captain sign up Data is :",captainData);
     setFirstname('');
     setLastname('');
    setEmail('');
    setPassword('');
  }
  return (
    <>
    <div className='p-5  h-screen flex flex-col justify-between'>
      
<div>


    <img className='w-16 mb-8' src="assets/uber-driver.svg" alt="" />
      
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
      <button className='bg-black text-white rounded py-2 mb-3 font-semibold'>Register</button>
     </form>
     <p className='text-center' >Already have an account? <Link to={'/captainlogin'} className='text-blue-600'>Login here</Link></p>
     </div>
    <div>
      <p className='text-sm font-light text-center mb-2'>By proceeding you consent to get calls, Whatsapp and sms messages on your registerd mobile number and email from Uber</p>
    </div>
    </div>
    </>
  )
}

export default CaptainSignup;