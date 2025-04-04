import React from 'react'
import { Link } from 'react-router-dom'
const CaptainHome = () => {
  return (
    <div>
        <div>
           <Link to='/captainhome'>
            <img  className='w-12 right-5 top-5 absolute z-10 bg-white p-3 rounded-full' src="/assets/logout-box-r-line.svg" alt="" />
            </Link>
            <img className='fixed block h-[60%]' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div >
        <div className=' absolute bg-white w-screen bottom-0 h-[40%]  pl-4 pr-4 pt-6 flex  flex-col gap-4'>
        <div className='  flex justify-between'>
          <div className='flex gap-4'>
        <img className='w--8 h-9 rounded-full top-0 ' src="/assets/profile-pic.jpeg" alt="" />
        <h2 className='font-semibold'>Harsh Patel</h2>
        </div>
        <div className='mr-3'>
        <h2 className='font-bold'>₹295.20</h2>
        <h2>Earned</h2>
        </div>
      </div>
      <div className='flex justify-between mt-3   bg-gray-200 rounded-lg pr-4 pl-4 pt-3 pb-3 w-full'>
  <div className='flex flex-col items-center'>
    <img className='w-7' src="/assets/clock-symbol.svg" alt="" />
    <h2 className='font-semibold'>10.2</h2>
    <h2 className='text-sm'>Hours Online</h2>
  </div>
  <div className='flex flex-col items-center'>
    <img className='w-7' src="/assets/speed-up-line.svg" alt="" />
    <h2 className='font-semibold'>10.2</h2>
    <h2 className='text-sm'>Hours Online</h2>
  </div>
  <div className='flex flex-col items-center'>
    <img className='w-7' src="/assets/booklet-line.svg" alt="" />
    <h2 className='font-semibold'>10.2</h2>
    <h2 className='text-sm'>Hours Online</h2>
  </div>
      
        </div>
    </div>
    </div>
  )
}

export default CaptainHome