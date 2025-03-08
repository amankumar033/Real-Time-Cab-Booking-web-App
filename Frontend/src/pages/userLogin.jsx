import React from 'react'

const UserLogin = () => {
  return (
    <>
    <div className='p-5'>
      

    <img className='w-16 mb-8' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      
     <form className='flex flex-col  '>
      <h3 className='font-semibold text-lg mb-1' >What's your email</h3>
      <input className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base  rounded mb-4' type="email"  placeholder='email@example.com' />
      <h3 className='font-semibold text-lg mb-1' >Enter Password</h3>
      <input className='bg-[#eeeeee] py-2 px-2 text-sm placeholder:text-base mb-6' type="password" placeholder='password'  />
      <button className='bg-black text-white rounded py-2'>Login</button>
     </form>
   
    </div>
    </>
  )
}

export default UserLogin