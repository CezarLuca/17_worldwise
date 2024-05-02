import styles from "./CityItem.module.css";
import PropTypes from "prop-types";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));

function CityItem({ city }) {
    const { cityName, emoji, date } = city;
    return (
        <li className={styles.cityItem}>
            <span className={styles.emoji}>{emoji}</span>
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>({formatDate(date)})</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}

CityItem.propTypes = {
    city: PropTypes.shape({
        // id: PropTypes.number.isRequired,
        cityName: PropTypes.string.isRequired,
        emoji: PropTypes.string.isRequired,
        // date: PropTypes.string.isRequired,
        date: PropTypes.instanceOf(Date).isRequired,
    }).isRequired,
};

export default CityItem;
