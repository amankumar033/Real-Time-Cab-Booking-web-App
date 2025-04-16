import React from 'react'
import { useEffect } from 'react';
import { useRideContext } from "../context/RideContext";
const WaitingForDriver = (props) => {
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
    // useEffect(() => {
     // console.log("Updated confirm vehicle Image URL: waiting for driver", confirmRideVehicleImg);
    // }, [confirmRideVehicleImg]);
  
    return (
      <div >
        <div className='flex '>
        <div className="w-full flex  mt-7">
          <img src='/assets/uber-car.jpeg' alt="Selected Ride" className="w-35" />
        </div>
        <div className='w-full mt-7  mr-3 text-right'>
        <h3 className='font-semibold text-xl'>{props?.ride?.captain?.fullname?.firstname+" "+props.ride?.captain?.fullname?.lastname}</h3>
        <h1 className='font-medium text-lg'>{props?.ride?.captain?.vehicle?.plate}</h1>
        <h1 className='text-lg font-medium'>OTP : <span>{props?.ride?.otp}</span></h1>
        </div>
        </div>
        <div className='flex flex-col gap-4 relative'>
        <div className='flex gap-5   ml-4 mt-9'>
          <img className='w-5 h-10' src="/assets/user-address-map-pin.svg" alt="" />
          <h2 className='w-full'>{props?.ride?.pickup}</h2>
        </div>
        <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
        <div className='flex gap-5 ml-4'>
          <img className='w-5 h-10' src="/assets/user-destination-map-pin.svg" alt="" />
          <h2 className=''>{props?.ride?.destination}</h2>
        </div>
        <div className='line  bg-gray-300 h-[1px] ml-2 mr-2'></div>
        <div className='flex gap-5 ml-4'>
          <img className='w-5 h-10' src="/assets/money-rupee-circle-line.svg" alt="" />
          <div>
          <h2 className='font-medium'>₹{props?.ride?.fare}</h2>
          <h2>Cash</h2>
          </div>
        </div>
       
        </div>
      </div>
    );
   
}

export default WaitingForDriver