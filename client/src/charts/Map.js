import "../../node_modules/leaflet/dist/leaflet.css";
import "../styles.css";

import { MapContainer, TileLayer, Polyline } from "react-leaflet";

const Map = (props) => {
  const { positions } = props;
  return (
    <MapContainer center={positions.at(-1)} zoom={18} scrollWheelZoom={true}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Polyline positions={positions} />
    </MapContainer>
  );
};

export default Map;
