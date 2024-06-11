// import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import Message from "./Message";
import { useCities } from "../contexts/CitiesContext";

function CountryList() {
    const { cities, isLoading } = useCities();
    if (isLoading) {
        return <Spinner />;
    }
    if (cities.length === 0) {
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );
    }

    const countries = cities.reduce((arr, city) => {
        if (!arr.map((el) => el.name).includes(city.country)) {
            return [
                ...arr,
                { name: city.country, emoji: city.emoji, id: city.id },
            ];
        } else {
            return arr;
        }
    }, []);

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.id} />
            ))}
        </ul>
    );
}

CountryList.propTypes = {
    // cities: PropTypes.arrayOf(
    //     PropTypes.shape({
    //         id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
    //             .isRequired,
    //     })
    // ).isRequired,
    // isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
