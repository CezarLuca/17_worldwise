import {
    createContext,
    useState,
    useEffect,
    useContext,
    useReducer,
} from "react";
import PropTypes from "prop-types";

const BASE_URL = "http://localhost:3001";

const CitiesContext = createContext();

const initialState = {
    cities: [],
    isLoading: false,
    currentCity: {},
    error: "",
};

function reducer(state, action) {
    switch (action.type) {
        case "loading":
            return { ...state, isLoading: true };

        case "cities/loaded":
            return { ...state, isLoading: false, cities: action.payload };

        case "city/loaded":
            return { ...state, isLoading: false, currentCity: action.payload };

        case "cities/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
            };

        case "cities/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
            };

        case "rejected":
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
        reducer,
        initialState
    );
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [currentCity, setCurrentCity] = useState({});

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" });

            try {
                // setIsLoading(true);
                const res = await fetch(`${BASE_URL}/cities`);
                let data = await res.json();
                if (!Array.isArray(data)) {
                    data = [];
                }
                dispatch({ type: "cities/loaded", payload: data });
                // setCities(data);
            } catch (error) {
                // console.error(error);
                dispatch({
                    type: "rejected",
                    payload: "There was an error loading the data...",
                });
                // } finally {
                // setIsLoading(false);
            }
        }
        fetchCities();
    }, []);

    async function getCityById(id) {
        dispatch({ type: "loading" });

        try {
            // setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities/${id}`);
            const data = await res.json();
            // setCurrentCity(data);
        } catch (error) {
            console.error(error);
            // } finally {
            //     setIsLoading(false);
        }
    }

    async function createCity(newCity) {
        dispatch({ type: "loading" });

        try {
            // setIsLoading(true);
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            // console.log(data);
            // setCities((prevCities) => [...prevCities, data]);
        } catch {
            alert("There was an error creating the city. Please try again.");
            // } finally {
            //     setIsLoading(false);
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            // setIsLoading(true);
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            // setCities((prevCities) =>
            //     prevCities.filter((city) => city.id !== id)
            // );
        } catch {
            alert("There was an error deleting the city. Please try again.");
            // } finally {
            //     setIsLoading(false);
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                getCityById,
                createCity,
                deleteCity,
            }}
        >
            {children}
        </CitiesContext.Provider>
    );
}

CitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node,
    ]).isRequired,
};

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
}

export { CitiesProvider, CitiesContext, useCities };
