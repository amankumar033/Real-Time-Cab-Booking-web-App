import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

// Custom Icons
const userIcon = L.icon({
  iconUrl: '/assets/user-destination-map-pin.svg', // Add your custom user icon here
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const captainIcon = L.icon({
  iconUrl: '/assets/user-address-map-pin.svg', // Use your custom captain icon here
  iconSize: [50, 50],
  iconAnchor: [50, 50],
});

const LiveTracking = ({
  captainLocation,
  currentLiveLocation = false,
  setCurrentLiveLocation,
  setCurrentAddress,
  locationMarkerPos
}) => {
  const captainMarkerRef = useRef(null);
  const mapRef = useRef(null);
  const userMarkerRef = useRef(null);
  const [position, setPosition] = useState({ lat: 0, lng: 0 });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Debugging: Check if captainLocation is passed correctly
  useEffect(() => {
    console.log("Captain Location:", captainLocation);  // Debug log
  }, [captainLocation]);

  // Initialize the map and add markers for user and captain
  useEffect(() => {
    if (captainLocation && mapRef.current) {
      console.log("Adding captain marker...");

      // Ensure captainLocation is valid
      if (!captainLocation.lat || !captainLocation.lng) {
        console.error('Invalid captain location:', captainLocation);  // Log error if location is invalid
        return;
      }

      if (!captainMarkerRef.current) {
        const offset = 0.00005; // Offset slightly if user and captain are at the same location
        const lat = captainLocation.lat;
        const lng = captainLocation.lng + offset;  // Add offset to prevent overlap

        const marker = L.marker([lat, lng], {
          icon: captainIcon,
        })
          .addTo(mapRef.current)
          .bindTooltip('Captain', { permanent: true, direction: 'top' });

        captainMarkerRef.current = marker;
      } else {
        // Update captain marker location
        captainMarkerRef.current.setLatLng([
          captainLocation.lat,
          captainLocation.lng + 0.00005, // Slightly offset to avoid overlap
        ]);
      }
    } else {
      console.log("Waiting for captainLocation...");
    }
  }, [captainLocation]);

  useEffect(() => {
    if (mapRef.current !== null) return;

    const map = L.map('map').setView([position.lat, position.lng], 15);
    mapRef.current = map;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    // Add the user marker
    const userMarker = L.marker([position.lat, position.lng], {
      icon: userIcon,
    })
      .addTo(map)
      .bindTooltip('You', { permanent: true, direction: 'top' });

    userMarkerRef.current = userMarker;

    const locateButton = L.control({ position: 'bottomright' });
    locateButton.onAdd = function () {
      const button = L.DomUtil.create('button', 'leaflet-bar');
      button.innerHTML = '📍';
      button.title = 'Find my location';
      button.style.cursor = 'pointer';
      button.style.backgroundColor = 'white';
      button.style.border = 'none';
      button.style.padding = '4px';
      button.style.borderRadius = '22px';
      button.style.boxShadow = '0px 0px 10px rgba(0,0,0,0.2)';
      button.style.zIndex = '1000';
      button.style.fontSize = '25px';

      button.onclick = () => {
        if (loading) return;
        setLoading(true);
        button.innerHTML = '⏳';

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
            if (userMarkerRef.current) userMarkerRef.current.setLatLng(newPos);
            setLoading(false);
            button.innerHTML = '📍';
          },
          (err) => {
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
            timeout: 20000,
            maximumAge: 10000,
          }
        );
      };

      return button;
    };
    locateButton.addTo(map);

    const buttonContainer = locateButton.getContainer();
    buttonContainer.style.position = 'absolute';
    buttonContainer.style.bottom = locationMarkerPos ? '148px' : '260px';
    buttonContainer.style.right = '13px';
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

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
        params: {
          lat,
          lon: lng,
          format: 'jsonv2',
        },
        headers: {
          'Accept-Language': 'en',
        },
      });
      const address = res.data.display_name || 'Address not found';
      return address;
    } catch (err) {
      return 'Error fetching address';
    }
  };

  useEffect(() => {
    if (!currentLiveLocation || !setCurrentAddress || !setCurrentLiveLocation) return;

    const { lat, lng } = position;

    const fetchAddress = async () => {
      const address = await reverseGeocode(lat, lng);
      setCurrentAddress(address);
    };

    fetchAddress();
    setCurrentLiveLocation(false);
  }, [currentLiveLocation]);

  useEffect(() => {
    const watchId = navigator.geolocation.watchPosition(
      ({ coords }) => {
        const newPos = { lat: coords.latitude, lng: coords.longitude };
        setPosition(newPos);
        if (userMarkerRef.current) userMarkerRef.current.setLatLng(newPos);
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

  return (
    <div
      id="map"
      className="w-full h-full"
      style={{ position: 'relative' }}
    >
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default LiveTracking;
