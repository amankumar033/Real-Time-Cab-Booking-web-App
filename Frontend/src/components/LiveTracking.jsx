import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Import marker images
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix missing icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const LiveTracking = ({ mapOpen }) => {
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const [position, setPosition] = useState({ lat: 12.9716, lng: 77.5946 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (mapRef.current !== null) return;

    const map = L.map('map').setView([position.lat, position.lng], 15);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    const marker = L.marker([position.lat, position.lng]).addTo(map);
    markerRef.current = marker;

    // Create custom locate button
    const locateButton = L.control({ position: 'bottomright' });
    locateButton.onAdd = function () {
      const button = L.DomUtil.create('button', 'leaflet-bar');
      button.innerHTML = '📍';
      button.title = 'Find my location';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = 'white';
      button.style.border = 'none';
      button.style.padding = '4px';
      button.style.borderRadius = '4px';
      button.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.2)';
      button.style.zIndex = '1000';
      button.style.fontSize = '25px';
      button.style.borderRadius = '22px';

       
      button.onclick = () => {
        if (loading) return;
        setLoading(true);
        button.innerHTML = '⏳';

        // Check for geolocation support
        if (!navigator.geolocation) {
          setError('Geolocation is not supported by your browser.');
          setLoading(false);
          return;
        }

        navigator.geolocation.getCurrentPosition(
          (position) => {
            const newPos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setPosition(newPos);
            if (mapRef.current) {
              const currentZoom = mapRef.current.getZoom();
              mapRef.current.setView(newPos, currentZoom);
            }
            if (markerRef.current) markerRef.current.setLatLng(newPos);
            setLoading(false);
            button.innerHTML = '📍';
          },
          (err) => {
            console.error('Geolocation error:', err);
            setLoading(false);
            button.innerHTML = '📍';
            switch (err.code) {
              case err.PERMISSION_DENIED:
                setError('Permission to access location was denied.');
                break;
              case err.POSITION_UNAVAILABLE:
                setError('Location information is unavailable.');
                break;
              case err.TIMEOUT:
                setError('The request to get user location timed out. Please try again.');
                break;
              default:
                setError('An unknown error occurred.');
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 20000, // Timeout set to 20 seconds
            maximumAge: 10000,
          }
        );
      };

      return button;
    };
    locateButton.addTo(map);

    const buttonContainer = locateButton.getContainer();
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.bottom = '270px';
    buttonContainer.style.right = '20px';
    buttonContainer.style.zIndex = '1000';
    
    const zoomControl = map.zoomControl;
    zoomControl.setPosition('topleft');
    zoomControl.getContainer().style.top = '60px';
    zoomControl.getContainer().style.left = '10px';
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, [position, loading]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const newPos = { lat: coords.latitude, lng: coords.longitude };
        setPosition(newPos);
        if (markerRef.current) markerRef.current.setLatLng(newPos);
        if (mapRef.current) {
          const currentZoom = mapRef.current.getZoom();
          mapRef.current.setView(newPos, currentZoom);
        }
      },
      (err) => console.error('Geolocation error:', err),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    if (mapRef.current) {
      const timer = setTimeout(() => {
        mapRef.current.invalidateSize();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [mapOpen]);

  return (
    <div
      id="map"
      className={`w-full h-full ${mapOpen ? 'pointer-events-none' : 'pointer-events-auto'}`}
      style={{ position: 'relative' }}
    >
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LiveTracking;
