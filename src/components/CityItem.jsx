import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import PropTypes from "prop-types";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, date, id, position } = city;
    // console.log("CityItem", position);
    const emoji = city.emoji || "🏙️"; // Default emoji if none is provided
    return (
        <li>
            <Link
                className={styles.cityItem}
                to={`${id}?lat=${position.lat}&lng=&${position.lng}`}
            >
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>({formatDate(date)})</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

CityItem.propTypes = {
    city: PropTypes.shape({
        // id: PropTypes.number.isRequired,
        cityName: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        // date: PropTypes.string.isRequired,
        // date: PropTypes.instanceOf(Date).isRequired,
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
