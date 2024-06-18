// src/Map.js
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const Map = () => {
  const lat = 7.050384829407225;
  const lng = 38.47354272883577;

  const center = {
    lat: lat,
    lng: lng,
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyAKA9gCfSkN1u8SgFH9ZT2iwvwUY4glSp0">
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={17}>
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
