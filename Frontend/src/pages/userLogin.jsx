import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [userData,setuserData] = useState({});
  const submitHandler=(e)=>{
    e.preventDefault();
    console.log("user email:",email)
    console.log("user password:",password)
     setuserData({
      email:email,
      password:password
     })
     console.log("userdata is :",userData);
    setEmail('');
    setPassword('');
  }
  return (
    <>
    <div className='p-5  h-screen flex flex-col justify-between'>
      
<div>


    <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      
     <form onSubmit={submitHandler} className='flex flex-col  '>
      <h3 className='font-semibold text-lg mb-1' >What's your email</h3>
      <input value={email} onChange={(e)=>{setEmail(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-5' type="email"  placeholder='email@example.com' />
      <h3 className='font-semibold text-lg mb-1' >Enter Password</h3>
      <input  value={password} onChange={(e)=>{setPassword(e.target.value)}} required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base mb-9' type="password" placeholder='password'  />
      <button className='bg-black text-white rounded py-2 mb-3 font-semibold'>Login</button>
     </form>
     <p className='text-center' >New here? <Link to={'/usersignup'} className='text-blue-600'>Create New Account</Link></p>
     </div>
    <div>
      <Link to={'/captainlogin'} className='flex justify-center bg-green-400 w-full rounded py-2 font-semibold text-white mb-10'>Sign in as Captain</Link>
    </div>
    </div>
    </>
  )
}

export default UserLogin