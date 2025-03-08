import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <div className='bg-cover bg-[url(https://plus.unsplash.com/premium_photo-1731842686156-74895c29a87b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8dHJhZmZpYyUyMGxpZ2h0c3xlbnwwfHwwfHx8MA%3D%3D)]  h-screen w-full flex flex-col justify-between '>

      
        <div>
          <img className='w-16 absolute left-5 top-5' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        </div>

        
        <div className='bg-white  p-4'>
          <h2 className='text-2xl font-bold '>Get Started With Uber</h2>
          <Link to="/userLogin" className='flex items-center justify-center bg-black text-white  py-2 mt-4 mb-3 w-full rounded-lg'>Continue</Link>
        </div>

      </div>
    </>
  )
}

export default Home
