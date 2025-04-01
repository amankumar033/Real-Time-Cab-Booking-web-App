import React, { useRef } from "react";
import { useState } from "react";
import {useGSAP} from "@gsap/react"
import { gsap } from "gsap";
import 'remixicon/fonts/remixicon.css'
import LocatioSearchPanel from "../components/LocatioSearchPanel";
const UserHome = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef=useRef(null)
  const panelClose =useRef(null)
  const submitHandler = (e) => {
    e.preventDefault();
    console.log("form submitted Data:", { pickUpLocation, destination });
    setPickUpLocation("");
    setDestination("");
  };
  useGSAP(function(){
    if(panelOpen){
      gsap.to(panelRef.current, {
        height:"70%",
        duration:0.8,})
        gsap.to(panelClose.current, {
          opacity:1
        })
    
    }
    else{
      gsap.to(panelRef.current, {
        height:"0%"
    }) 
    gsap.to(panelClose.current, {
      opacity:0
    }) 
    }
},[panelOpen])
  return (
    <div className="relative h-screen  ">
      <img
        className="w-16 absolute mb-8 left-5  top-5"
        src="/assets/Uber_logo.png"
        alt=""
      />
      <div className="h-screen w-screen ">
        {/* image for temporary use */}
        <img
          className="h-full w-full  object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt=""
        />
      </div>

      <div className="  flex flex-col justify-end bottom-0 h-screen absolute  w-full  ">
        <div className="h-[40%] rounded-tl-2xl rounded-tr-xl p-5 bg-white relative">
          <h1 className="text-xl font-semibold mb-3">Find a trip</h1>

          <img onClick={() => setPanelOpen(false)} ref={panelClose} className="absolute top-6 right-6" src="/assets/arrow-down-s-line.png" alt="" />

          <form onSubmit={(e) => submitHandler(e)} className="flex flex-col">
            <input
              type="text"
              required
              value={pickUpLocation}
              onChange={(e) => {
                setPickUpLocation(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] py-3 px-12 rounded-xl text-base mt-3 w-full"
              placeholder="Add a pick-up location"
            />
            <div className="line w-1 h-17 left-11 top-24 absolute rounded bg-gray-700"></div>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee]  rounded-xl text-base mt-4 w-full py-3 px-12"
              placeholder="Enter your destination"
            />
            <button className="border p-2 w-max mt-5 rounded-xl">
              Leave Now
            </button>
          </form>
        </div>
        <div ref={panelRef} className="bg-red-500 w-full ">
          <LocatioSearchPanel/>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
