import React, { useCallback, useState } from "react";
import { Map, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import DrawControl from "./components/DrawControl";

function CustomMap() {
  
    const [features, setFeatures] = useState({});

  const initialLatitude = 37.7749; // Initial latitude
  const initialLongitude = -122.4194; // Initial longitude
  const [openModal, setOpenModal] = useState(false);
  const [markerPositionsFirstSection, setMarkerPositionsFirstSection] =
    useState([]);
  const [markerPositionsSecondSection, setMarkerPositionsSecondSection] =
    useState([]);
  const [currentSection, setCurrentSection] = useState(1);

  const onUpdate = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);
  
  const onDelete = useCallback(e => {
    setFeatures(currFeatures => {
      const newFeatures = {...currFeatures};
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);
  
  function onCloseModal() {
    setOpenModal(false);
    setCurrentSection(1);
  }

  function onFirstMapClick(event) {
    event.preventDefault();

    const longitude = event.lngLat.lng;
    const latitude = event.lngLat.lat;

    // Set the state
    setMarkerPositionsFirstSection((prevFirstPositions) => [
      ...prevFirstPositions,
      { id: prevFirstPositions.length + 1, lat: latitude, lng: longitude },
    ]);
    
  }

  function onNextSection() {
    // Move to the next section
    setCurrentSection((prevSection) => prevSection + 1);
  }

  console.log(currentSection);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4 text-center">About Page</h1>
      <div className="my-8 text-center items-center justify-center"></div>
      <div className="pl-56 pr-56 text-3xl font-bold mb-4 text-left">
        Welcome to Corp-3, a place where citizens thrive
      </div>
      <Map
        latitude={initialLatitude}
        longitude={initialLongitude}
        attributionControl={true}
        onClick={onFirstMapClick}
        style={{ width: "100%", height: "70vh" }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={
          "pk.eyJ1IjoiYmFsZGVyYiIsImEiOiJjbHRzdWhpOXQwdnN1MmpvM3NkYXVwZTYzIn0.XORjPBIDWqciF-kGNgqF0Q"
        }
      >
        {markerPositionsFirstSection.map((position, index) => (
          <Marker key={index} latitude={position.lat} longitude={position.lng}>
            <svg
              height="20px"
              width="20px"
              viewBox="0 0 24 24"
              style={{ fill: "red" }}
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
          </Marker>
        ))}
        <DrawControl
          position="top-left"
          displayControlsDefault={true}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      </Map>
    </div>
  );
}

export default CustomMap;
