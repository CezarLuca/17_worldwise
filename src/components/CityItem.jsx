import { Link, useLocation } from "react-router-dom";
import styles from "./CityItem.module.css";
import PropTypes from "prop-types";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { currentCity, deleteCity } = useCities();
    const { cityName, date, id, position } = city;
    const emoji = city.emoji || "🏙️"; // Default emoji if none is provided
    const linkLocation = useLocation();
    let linkPath = `${id}?lat=${position.lat}&lng=&${position.lng}`;

    if (linkLocation.pathname === "/app") {
        linkPath = "/app/cities/" + linkPath;
    }

    function handleClick(event) {
        event.preventDefault();
        deleteCity(id);
        // console.log("Delete button clicked");
    }

    return (
        <li>
            <Link
                className={`${styles.cityItem} ${
                    id === currentCity.id ? styles["cityItem--active"] : ""
                } `}
                to={linkPath}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn} onClick={handleClick}>
                    &times;
                </button>
            </Link>
        </li>
    );
}

CityItem.propTypes = {
    city: PropTypes.shape({
        cityName: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        position: PropTypes.oneOfType([
            PropTypes.shape({
                lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
                lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
                    .isRequired,
            }),
            PropTypes.arrayOf(
                PropTypes.shape({
                    lat: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]).isRequired,
                    lng: PropTypes.oneOfType([
                        PropTypes.string,
                        PropTypes.number,
                    ]).isRequired,
                })
            ),
        ]).isRequired,
        date: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.number,
            PropTypes.instanceOf(Date),
        ]).isRequired,
    }).isRequired,
};

export default CityItem;
