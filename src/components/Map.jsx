import PropTypes from "prop-types";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import AppButton from "./AppButton";

export default function Map() {
    // const navigate = useNavigate();
    const { citites } = useCities();
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
    const [searchParams] = useSearchParams();
    const {
        isLoading: isLoadingPosition,
        position: geolocationPosition,
        getPosition,
    } = useGeolocation();

    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(() => {
        if (mapLat && mapLng) {
            setMapPosition([+mapLat, +mapLng]);
        }
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) {
            setMapPosition([
                geolocationPosition.coords.latitude,
                geolocationPosition.coords.longitude,
            ]);
        }
    }, [geolocationPosition]);

    return (
        <div
            className={styles.mapContainer}
            // onClick={() => {
            //     navigate("form");
            // }}
        >
            <AppButton type="positon" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Get Position"}
            </AppButton>
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
                <ChangeCenter position={mapPosition} />
                <DetectClick />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (e) => {
            navigate(`/form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
            // navigate(`form`);
            // console.log(e.latlng);
        },
    });
}

ChangeCenter.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
};
