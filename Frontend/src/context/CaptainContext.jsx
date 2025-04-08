import { createContext, useState, useContext } from 'react';

export const CaptainDataContext = createContext();

const CaptainContext = ({ children }) => {
    const [ captain, setCaptain ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [captainName, setCaptainName]= useState("1234")
    const updateCaptain = (captainData) => {
        setCaptain(captainData);
    };

    const value = {
        captain,
        setCaptain,
        isLoading,
        setIsLoading,
        error,
        captainName, captainName,
        setError,
        updateCaptain,
        captainName,
         setCaptainName
    };

    return (
        <CaptainDataContext.Provider value={value}>
            {children}
        </CaptainDataContext.Provider>
    );
};

export default CaptainContext;