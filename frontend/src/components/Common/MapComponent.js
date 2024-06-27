import React, { useState, useEffect } from 'react';
import { GoogleMap, Autocomplete, InfoWindow } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '400px'
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

function MapComponent({ initialLocation = defaultCenter, onLocationSelected, eventTitle, eventDescription }) {
  const [location, setLocation] = useState(defaultCenter);
  const [autocomplete, setAutocomplete] = useState(null);
  const [showInfoWindow, setShowInfoWindow] = useState(true);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    if (
      initialLocation &&
      typeof initialLocation.lat === 'number' &&
      typeof initialLocation.lng === 'number' &&
      isFinite(initialLocation.lat) &&
      isFinite(initialLocation.lng)
    ) {
      setLocation(initialLocation);
      if (marker) {
        marker.setPosition(initialLocation);
      } else if (window.google && window.google.maps) {
        const newMarker = new window.google.maps.Marker({
          map,
          position: initialLocation,
          title: eventTitle,
        });
        setMarker(newMarker);
      }
    }
  }, [initialLocation, map]);

  useEffect(() => {
    if (marker && showInfoWindow && window.google && window.google.maps) {
      const infoWindow = new window.google.maps.InfoWindow({
        content: `<div><h4>${eventTitle}</h4><p>${eventDescription}</p></div>`,
      });
      infoWindow.open(map, marker);
      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    }
  }, [marker, showInfoWindow, eventTitle, eventDescription]);

  const onLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      };
      setLocation(newLocation);
      if (onLocationSelected) {
        onLocationSelected(newLocation);
      }
      if (marker) {
        marker.setPosition(newLocation);
      }
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  };

  const handleClick = (event) => {
    if (window.google && window.google.maps) {
      const newLocation = {
        lat: event.latLng.lat(),
        lng: event.latLng.lng()
      };
      setLocation(newLocation);
      if (onLocationSelected) {
        onLocationSelected(newLocation);
      }
      if (marker) {
        marker.setPosition(newLocation);
      }
    }
  };

  const handleMapLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <>
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input type="text" placeholder="Enter a location" style={{ width: '100%', height: '40px' }} />
      </Autocomplete>
      {window.google && window.google.maps && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={18}
          onClick={handleClick}
          onLoad={handleMapLoad}
        />
      )}
    </>
  );
}

export default MapComponent;
