import React from 'react'

const CaptainRiding = () => {
  return (
    <div>
        <div>
            <img className='fixed block h-screen' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='flex justify-between px-8 py-10 absolute bottom-0 w-screen bg-yellow-400 items-center'>
            <h2 className='text-lg'>4 Km away</h2>
            <button className='bg-green-600 text-white py-2 px-8 rounded-lg'>Complete Ride</button>
        </div>
    </div>
  )
}

export default CaptainRiding