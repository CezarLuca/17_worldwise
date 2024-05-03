import PropTypes from "prop-types";
import styles from "./CountryList.module.css";
import Spinner from "./Spinner";
// import CityItem from "./CityItem";
import CountryItem from "./CountryItem";
import Message from "./Message";

function CountryList({ cities, isLoading }) {
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

    // const countries = [];

    // cities.forEach((city) => {
    //     const country = countries.find((ctry) => ctry.name === city.country);
    //     if (country) {
    //         country.cities.push(city);
    //     } else {
    //         countries.push({
    //             id: city.id,
    //             name: city.country,
    //             cities: [city],
    //             emoji: city.emoji,
    //         });
    //     }
    // });

    return (
        <ul className={styles.countryList}>
            {countries.map((country) => (
                <CountryItem country={country} key={country.id} />
            ))}
        </ul>
    );
}

CountryList.propTypes = {
    cities: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
                .isRequired,
            // id: PropTypes.number.isRequired,
            // name: PropTypes.string.isRequired,
        })
    ).isRequired,
    isLoading: PropTypes.bool.isRequired,
};

export default CountryList;
