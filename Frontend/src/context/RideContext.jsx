import { createContext, useContext, useState, } from "react";

const RideContext = createContext();

export const RideProvider = ({ children }) => {
  const [ridePanel, setRidePanel] = useState(false);
  const [confirmRideVehicleImg, setConfirmRideVehicleImg] = useState(null);
  const [currentAddress, setCurrentAddress] = useState('');
  const [destinationAddress, setDestinationAddress] = useState(null);
  const [fare, setFare] = useState(null);
  const [confirmedRide,  setConfirmedRide] = useState(false)
  const [confirmedRideVehicle, setConfirmedRideVehicle] = useState(false)
    const [finishRide, setFinishRide] = useState(false)
    const [test, setTest] = useState(false)
    const [ waitingForDrivers, setWaitingForDriver ] = useState(false)
    const [waitingForUser,setWaitingForUser]=useState(false)
  return (
    <RideContext.Provider
      value={{
        ridePanel,
        waitingForDrivers,
        setWaitingForDriver,
        setRidePanel,
        confirmRideVehicleImg,
        setConfirmRideVehicleImg,
        currentAddress,
        setCurrentAddress,
        destinationAddress,
        setDestinationAddress,
        confirmedRide,
        setConfirmedRide,
        confirmedRideVehicle,
        setConfirmedRideVehicle,
         finishRide,
        setFinishRide,
        fare,
        setFare,
        waitingForUser,
        setWaitingForUser
      }}
    >
      {children}
    </RideContext.Provider>
  );
};

export const useRideContext = () => {
  return useContext(RideContext);
};
