import React from 'react'
import { useRideContext } from "../context/RideContext";
import { useEffect } from "react";
const LookingForDriver = () => {
 const {
       ridePanel,
       setRidePanel,
       currentAddress,
       setCurrentAddress,
       destinationAddress,
       setDestinationAddress,
       confirmRideVehicleImg,
       setConfirmRideVehicleImg,
       confirmedRide,
       setConfirmedRide,
       fare,
       setFare
     } = useRideContext();
   useEffect(() => {
     console.log("Updated confirm vehicle Image URL:", confirmRideVehicleImg);
   }, [confirmRideVehicleImg]);
 
   return (
     <div >
       <div className="text-xl font-bold">
         <h1>Looking for a Driver</h1>
       </div>  
       <div className="w-full flex justify-center mt-7">
         <img src={confirmRideVehicleImg} alt="Selected Ride" className="w-35" />
       </div>
       <div className='flex flex-col gap-4 relative'>
       <div className='flex gap-5   ml-4 mt-9'>
         <img className='w-5 h-10' src="/assets/user-address-map-pin.svg" alt="" />
         <h2 className='w-full'>{currentAddress}</h2>
       </div>
       <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
       <div className='flex gap-5 ml-4'>
         <img className='w-5 h-10' src="/assets/user-destination-map-pin.svg" alt="" />
         <h2 className=''>{destinationAddress}</h2>
       </div>
       <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
       <div className='flex gap-5 ml-4'>
         <img className='w-5 h-10' src="/assets/money-rupee-circle-line.svg" alt="" />
         <div>
         <h2 className='font-medium'>₹{fare}</h2>
         <h2>Cash</h2>
         </div>
       </div>
      
       </div>
     </div>
   );
  
}

export default LookingForDriver