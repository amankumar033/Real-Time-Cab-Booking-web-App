import React from 'react'

const UserHome = () => {
  return (
    <div>
      <img className='w-16 absolute mb-8 left-5  top-5' src="/assets/Uber_logo.png" alt="" />
      <div className='h-screen w-screen '>
        {/* image for temporary use */}
        <img  className='h-full w-full ' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
      </div>
      <div className='bg-white border-2 rounded-tl-xl rounded-tr-xl p-3 '>
        
       <h1 className='text-xl font-semibold mb-3'>Find a trip</h1>
       
       <form className='flex flex-col gap-3' action="">
        <input type="text"   placeholder='Add a pick-up location'/>
        <input type="text"  placeholder='Enter your destination'/>
        <button className='border'>Leave Now</button>
        
       </form>
   
      </div>

    </div>
  )
}

export default UserHome