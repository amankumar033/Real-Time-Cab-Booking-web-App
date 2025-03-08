import React from 'react'
import { Link } from 'react-router-dom'

const UserLogin = () => {
  return (
    <>
    <div className='p-5  h-screen flex flex-col justify-between'>
      
<div>


    <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      
     <form className='flex flex-col  '>
      <h3 className='font-semibold text-lg mb-1' >What's your email</h3>
      <input required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-5' type="email"  placeholder='email@example.com' />
      <h3 className='font-semibold text-lg mb-1' >Enter Password</h3>
      <input required className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base mb-9' type="password" placeholder='password'  />
      <button className='bg-black text-white rounded py-2 mb-3 font-semibold'>Login</button>
     </form>
     <p className='text-center' >New here? <Link to={'/usersignup'} className='text-blue-600'>Create New Account</Link></p>
     </div>
    <div>
      <button className='bg-green-400 w-full rounded py-2 font-semibold text-white mb-10'>Sign in as Captain</button>
    </div>
    </div>
    </>
  )
}

export default UserLogin