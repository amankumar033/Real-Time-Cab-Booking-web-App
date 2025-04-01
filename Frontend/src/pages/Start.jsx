import React from 'react'
import { Link } from 'react-router-dom'

const Start = () => {
  return (
    <>
      <div className='bg-cover bg-[url(assets/uber_start_screen_lights.png)]  h-screen w-full flex flex-col justify-between '>

      
        <div>♦
          <img className='w-16 absolute left-5 top-5' src="assets/Uber_logo.png" alt="" />
        </div>

        
        <div className='bg-white  p-4'>
          <h2 className='text-2xl font-bold '>Get Started With Uber</h2>
          <Link to="/userLogin" className='flex items-center justify-center bg-black text-white  py-2 mt-4 mb-3 w-full rounded-lg'>Continue</Link>
        </div>

      </div>
    </>
  )
}

export default Start
