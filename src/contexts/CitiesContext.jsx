import {
    createContext,
    useEffect,
    useContext,
    useReducer,
    useCallback,
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

        case "city/created":
            return {
                ...state,
                isLoading: false,
                cities: [...state.cities, action.payload],
                currentCity: action.payload,
            };

        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                cities: state.cities.filter(
                    (city) => city.id !== action.payload
                ),
                currentCity:
                    state.currentCity.id === action.payload
                        ? {}
                        : state.currentCity,
            };

        case "rejected":
            return { ...state, isLoading: false, error: action.payload };

        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
}

function CitiesProvider({ children }) {
    const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
        reducer,
        initialState
    );

    useEffect(() => {
        async function fetchCities() {
            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${BASE_URL}/cities`);
                let data = await res.json();
                if (!Array.isArray(data)) {
                    data = [];
                }
                dispatch({ type: "cities/loaded", payload: data });
            } catch (error) {
                dispatch({
                    type: "rejected",
                    payload: "There was an error loading the cities...",
                });
            }
        }
        fetchCities();
    }, []);

    const getCityById = useCallback(
        async function getCityById(id) {
            if (Number(id) === currentCity.id) return;

            dispatch({ type: "loading" });

            try {
                const res = await fetch(`${BASE_URL}/cities/${id}`);
                const data = await res.json();
                dispatch({ type: "city/loaded", payload: data });
            } catch (error) {
                dispatch({
                    type: "rejected",
                    payload: "There was an error loading the city...",
                });
            }
        },
        [currentCity.id]
    );

    async function createCity(newCity) {
        dispatch({ type: "loading" });

        try {
            const res = await fetch(`${BASE_URL}/cities`, {
                method: "POST",
                body: JSON.stringify(newCity),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            dispatch({ type: "city/created", payload: data });
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was an error creating the city...",
            });
        }
    }

    async function deleteCity(id) {
        dispatch({ type: "loading" });

        try {
            await fetch(`${BASE_URL}/cities/${id}`, {
                method: "DELETE",
            });
            dispatch({ type: "city/deleted", payload: id });
        } catch {
            dispatch({
                type: "rejected",
                payload: "There was an error deleting the city...",
            });
        }
    }

    return (
        <CitiesContext.Provider
            value={{
                cities,
                isLoading,
                currentCity,
                error,
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
