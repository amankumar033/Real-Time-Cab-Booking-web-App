import React from 'react';
const LocationSearchPanel = (props) => {
    const handleClick = (location) => {
        if (props.lastEditedField === 'pickup') {
            props.setPickUpLocation(location);
        } else if (props.lastEditedField === 'destination') {
            props.setDestination(location);
        }
    };
    return (
        <div className='flex flex-col rounded-xl mr-5 mb-10'>
            {props.suggestions.map((location, index) => (
                <div key={index} onClick={()=>handleClick(location)} className='flex gap-2  p-2  rounded-xl active:border-2 '>
                    <img className='w-8 h-7 rounded-full mt-1' src='/assets/map-drop-pin-icon.jpg' alt='Location Pin' />
                    <p>{location}</p>
                </div>
            ))}
        </div>
    );
};

export default LocationSearchPanel;
