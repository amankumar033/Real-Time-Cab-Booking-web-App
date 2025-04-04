import React from 'react'
import { Link } from 'react-router-dom';

const AcceptRide = (props) => {
  return (
    <div  className='mt-10 mr-4 ml-4'>
      <div className="text-xl font-bold mb-5">
        <h1>Confirm this Ride to Start</h1>
      </div>  
      <div className='flex'>
        <img onClick={()=>{props.setAcceptRide(false);}} className='w-6 absolute top-2 left-1/2' src="/assets/arrow-down-wide-line.svg" alt="" />
      </div>
      <div className='flex justify-between bg-amber-300 rounded-md py-2 px-3 items-center'>
        <div className='flex gap-4 items-center'>
        <img className='w--8 h-9 rounded-full top-0 ' src="/assets/random-people.jpeg" alt="" />
        <h2 className='font-semibold'>Anshvi singh</h2>
        </div>
            <h2 className='font-semibold'>2.2 KM</h2>    
        </div>
      <div className='flex flex-col gap-4 relative '>
      <div className='flex gap-5   ml-4 mt-9 items-center'>
        <img className='w-5 h-10' src="/assets/user-address-map-pin.svg" alt="" />
        <h2 className='w-full'>562/11-A Kankariya Talab, Bhopal</h2>
      </div>
      <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
      <div className='flex gap-5 ml-4 items-center'>
        <img className='w-5 h-10' src="/assets/user-destination-map-pin.svg" alt="" />
        <h2 className=''>562/11-A Kankariya Talab, Bhopal</h2>
      </div>
      <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
      <div className='flex gap-5 ml-4 items-center'>
        <img className='w-5 h-10' src="/assets/money-rupee-circle-line.svg" alt="" />
        <div>
        <h2 className='font-medium'>₹192</h2>
        <h2>Cash</h2>
        </div>
      </div>
      <Link to='/captainriding'>
      <button onClick={()=>{console.log("s",confirmedRide)}} className='bg-green-500 p-1 rounded-lg  mt-4 w-full'>Confirm</button>
      </Link>
      <button onClick={()=>{props.setAcceptRide(false); console.log(props.acceptRide)}} className='bg-red-600 p-1 rounded-lg '>Cancel</button>
      </div>
    </div>
  )
}

export default AcceptRide