import { createContext, useContext, useState, } from "react";

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [ridePanel, setRidePanel] = useState(false);
  const [confirmRideVehicleImg, setConfirmRideVehicleImg] = useState(null);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [destinationAddress, setDestinationAddress] = useState(null);
  const [fare, setFare] = useState(null);
  const [confirmedRide, setConfirmedRide] = useState(false)
    const [finishRide, setFinishRide] = useState(false)
  
  return (
    <RideContext.Provider
      value={{
        ridePanel,
        setRidePanel,
        confirmRideVehicleImg,
        setConfirmRideVehicleImg,
        currentAddress,
        setCurrentAddress,
        destinationAddress,
        setDestinationAddress,
        confirmedRide,
        setConfirmedRide,
         finishRide,
        setFinishRide,
        fare,
        setFare,
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  return useContext(RideContext);
};
