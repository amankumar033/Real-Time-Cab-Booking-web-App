import React from 'react'
import { useRideContext} from '../context/RideContext'
import FinishRide from '../components/FinishRide'
import { useRef, useState  } from 'react'
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
const CaptainRiding = () => {
  const {finishRide,setFinishRide} = useRideContext()
  const [finishRidePanel,setFinishRidePanel]=useState(false)
  const finishRideRef = useRef(null)
  console.log("mmmmmmmm",finishRidePanel)
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
      });
    }
   
  }, [finishRidePanel])
  return (
    <div>
        <div>
            <img className='fixed block h-screen' src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif" alt="" />
        </div>
        <div className='flex justify-between px-8 py-10 absolute bottom-0 w-screen bg-yellow-400 items-center'>
            <h2 className='text-lg'>4 Km away</h2>
            <button onClick={()=>{setFinishRide(true);console.log(finishRide)}} className='bg-green-600 text-white py-2 px-8 rounded-lg'>Complete Ride</button>
        </div>
        <div ref={finishRideRef} className='absolute bottom-0 w-screen bg-white h-[75%] rounded-tl-3xl rounded-tr-3xl pt-5 pl-4 pr-4 flex flex-col gap-5'>
      <FinishRide setFinishRidePanel={setFinishRidePanel} finishRidePanel={finishRidePanel}/>
    </div>
    </div>
  )
}

export default CaptainRiding