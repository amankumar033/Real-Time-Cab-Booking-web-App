import React from 'react';

const LocationSearchPanel = () => {
    // Sample array for locations
    const locations = [
        "C-20/1, Memorial School, Sector-62, Noida, Uttar Pradesh, India-201301",
        "D-3/1, Junior Wing, Sector-32, Noida, Uttar Pradesh, India-23301",
        "E-2/12, Army Kant, Sector-6, Noida, Uttar Pradesh, India-25301",
        "F-11/0, Nally, Sector-22, Noida, Uttar Pradesh, India-201331",
        "G-11/0, Brally, Sector-9, Noida, Uttar Pradesh, India-222331",
      
    ];

    return (
        <div className='flex flex-col gap-2 rounded-xl mr-5 mb-10'>
            {locations.map((location, index) => (
                <div key={index} className='flex gap-2 items-center p-2  rounded-xl active:border-2 '>
                    <img className='w-8 h-7 rounded-lg' src='/assets/map-drop-pin-icon.jpg' alt='Location Pin' />
                    <p>{location}</p>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;
