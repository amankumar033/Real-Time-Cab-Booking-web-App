import React, { useState } from 'react'
import { useEffect } from 'react';
import { useRideContext } from "../context/RideContext";
const VehiclePanel = (props) => {
 const {
     ridePanel,
     setRidePanel,
     currentAddress,
     setCurrentAddress,
     destinationAddress,
     setDestinationAddress,
     confirmRideVehicleImg,
     setConfirmRideVehicleImg,
     setConfirmedRideVehicle,
     fare,
     setFare
   } = useRideContext();

   useEffect(() => {
    console.log("Updated Image URL:", confirmRideVehicleImg);
  }, [confirmRideVehicleImg]);
  
  return (
    <div>
      <div className='flex flex-col gap-5'>
        <h2 className="font-bold text-xl mb-3">Choose a Vehicle</h2>
        <div onClick={()=>{setRidePanel(true); setConfirmRideVehicleImg('/assets/uber-car.jpeg');
        setConfirmedRideVehicle('car');
          setFare(props.fares.car);}} className="flex active:border-2 rounded-xl flex-row gap-2">
          <div>
            <img
              className="h-15 rounded-2xl"
              src="/assets/uber-car.jpeg"
              alt=""
            />
          </div>
          <div>
            <div className="flex font-medium mt-1">
              <h2>UberGo</h2>
              <span>
                <img
                  className="w-5 mt-1"
                  src="/assets/person-logo.png"
                  alt=""
                />
              </span>
            </div>
            <div className="text-sm font-normal">
              <h3 className="font-medium">2mins away</h3>
              <h3>affordable, compact rides</h3>
            </div>
          </div>
          <div className="items-center h-full ml-5 mt-6">
            <h2>{props.fares.car}</h2>
          </div>
        </div>

        <div onClick={()=>{setRidePanel(true); setConfirmRideVehicleImg('/assets/uber-auto.jpeg'); setConfirmedRideVehicle('auto');setFare(props.fares.auto)}} className="flex active:border-2 rounded-xl flex-row gap-6">
          <div>
            <img
              className="h-15 rounded-2xl"
              src="/assets/uber-auto.jpeg"
              alt=""
            />
          </div>
          <div>
            <div className="flex font-medium mt-1">
              <h2>UberAuto</h2>
              <span>
                <img
                  className="w-5 mt-1"
                  src="/assets/person-logo.png"
                  alt=""
                />
              </span>
            </div>
            <div className="text-sm font-normal">
              <h3 className="font-medium">2mins away</h3>
              <h3>affordable, compact rides</h3>
            </div>
          </div>
          <div className="items-center h-full ml-1 mt-6">
            <h2>{props.fares.auto}</h2>
          </div>
        </div>

        <div onClick={()=>{setRidePanel(true); setConfirmRideVehicleImg('/assets/uber-bike.jpeg');setConfirmedRideVehicle('moto');setFare(props.fares.moto)}} className="flex active:border-2 rounded-xl flex-row gap-6">
          <div>
            <img
              className="h-15 rounded-2xl"
              src="/assets/uber-bike.jpeg"
              alt=""
            />
          </div>
          <div>
            <div className="flex font-semibold mt-1">
              <h2>Moto</h2>
              <span>
                <img
                  className="w-5 mt-1"
                  src="/assets/person-logo.png"
                  alt=""
                />
              </span>
            </div>
            <div className="text-sm font-normal">
              <h3 className="font-medium">2mins away</h3>
              <h3>affordable, compact rides</h3>
            </div>
          </div>
          <div className="items-center h-full ml-1 mt-6">
            <h2>{props.fares.moto}</h2>
          </div>
        </div>
      </div>
      </div>
   
  )
}

export default VehiclePanel