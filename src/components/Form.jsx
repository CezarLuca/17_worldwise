import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import AppButton from "./AppButton";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
    const [lat, lng] = useUrlPosition();
    const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
    // console.log(lat, lng);
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [date, setDate] = useState(new Date());
    const [notes, setNotes] = useState("");

    useEffect(() => {
        async function fetchCityData() {
            try {
                setIsLoadingGeocoding(true);
                const response = await fetch(
                    `${BASE_URL}?latitude=${lat}&longitude=${lng}`
                );
                const data = await response.json();
                console.log(data);
                setCityName(data.city || data.locality || "");
                setCountry(data.countryName || "");
                // `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
            } catch (error) {
                console.error(error);
            } finally {
                setIsLoadingGeocoding(false);
            }
        }
        fetchCityData();
    }, [lat, lng]);

    return (
        <form className={styles.form}>
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
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
