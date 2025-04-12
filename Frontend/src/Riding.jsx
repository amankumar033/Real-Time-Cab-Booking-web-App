import React from 'react'
import { Link, useLocation} from 'react-router-dom'
import { useEffect, useContext } from 'react';
import { SocketContext } from './context/SocketContext';
import { useNavigate } from 'react-router-dom'
const Riding = (props) => {
  const location = useLocation();
  const { ride } = location.state || {}  
  const { socket } = useContext(SocketContext)
  const navigate = useNavigate()

  socket.on("ride-ended", (data) => {
      navigate('/userhome')
  })

  return (
    <div className='overflow-hidden flex flex-col h-screen relative'>
        <div>
           <Link to='/userhome'>
            <img  className='w-12 right-5 top-5 absolute z-10 rounded-full' src="/assets/home-icon.jpeg" alt="" />
            </Link>
            <img className='fixed block' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='absolute bg-white w-screen bottom-0'>
        <div className=' h-[50%] m-3 mb-8'>
        <div className='flex '>
        <div className="w-full flex mb-4 mt-0">
          <img src='/assets/uber-car.jpeg' alt="Selected Ride" className="w-35 " />
        </div>
        <div className='w-full mt-7  mr-3 text-right mb-4'>
        <h3 className='font-medium'>{ride?.captain?.fullname?.firstname+" "+ride?.captain?.fullname?.lastname}</h3>
        <h1 className='font-bold text-xl'>{ride?.captain?.vehicle?.plate}</h1>
        </div>
        </div>
        <div className='flex flex-col gap-4 relative'>
        <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
        <div className='flex gap-5 ml-4 items-center'>
          <img className='w-5 h-10' src="/assets/user-destination-map-pin.svg" alt="" />
          <h2 className=''>{ride?.destination}</h2>
        </div>
        <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
        <div className='flex gap-5 ml-4'>
          <img className='w-5 h-10' src="/assets/money-rupee-circle-line.svg" alt="" />
          <div>
          <h2 className='font-medium'>{ride?.fare}</h2>
          <h2>Cash</h2>
          </div>
        </div>
          <div>
          <button className='bg-green-500 rounded w-full p-2'>Make a Payment</button>
        </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Riding