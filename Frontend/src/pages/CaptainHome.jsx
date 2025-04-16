import React, { useState, useRef, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import RidePopUp from '../components/RidePopUp';
import AcceptRide from '../components/AcceptRide';
import { CaptainDataContext } from '../context/CaptainContext';
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from '../components/LiveTracking';

const CaptainHome = () => {
  const { socket } = useContext(SocketContext);
  const { captain, captainName } = useContext(CaptainDataContext);

  const [popUp, setPopUp] = useState(false);
  const [acceptRide, setAcceptRide] = useState(false);
  const [ride, setRide] = useState(null);
  const [captainLocation, setCaptainLocation] = useState({ lat: 0, lng: 0 });
 const [heightOtpPanel,setHeightOtpPanel]=useState(false)
  const popUpRef = useRef(null);
  const acceptRideRef = useRef(null);

  // ✅ Track and emit captain location
  useEffect(() => {
    const captainId = captain?._id || captain?.captain?._id;
    if (socket && captainId) {
      navigator.permissions.query({ name: 'geolocation' }).then(result => {
        if (result.state === 'granted' || result.state === 'prompt') {
          const watchId = navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              const newLoc = { lat: latitude, lng: longitude };

              socket.emit('update-location-captain', {
                userId: captainId,
                location: newLoc,
              });

              setCaptainLocation(newLoc);
              // console.log("📡 Location emitted:", newLoc);
            },
            (err) => {
              console.error("❌ Geolocation error:", err);
            },
            {
              enableHighAccuracy: true,
              timeout: 10000,
              maximumAge: 0,
            }
          );

          return () => navigator.geolocation.clearWatch(watchId);
        } else {
          alert("⚠️ Please allow location access for tracking to work.");
        }
      });
    }
  }, [socket, captain]);

  useEffect(() => {
    if (ride) {
      console.log("🎯 Ride assigned to captain:", ride);
    }
  }, [ride]);
  
  useEffect(() => {
    const captainId = captain?._id || captain?.captain?._id; // <-- FIXED LINE
  
    if (socket && captainId) {
      socket.emit('join', {
        userId: captainId,
        userType: 'captain'
      });
  
      console.log('✅ join event emitted for captain:', captain);
    } else {
      console.log("⚠️ Captain ID or socket missing:", captain, socket);
    }
  }, [socket, captain]);
  


  useEffect(() => {
    if (!socket) return;
  console.log("Captain socket:", socket);
    const handleNewRide = (data) => {
      console.log("🆕 New Ride Request:", data);
      setRide(data);
      setPopUp(true);
    };

    socket.on('new-ride', handleNewRide);
    return () => {
      socket.off('new-ride', handleNewRide);
    };
  }, [socket]);


  async function confirmRide() {
    const response = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
      {
        rideId: ride._id,
        captainId: captain?._id || captain?.captain?._id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('captainToken')}`,
        },
      }
    );

    setPopUp(false);
  }

  // GSAP animation for RidePopUp
  useGSAP(() => {
    if (popUp) {
      gsap.to(popUpRef.current, {
        duration: 1,
        y: '0%',
        display: 'block',
        ease: 'power2.out',
        height:'85%'
      });
    } else {
      gsap.to(popUpRef.current, {
        duration: 1,
        y: '100%',
        display: 'none',
        ease: 'power2.out',
      });
    }
  }, [popUp]);

  useGSAP(() => {
    if (acceptRide) {
      gsap.to(popUpRef.current, {
        duration: 1,
        display: 'none',
        ease: 'power2.out',
      });
      gsap.to(acceptRideRef.current, {
        duration: 1,
        display: 'block',
        transform: 'translateY(0%)',
        opacity: 1,
        ease: 'power2.out',
      });
    } else {
      gsap.to(acceptRideRef.current, {
        duration: 1.5,
        opacity: 0,
        display: 'none',
        transform: 'translateY(100%)',
        ease: 'power2.out',
      });
    }
  }, [acceptRide]);
  useGSAP(() => {
    if (heightOtpPanel) {
      gsap.to(acceptRideRef.current, {
        height:'35%'
      });
    } 
    else{
      gsap.to(acceptRideRef.current, {
        height:'95%'
      });
    }
  }, [heightOtpPanel]);

  return (
    <div className="overflow-hidden h-screen relative">

      <Link to="/captainhome">
        <img
          className="w-12 right-5 top-5 absolute z-10 bg-white p-3 rounded-full"
          src="/assets/logout-box-r-line.svg"
          alt="logout"
        />
      </Link>
      <div className="absolute z-0 inset-0">
        <LiveTracking captainLocation={captainLocation} />
      </div>

      <div className="absolute bg-white w-screen bottom-0 h-[38%] pl-4 pr-4 pt-6 flex flex-col gap-5">
        <div className="flex justify-between">
          <div className="flex gap-4">
            <img
              className="w-9 h-9 rounded-full"
              src="/assets/profile-pic.jpeg"
              alt="profile"
            />
            <h2 className="font-semibold">
              {captainName?.captain?.fullname?.firstname || "Captain"}{" "}
              {captainName?.captain?.fullname?.lastname || ""}
            </h2>
          </div>
          <div className="mr-3 text-right">
            <h2 className="font-bold">₹295.20</h2>
            <h2 className="text-sm">Earned</h2>
          </div>
        </div>


        <div className="flex justify-between mt-3 bg-gray-200 rounded-lg pr-4 pl-4 pt-3 pb-3 w-full">
          {["Hours Online", "Speed", "Trips"].map((label, i) => (
            <div key={i} className="flex flex-col items-center">
              <img className="w-7" src={`/assets/${i === 0 ? 'clock-symbol' : i === 1 ? 'speed-up-line' : 'booklet-line'}.svg`} alt="" />
              <h2 className="font-semibold">10.2</h2>
              <h2 className="text-sm">{label}</h2>
            </div>
          ))}
        </div>
      </div>


      <div ref={popUpRef} className="bg-white absolute w-full h-[80%] bottom-0">
        <RidePopUp setPopUp={setPopUp} setAcceptRide={setAcceptRide} ride={ride} confirmRide={confirmRide} />
      </div>
      <div ref={acceptRideRef} className="bg-white absolute w-full h-[95%] bottom-0">
        <AcceptRide acceptRide={acceptRide} setAcceptRide={setAcceptRide} ride={ride} setPopUp={setPopUp} heightOtpPanel={heightOtpPanel} setHeightOtpPanel={setHeightOtpPanel}/>
      </div>
    </div>
  );
};

export default CaptainHome;
