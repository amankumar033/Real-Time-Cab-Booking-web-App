import React from 'react'
import { useState, useRef, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import RidePopUp from '../components/RidePopUp'
import AcceptRide from '../components/AcceptRide';
import { CaptainDataContext } from '../context/CaptainContext'

const CaptainHome = () => {
  const { captain,captainName} = useContext(CaptainDataContext)
  const [popUp, setPopUp] = useState(true)
  const [acceptRide, setAcceptRide] = useState(false)
  const popUpRef = useRef(null)
  const acceptRideRef = useRef(null)

  useEffect(() => {
    console.log("capatin name",captainName.captain.fullname.firstname)
},[]);
  
  
  useGSAP(() => { 
    if(popUp){
      gsap.to(popUpRef.current, {
        duration: 1,
        y:'0%',
        display:'block',
        ease: "power2.out",
      });
    }
    else{
      gsap.to(popUpRef.current, {
        duration: 1,
        y:"100%",
        display: "none",
        ease: "power2.out",
      });
    
    }
  }, [popUp])
  useGSAP(() => { 
    if(acceptRide){
      gsap.to(popUpRef.current, {
        duration: 1,
        display: "none",
        ease: "power2.out",
      });
      gsap.to(acceptRideRef.current, {
        duration: 1,
        display: "block",
        transform: "translateY(0%)",
        opacity:1,
        ease: "power2.out",
      });
    }
    else{
      gsap.to(acceptRideRef.current, {
        duration: 1.5,
        opacity:0,
        display: "none",
        transform: "translateY(100%)",
        ease: "power2.out",
      });
     
    }
  }, [acceptRide])
  console.log("Accept Ride",acceptRide)

  
  
  return (
    <div>
        <div className='overflow-hidden h-screen relative'>
           <Link to='/captainhome'>
            <img  className='w-12 right-5 top-5 absolute z-10 bg-white p-3 rounded-full' src="/assets/logout-box-r-line.svg" alt="" />
            </Link>
            <img className='absolute block h-[60%]' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div >
        <div className=' absolute bg-white w-screen bottom-0 h-[38%]  pl-4 pr-4 pt-6 flex  flex-col gap-5'>
        <div className='  flex justify-between'>
          <div className='flex gap-4'>
        <img className='w-9 h-9 rounded-full top-0 ' src="/assets/profile-pic.jpeg" alt="" />
        <h2 className='font-semibold'>{captainName.captain.fullname.firstname+' '+captainName.captain.fullname.lastname}</h2>
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

    <div ref={popUpRef} className='bg-white absolute w-full h-[80%] bottom-0'>
      <RidePopUp setPopUp={setPopUp} setAcceptRide={setAcceptRide}/>
    </div>
    
    <div ref={acceptRideRef} className='bg-white absolute w-full h-[90%] bottom-0'>
      <AcceptRide acceptRide={acceptRide} setAcceptRide={setAcceptRide}/>
    </div>
    
    </div>
  )
 }

export default CaptainHome