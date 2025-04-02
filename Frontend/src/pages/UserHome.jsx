import React, { useEffect, useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import "remixicon/fonts/remixicon.css";
import LocatioSearchPanel from "../components/LocatioSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmedRide from "../components/ConfirmedRide";
const UserHome = () => {
  const [pickUpLocation, setPickUpLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [currentAddress,setCurrentAddress] = useState('')
  const [destinationAddress,setDestinationAddress] = useState('')
  const [confirmRideVehicleImg, setConfirmRideVehicleImg] = useState('')
  const [fare, setFare]=useState('');
  const panelRef = useRef(null);
  const arrowPanelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const mapOpacityRef = useRef(null);
  const locationPanelCloseRef = useRef(null);
  const formCloseRef = useRef(null);
  const uberLogoRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    setVehiclePanelOpen(true);
    console.log("form submitted Data:", { pickUpLocation, destination });
    setCurrentAddress(pickUpLocation);
    setDestinationAddress(destination);
    setPickUpLocation("");
    setDestination("");
  };
  useGSAP(
    function () {
      if (panelOpen) {
        gsap.to(panelRef.current, {
          height: "60%",
          opacity: 1,
          paddingLeft: "24",
          duration: 1,
          ease: "power2.out",
          display: "block",
          visibility: "visible",
        });
        gsap.to(locationPanelCloseRef.current, {
          height: "100%",
          duration: 0.8,
        });

        gsap.to(arrowPanelCloseRef.current, {
          opacity: 1,
        });
        gsap.to(mapOpacityRef.current, {
          opacity: 0,
          duration: 0.8,
          pointerEvents: "none",
        });
        gsap.to(uberLogoRef.current, {
          opacity: 0,
          duration: 0.8,
        });
      } else {
        gsap.to(panelRef.current, {
          padding: 0,
          opacity: 0,
          height: 0,
          marginTop: 0,
          duration: 0.9,
          onComplete: () => {
            panelRef.current.style.display = "none";
          },
        });
        gsap.to(locationPanelCloseRef.current, {
          height: "auto",
          duration: 0.8,
        });
        gsap.to(arrowPanelCloseRef.current, {
          opacity: 0,
        });
        gsap.to(mapOpacityRef.current, {
          opacity: 1,
          duration: 1.5,
          pointerEvents: "auto",
        });
        gsap.to(uberLogoRef.current, {
          opacity: 1,
          duration: 0.8,
        });
        gsap.to(confirmRidePanelRef.current, {
          transform:'translateY(100%)',
          visibility:'hidden'
        });
      }
    },
    [panelOpen]
  );
  useGSAP(
    function () {
      if (vehiclePanelOpen) {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(0%)",
          duration: 0.8,
        });
        gsap.to(panelRef.current, {
          height: "60%",
          opacity: 0,
          paddingLeft: "24",
          duration: 1,
          ease: "power2.out",
          display: "block",
        }) 
        gsap.to(locationPanelCloseRef.current, {
          height: "100%",
          duration: 0.8,
        });
        gsap.to(arrowPanelCloseRef.current, {
          opacity: 1,
        });
        gsap.to(mapOpacityRef.current, {
          opacity: 0,
          duration: 0,
          pointerEvents: "none",
        });
      } else {
        gsap.to(vehiclePanelRef.current, {
          transform: "translateY(100%)",
          duration: 0.9,
        });
        gsap.to(locationPanelCloseRef.current, {
          height: "auto",
          duration: 0.8,
        });
        gsap.to(arrowPanelCloseRef.current, {
          opacity: 0,
        });
        gsap.to(mapOpacityRef.current, {
          opacity: 1,
          duration: 1.5,
          pointerEvents: "auto",
        });
        gsap.to(uberLogoRef.current, {
          opacity: 1,
          duration: 0.8,
        });
        gsap.to(panelRef.current, {
          padding: 0,
          opacity: 0,
          height: 0,
          marginTop: 0,
          duration: 0.9,
          onComplete: () => {
            panelRef.current.style.display = "none";
          },
        });
       
      }
    },
    [vehiclePanelOpen]
  );

  useGSAP(() => {
    if (mapOpen) {
      gsap.to(formCloseRef.current, {
        opacity: 0,
        pointerEvents: "none", 
        duration: 0.8,
      });
    } else {
      gsap.to(formCloseRef.current, {
        opacity: 1,
        pointerEvents: "all",
        duration: 0.8,
      });
    }
  }, [mapOpen]);
  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        transform:'translateY(0)',
        visibility:'visible',
      });
      
    } else {
      gsap.to(confirmRidePanelRef.current, {
        transform:'translateY(100%)',
        visibility:'hidden'
      });
    }
  }, [confirmRidePanel]);
  
  

  return (
    <div className="h-screen overflow-hidden relative">
      <img
        ref={uberLogoRef}
        className="w-16 absolute mb-8 left-5  top-5"
        src="/assets/uber_logo.png"
        alt=""
      />

      <div
        ref={mapOpacityRef}
        onClick={() => {
          setMapOpen(true);
        }}
        className="h-screen w-screen "
      >
        {/* image for temporary use */}
        <img
          className="h-full w-full object-cover"
          src="https://miro.medium.com/v2/resize:fit:1400/0*gwMx05pqII5hbfmX.gif"
          alt="Map Background"
        />
      </div>
      <div
        ref={locationPanelCloseRef}
        className="  flex flex-col justify-end bottom-0 absolute  w-full mb-0  "
      >
        <div onClick={()=>{setMapOpen(false)}} className="absolute left-42 bottom-20">
          {!panelOpen?<img  className="w-10 rounded-full" src="/assets/up-arrow.png" alt="" />:''}
           
        </div>

        <div
          ref={formCloseRef}
          className="h-[40%] rounded-tl-2xl rounded-tr-xl p-5 bg-white relative"
        >
          <h1 className="text-xl font-semibold mb-3">Find a trip</h1>

          <img
            onClick={() => {            
                setPanelOpen(false);
                setVehiclePanelOpen(false);      
            }}
            ref={arrowPanelCloseRef}
            className="absolute top-6 right-6"
            src="/assets/arrow-down-s-line.png"
            alt=""
          />

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
            <button className="border p-2 w-max mt-5 rounded-xl ">
              Leave Now
            </button>
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 mt-0  ">
          <LocatioSearchPanel
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
          />
        </div>
      </div>

     <div ref={vehiclePanelRef}onClick={()=>{setPanelOpen(false); setVehiclePanelOpen(false)}} className="fixed  w-full bottom-0  bg-white px-3 py-6 z-10 flex flex-col gap-4 h-[60%] ">
     <VehiclePanel confirmRidePanel={confirmRidePanel} confirmRideVehicleImg={confirmRideVehicleImg} 
     fare={fare} setFare={setFare}setConfirmRidePanel={setConfirmRidePanel} setConfirmRideVehicleImg={setConfirmRideVehicleImg}/>
     </div>
     <div className="fixed  w-full bottom-0  bg-white px-3 py-6 z-10 flex flex-col gap-4 h-[80%]" ref={confirmRidePanelRef}>
     <ConfirmedRide confirmRidePanel={confirmRidePanel} confirmRideVehicleImg={confirmRideVehicleImg} currentAddress={currentAddress}  destinationAddress={destinationAddress} fare={fare} setFare={setFare} setConfirmRidePanel={setConfirmRidePanel} setConfirmRideVehicleImg={setConfirmRideVehicleImg}/> 
     </div>
     
    </div>
  );
};

export default UserHome;
