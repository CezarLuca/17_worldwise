import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";
import PropTypes from "prop-types";

function CountryList({ cities, isLoading }) {
    if (isLoading) {
        return <Spinner />;
    }
    if (cities.length === 0) {
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );
    }
    return (
        <ul className={styles.CountryList}>
            {cities.map((city) => (
                <CityItem city={city} key={city.id} />
            ))}
        </ul>
    );
}

CountryList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            // name: PropTypes.string.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
