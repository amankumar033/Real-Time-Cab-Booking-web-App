import React from 'react'

const UserHome = () => {
  return (
    <div className='relative h-screen  '>
      <img className='w-16 absolute mb-8 left-5  top-5' src="/assets/Uber_logo.png" alt="" />
      <div className='h-screen w-screen '>
        {/* image for temporary use */}
        <img  className='h-full w-full ' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='bg-white rounded-tl-2xl rounded-tr-xl p-3 absolute w-full top-0 h-screen'>  
        <div className='h-[40%]'>
       <h1 className='text-xl font-semibold mb-3'>Find a trip</h1>
       <form action="">
        <input type="text" className='bg-[#eee] p-3 rounded-2xl text-base mt-3 w-full'   placeholder='Add a pick-up location'/>
        <input type="text" className='bg-[#eee] p-3 rounded-xl   text-base mt-5 w-full'  placeholder='Enter your destination'/>
        <button className='border p-2 w-max mt-5'>Leave Now</button>
       </form>
   </div>
      
      <div className='bg-red-500 w-full h-[60%]'>

      </div>
      </div>

    </div>
  )
}

export default UserHome