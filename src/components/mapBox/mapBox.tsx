import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

interface ILatLng {
    lat:number
    lng:number
}

const MapBox = ({lat, lng}: ILatLng) => {
  return (
    <MapContainer center={[lat, lng]} zoom={13} scrollWheelZoom={false} style={{height: "100%", width: "100%"}}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    <Marker position={[lat, lng]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </MapContainer>
  );
};

export default MapBox;
