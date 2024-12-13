import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Custom Truck Icon
const truckIcon = L.icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/2554/2554978.png", // Replace with the path to your truck image
  iconSize: [36, 36], // Size of the icon
  iconAnchor: [16, 32], // Anchor point of the icon
  popupAnchor: [0, -32], // Where the popup appears relative to the icon
});

type Props = {
  mapCenter?: [number, number]; // Default center can be passed as a prop
  truckLocation?: [number, number]; // Truck location can also be passed
};

const VehicleLocation = ({
  mapCenter = [27.68895, 85.343984],
  truckLocation = [27.7, 85.35],
}: Props) => {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Default Center Marker */}
        {/* <Marker position={mapCenter}>
          <Popup>
            Default Center: <br />
            Latitude: {mapCenter[0]}, Longitude: {mapCenter[1]}
          </Popup>
        </Marker> */}

        {/* Truck Marker */}
        <Marker position={truckLocation} icon={truckIcon}>
          <Popup>
            Truck Location: <br />
            Latitude: {truckLocation[0]}, Longitude: {truckLocation[1]}
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
};

export default VehicleLocation;
