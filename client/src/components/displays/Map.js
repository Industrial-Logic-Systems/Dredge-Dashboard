import "../../../node_modules/leaflet/dist/leaflet.css";
import "../../styles.css";

import { MapContainer, TileLayer, Polyline, useMap } from "react-leaflet";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const Map = (props) => {
  const { positions } = props;
  return (
    <div className="map">
      <MapContainer center={positions.at(-1)} zoom={18} scrollWheelZoom={true}>
        <ChangeView center={positions.at(-1)} zoom={18} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline positions={positions} />
      </MapContainer>
    </div>
  );
};

export default Map;
