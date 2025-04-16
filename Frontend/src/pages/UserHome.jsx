import React, { useContext, useEffect, useRef } from "react";
import { useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useRideContext } from "../context/RideContext";
import "remixicon/fonts/remixicon.css";
import LocationSearchPanel from "../components/LocationSearchPanel";
import VehiclePanel from "../components/VehiclePanel";
import RideInfo from "../components/RideInfo";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios"
import { SocketContext } from "../context/SocketContext";
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom';
import LiveTracking from "../components/LiveTracking";
const UserHome = () => {
  const navigate = useNavigate()
  const {
    ridePanel,
    setRidePanel,
    currentAddress,
    setCurrentAddress,
    destinationAddress,
    setDestinationAddress,
    confirmedRide,
    setConfirmedRide,
    confirmRideVehicleImg,
    confirmedRideVehicle,
    WaitingForDrivers,
    waitingForUser,
    setWaitingForUser
 
  } = useRideContext();
  const{user}=useContext(UserDataContext)
  const {sendMessage, recieveMessage, socket} = useContext(SocketContext)

  const [pickUpLocation, setPickUpLocation] = useState("");
  const [destination, setDestination] = useState("");
  const [panelOpen, setPanelOpen] = useState(false);
  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [acceptedRide, setAcceptedRide] = useState(false)
  const [suggestions, setSuggestions] = useState([])
  const [lastEditedField, setLastEditedField] = useState("");                                         
  const [fareCalculate, setFareCalculate] = useState(false);                                         
  const [fares, setFares] = useState(false);    
  const [ ride, setRide ] = useState(null)         
  const [reducedHeight, setReducedHeight]=useState(false)                  
  const [currentLiveLocation, setCurrentLiveLocation]= useState(false)
  const [userPosition, setUserPosition] = useState(null);
  const panelRef = useRef(null);
  const arrowPanelCloseRef = useRef(null);
  const vehiclePanelRef = useRef(null);
  const mapOpacityRef = useRef(null);
  const locationPanelCloseRef = useRef(null);
  const formCloseRef = useRef(null);
  const uberLogoRef = useRef(null);
  const ridePanelRef = useRef(null);
  const confirmedRidePanelRef = useRef(null);
  const acceptedRidePanelRef = useRef(null);
  const submitHandler = (e) => {
    e.preventDefault();
    setVehiclePanelOpen(true);
    console.log("form submitted Data:", { pickUpLocation, destination });
    setCurrentAddress(pickUpLocation);
    setDestinationAddress(destination);
    setPickUpLocation("");
    setDestination("");
  };

  useEffect(()=>{
      console.log(user)
  },[user])
  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        setUserPosition({
          lat: coords.latitude,
          lng: coords.longitude,
        });
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true }
    );
  
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);
  
  useEffect(() => {
    const fetchSuggestions = async (query) => {
      try {
        const res = await axios.get(`http://localhost:3000/maps/get-suggestions`, {
          params: {
            address: query,
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        });
        setSuggestions(res.data);
        console.log("Suggestions for:", query, res.data);
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };
  
    const delayDebounce = setTimeout(() => {
      if (lastEditedField === "pickup" && pickUpLocation.trim().length > 2) {
        fetchSuggestions(pickUpLocation);
      } else if (lastEditedField === "destination" && destination.trim().length > 2) {
        fetchSuggestions(destination);
      }
    }, 300);
  
    return () => clearTimeout(delayDebounce);
  }, [pickUpLocation, destination, lastEditedField]);

  socket.on('ridestarted', ride => {                          
    navigate('/riding', { state: { ride } }) 
})
useEffect(() => {
  const handleRideCancel = (ride) => {
    console.log("the ride is really really really really really really canceled");
    setRidePanel(true);
    alert('The Captain Cancelled the ride');
    console.log("the values of confirmedRide and ridePanel are", confirmedRide, ridePanel);
    setAcceptedRide(false);
  };

  socket.on('ride-cancel', handleRideCancel);

  return () => {
    socket.off('ride-cancel', handleRideCancel); // Clean up to avoid multiple alerts
  };
}, []); // empty dependency array means this only runs once when component mounts


useEffect(()=>{
setPickUpLocation(currentAddress)
},[currentAddress])


  useEffect(() => {
    if (socket && user?._id) {
      socket.emit('join', {
        userId: user._id,
        userType: 'user'
      });

      // console.log('join event emitted for user:', user);
    }
  }, [socket, user]);
  useEffect(() => {
    const fetchFare = async () => {
      try {
        const fare = await axios.post(
          `http://localhost:3000/rides/getfare`,null,
          {
            params:{
            pickup: currentAddress,
            destination: destinationAddress,
          },
        headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        setFareCalculate(false)
        setFares(fare.data)
        console.log(fare.data);

      } catch (err) {
        console.error("Error fetching fare:",err);
      }
    };
    
    if (fareCalculate) {
      fetchFare();
    }
  }, [fareCalculate, currentAddress, destinationAddress]);


  useEffect(() => {
    console.log("The confirmed ride value is", confirmedRide);
  }, [confirmedRide]);
  useEffect(() => {
    
    if (!socket) return;
  
    const handler = (ride) => {
      console.log("Ride confirmed event received:", ride);
      setAcceptedRide(true);
      setRide(ride)
      console.log("the confirmed ride ride value is",ride)

    };
  
    socket.on('ride-confirmed', handler)
    return () => {
      socket.off('ride-confirmed', handler);
    };
  }, [socket]);

  const createRide = async (vehicleType) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/rides/create`,
        {
          pickup: currentAddress,
          destination: destinationAddress,
          vehicleType: vehicleType,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      console.log("Ride created:", response.data);
    } catch (err) {
      console.error("Error creating ride:", err.response?.data || err.message);
    }
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
        gsap.to(ridePanelRef.current, {
          transform:'translateY(100%)',
          visibility:'hidden'
        });
      }
    }, [panelOpen]);
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
   
    [vehiclePanelOpen]);
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
    if (ridePanel) {
      gsap.to(ridePanelRef.current, {
        transform:'translateY(0)',
        duration:1.1,
        visibility:'visible',
        height:'85%'
      });   
    } else {
      gsap.to(ridePanelRef.current, {
        transform:'translateY(100%)',
        duration:1.1,
        onComplete: () => {
          ridePanelRef.current.style.visibility = 'hidden'; // Hide only after animation completes
        }
      });
    }
  }, [ridePanel]);
  useGSAP(() => {
    if (confirmedRide) {
      gsap.to(confirmedRidePanelRef.current, {
        transform:'translateY(0)',
        duration:1.1,
        visibility:'visible',

      });
      gsap.to(ridePanelRef.current, {
        transform:'translateY(100%)',
        duration:1.1,
        onComplete: () => {
          ridePanelRef.current.style.visibility = 'hidden'; 
        }
      });
    } else {
      gsap.to(confirmedRidePanelRef.current, {
        transform:'translateY(100%)',
        duration:1.1,
        onComplete: () => {
          if (confirmedRidePanelRef.current) {
            confirmedRidePanelRef.current.style.visibility = 'hidden'; 
          }
        }
      });
      
    }
  }, [confirmedRide]);
  useGSAP(() => {
    if (acceptedRide && acceptedRidePanelRef.current) {
      // Animate visibility and position
      gsap.to(acceptedRidePanelRef.current, {
        transform: 'translateY(0)', 
        duration: 1.1, 
        visibility: 'visible', 
        onComplete: () => {
          // Adjust height based on the reducedHeight state
          gsap.to(acceptedRidePanelRef.current, {
            height: reducedHeight ? '40%' : '74%',
            duration: 0.5,
          });
        }
      });
    } else if (acceptedRidePanelRef.current) {
      // Hide panel with a downward translation
      gsap.to(acceptedRidePanelRef.current, {
        transform: 'translateY(100%)',
        duration: 1.1,
        onComplete: () => {
          acceptedRidePanelRef.current.style.visibility = 'hidden'; // Hide after animation
        }
      });
    }
  }, [acceptedRide, reducedHeight]);
  
  

  return (
    <div className="h-screen overflow-hidden relative">
      <img
        ref={uberLogoRef}
        className="w-16 absolute mb-8 left-5 z-10 top-5"
        src="/assets/uber_logo.png"
        alt=""
      />

<div 
  ref={mapOpacityRef}
  className="absolute inset-0 z-0"
>
<LiveTracking
  currentLiveLocation={currentLiveLocation}
  setCurrentLiveLocation={setCurrentLiveLocation}
  setCurrentAddress={setCurrentAddress}
  userLocation={userPosition} // ✅ This is it
  waitingForUser={waitingForUser}
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
          className="h-[40%] rounded-tl-2xl rounded-tr-xl p-5 bg-white  relative">
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
          <div onClick={()=>{setCurrentLiveLocation(true)}} className="absolute top-20 right-8 bg-white rounded-full p-1">📍</div>
          <form onSubmit={(e) => submitHandler(e)} className="flex flex-col">
            <input
              type="text"
              required
              value={pickUpLocation}
              onChange={(e) => {
                setPickUpLocation(e.target.value);
                setLastEditedField("pickup");
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee] py-3 px-12 rounded-xl text-base mt-3 w-full"
              placeholder="Add a pick-up location"
            />
            <div className="w-4 absolute left-[10%] top-22">
            <img className="rounded-full" src="/assets/double-circle.png" alt="" />
            </div>
            <div className="line w-1 h-16 left-11 top-25 absolute rounded bg-gray-700"></div>
            <div className="w-4 absolute left-[10%] bottom-25">
              <img  src="/assets/double-square.png" alt="" />
            </div>
            <input
              type="text"
              required
              value={destination}
              onChange={(e) => {
                setDestination(e.target.value);
                setLastEditedField("destination");
              }}
              onClick={() => {
                setPanelOpen(true);
              }}
              className="bg-[#eee]  rounded-xl text-base mt-4 w-full py-3 px-12"
              placeholder="Enter your destination"
            />
  <button onClick={()=>{  setFareCalculate(true);}} className="border p-2 w-max mt-5 rounded-xl ">
              Leave Now
            </button>
            <div>
    
          </div>
         
          </form>
        </div>
        <div ref={panelRef} className="bg-white h-0 mt-0  ">
          <LocationSearchPanel
            vehiclePanelOpen={vehiclePanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen} suggestions={suggestions} setPickUpLocation={setPickUpLocation} setDestination={setDestination}
            lastEditedField={lastEditedField}
          />
        </div>
      </div>

     <div ref={vehiclePanelRef}onClick={()=>{setPanelOpen(false); setVehiclePanelOpen(false)}} className="fixed  w-full bottom-0  bg-white px-3 py-6 z-10 flex flex-col gap-4 h-[60%] ">
     <VehiclePanel fares={fares}/>
     </div>
     <div className="fixed  w-full bottom-0  bg-white px-3 py-4 z-10 flex flex-col gap-3 h-[80%]" ref={ridePanelRef}>
      <div onClick={()=>{setRidePanel(false)}} className=" w-full flex items-center justify-center top-2">
      </div>
     <RideInfo createRide={createRide} /> 
     </div>
     <div className="fixed  w-full bottom-0  bg-white px-3 py-4 z-10 flex flex-col gap-3 h-[73%]" ref={confirmedRidePanelRef}>
      <LookingForDriver/>
     </div>
     <div className="fixed  w-full bottom-0  bg-white px-3 py-4 z-10 flex flex-col gap-3 h-[74%]" ref={acceptedRidePanelRef}>
      {reducedHeight?<img onClick={()=>{setReducedHeight(false)
        setWaitingForUser(true)
      }

     } className="w-5 absolute right-45" src="/assets/up-arrow.png" alt="" />:<img
            onClick={() => {      
              setConfirmedRide(false)      
                  setReducedHeight(true)
                  setWaitingForUser(true)
            }}
            className="absolute top-6 right-45"
            src="/assets/arrow-down-s-line.png"
            alt=""
          />}
      
      
      <WaitingForDriver  ride={ride}/>
     </div>
    </div>
  );
};

export default UserHome;