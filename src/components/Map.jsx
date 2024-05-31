import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";

export default function Map() {
    const navigate = useNavigate();
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

    const [searchParams, setSearchParams] = useSearchParams();
    const lat = searchParams.get("lat");
    const lng = searchParams.get("lng");

    return (
        <div
            className={styles.mapContainer}
            onClick={() => {
                navigate("form");
            }}
        >
            {/* <h1>Map</h1>
            <h2>
                Position: {lat} {lng}
            </h2>
            <button
                onClick={() => {
                    setSearchParams({ lat: 23, lng: 50 });
                }}
            >
                Change Position
            </button> */}
            <MapContainer
                center={mapPosition}
                zoom={13}
                scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={mapPosition}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
