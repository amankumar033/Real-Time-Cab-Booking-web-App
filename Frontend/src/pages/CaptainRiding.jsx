import React from 'react'
import { useRideContext} from '../context/RideContext'
import { useLocation } from "react-router-dom";
import FinishRide from '../components/FinishRide'
import { useRef, useState, useEffect  } from 'react'
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import LiveTracking from '../components/LiveTracking';
const CaptainRiding = () => {
    const location = useLocation();
  const ride = location.state?.ride;
  const {finishRide,setFinishRide} = useRideContext()
  const [finishRidePanel,setFinishRidePanel]=useState(true)
  const finishRideRef = useRef(null)
  const [locationMarkerPos,setLocationMarkerPos]=useState(true)
  useGSAP(() => { 
    if(finishRide){
      gsap.to(finishRideRef.current, {
        duration: 1,
        display: "block",
        transform: "translateY(0%)",
        opacity:1,
        ease: "power2.out",
      });
    }
    else{
      gsap.to(finishRideRef.current, {
        duration: 1,
        display: "none",
        transform: "translateY(100%)",
        opacity:0,
        ease: "power2.out",
      });
     
    }
  }, [finishRide])
  useGSAP(() => { 
    if(finishRidePanel){
      gsap.to(finishRideRef.current, {
        duration: 1,
        display: "none",
        transform: "translateY(100%)",
        opacity:0,
        ease: "power2.out",
      });}
    else{
      {
        gsap.to(finishRideRef.current, {
          duration: 1,
          display: "block",
          transform: "translateY(0%)",
          opacity:1,
          ease: "power2.out",
        });
    }
    }
   
  }, [finishRidePanel])
  return (
    <div>
        <div className='absolute z-0 inset-0'>
            <LiveTracking locationMarkerPos={locationMarkerPos}/>
        </div>
        <div className='flex justify-between px-8 py-10 absolute bottom-0 w-screen bg-yellow-400 items-center'>
            <h2 className='text-lg'>4 Km away</h2>
            <button onClick={()=>{setFinishRide(true);setFinishRidePanel(false);console.log(finishRide)}} className='bg-green-600 text-white py-2 px-8 rounded-lg'>Complete Ride</button>
        </div>
        <div ref={finishRideRef} className='absolute bottom-0 w-screen bg-white h-[80%] rounded-tl-3xl rounded-tr-3xl pt-5 pl-4 pr-4 flex flex-col gap-5'>
      <FinishRide setFinishRidePanel={setFinishRidePanel} setLocationMarkerPos={setLocationMarkerPos} ride={ride} finishRidePanel={finishRidePanel}/>
    </div>
    </div>
  )
}

export default CaptainRiding