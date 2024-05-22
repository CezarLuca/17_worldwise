import { createContext } from "react";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
    return (
        <CitiesContext.Provider value={null}>{children}</CitiesContext.Provider>
    );
}
