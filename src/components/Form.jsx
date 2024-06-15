/* eslint-disable react-refresh/only-export-components */
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Form.module.css";
import AppButton from "./AppButton";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import Message from "./Message";
import Spinner from "./Spinner";

export function convertToEmoji(countryCode) {
    const codePoints = countryCode
        .toUpperCase()
        .split("")
        .map((char) => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    // console.log(lat, lng);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");
    // const emoji = convertToEmoji(country);
    const [emoji, setEmoji] = useState("");
    const [geocodingError, setGeocodingError] = useState("");

    useEffect(() => {
        if (!lat || !lng) return;
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                const response = await fetch(
                    `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                );
                const data = await response.json();
                // console.log(data);
                if (!data.countryCode)
                    throw new Error(
                        "That doesn't seem like a city. Click somewhere else."
                    );
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                // `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
                setEmoji(convertToEmoji(data.countryCode || ""));
            } catch (error) {
                // console.error(error);
                setGeocodingError(error.message);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    function handleSubmit(event) {
        event.preventDefault();
        // console.log(cityName, country, date, notes);
        if (!cityName || !date) return;

        const newCity = {
            cityName,
            country,
            emoji,
            date,
            notes,
            position: { lat, lng },
        };
        // console.log(newCity);
    }

    if (isLoadingGeocoding) return <Spinner />;

    if (!lat || !lng) return <Message message="Click somewhere on the map" />;

    if (geocodingError) return <Message message={geocodingError} />;

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>{emoji}</span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                {/* <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                /> */}
                <DatePicker
                    id="date"
                    onChange={(date) => setDate(date)}
                    selected={date}
                    dateFormat={"dd/MM/yyyy"}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <AppButton type="primary">Add</AppButton>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
