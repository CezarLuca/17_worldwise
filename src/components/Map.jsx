import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import styles from "./Map.module.css";
import { useState } from "react";
import { useCities } from "../hooks/useCities";

export default function Map() {
    const navigate = useNavigate();
    const { citites } = useCities();

    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);

    const [searchParams, setSearchParams] = useSearchParams();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

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
                // center={[mapLat || 40, mapLng || 0]}
                zoom={8}
                scrollWheelZoom={false}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {citites.map((city) => (
                    <Marker
                        position={[city.position.lat, city.position.lng]}
                        key={city.id}
                    >
                        <Popup>
                            <span>{city.emoji}</span>{" "}
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={[mapLat || 40, mapLng || 0]} />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

ChangeCenter.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
