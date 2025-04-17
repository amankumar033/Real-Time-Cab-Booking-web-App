import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState,useRef, } from "react";
import axios from 'axios'
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRideContext } from "../context/RideContext";
const AcceptRide = (props) => {
   const {
      ridePanel,
      setRidePanel,
      currentAddress,
      setCurrentAddress,
      destinationAddress,
      setDestinationAddress,
      setConfirmedRide,
      confirmedRide,rideDestination
    } = useRideContext();
  const [otp, setOtp] = useState("");
  const newArrowref=useRef(null)
  const secArrowref=useRef(null)
// console.log("the accepted ride value is",rideDestination,destinationAddress)
  const navigate = useNavigate();
  const submitHandler = async(e) => {
    e.preventDefault();
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/startride`, {
      params: {
          rideId: props.ride._id,
          otp: otp
      },
      headers: {
          Authorization: `Bearer ${localStorage.getItem('captainToken')}`
      }
  })
  if (response.status === 200) {
      navigate('/captainriding', { state: { ride: props.ride,rideDestination } })
  }
  };
  // console.log("the prop is",props.ride);
  const rideCanceled = async (e) => {
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/cancelride`, 
        {
          ride: props.ride, // send rideId in body
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
          },
        }
      );
      if (response.status === 200) {
        // console.log("the ride is reaaly canceled")
    }
      // console.log("Ride cancelled:", response.data);
    } catch (error) {
      console.error("Ride cancel error:", error);
    }
   
  };
  
  return (
    <div className="mt-10 mr-4 ml-4">
      <div className="text-xl font-bold mb-5">
        <h1>Confirm this Ride to Start</h1>
      </div>
      <div className="flex">
        {
          props.heightOtpPanel?
          <img ref={newArrowref} onClick={()=>{props.setHeightOtpPanel(false)}} className="w-5 absolute top-0 right-42" src="/assets/up-arrow.png
          " alt="" />
          : <img ref={secArrowref}
          onClick={() => {
            props.setHeightOtpPanel(true)
          }}
          className="w-6 absolute top-2 left-1/2"
          src="/assets/arrow-down-wide-line.svg"
          alt=""
        />
        }
       
      </div>
      <div className="flex justify-between bg-amber-300 rounded-md py-2 px-3 items-center">
        <div className="flex gap-4 items-center">
          <img
            className="w--8 h-9 rounded-full top-0 "
            src="/assets/random-people.jpeg"
            alt=""
          />
          <h2 className="font-semibold">{props?.ride?.user?.fullname?.firstname+" "+props?.ride?.user?.fullname?.lastname}</h2>
        </div>
        <h2 className="font-semibold">2.2 KM</h2>
      </div>
      <div className="flex flex-col gap-4 relative ">
        <div className="flex gap-5   ml-4 mt-9 items-center">
          <img
            className="w-5 h-10"
            src="/assets/user-address-map-pin.svg"
            alt=""
          />
          <h2 className="w-full">{props?.ride?.pickup}</h2>
        </div>
        <div className="line  bg-gray-300 h-[1px] ml-2 mr-2"></div>
        <div className="flex gap-5 ml-4 items-center">
          <img
            className="w-5 h-10"
            src="/assets/user-destination-map-pin.svg"
            alt=""
          />
          <h2 className="">{props?.ride?.destination}</h2>
        </div>
        <div className="line  bg-gray-300 h-[1px] ml-2 mr-2"></div>
        <div className="flex gap-5 ml-4 items-center">
          <img
            className="w-5 h-10"
            src="/assets/money-rupee-circle-line.svg"
            alt=""
          />
          <div>
            <h2 className="font-medium">₹{props?.ride?.fare}</h2>
            <h2>Cash</h2>
          </div>
        </div>
        <form onSubmit={submitHandler}>
          <input
            required value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="w-full bg-gray-200 rounded-lg py-3 px-5"
            placeholder="Enter OTP"
          />
          <button className="bg-green-500 py-3 rounded-lg  mt-4 w-full">
            Confirm
          </button>
        </form>
        <button onClick={()=>{rideCanceled();props.setAcceptRide(false);console.log(props.acceptRide);

}} className='bg-red-600 p-3 rounded-lg '>Cancel</button>
      </div>
    </div>
  );
};

export default AcceptRide;

 