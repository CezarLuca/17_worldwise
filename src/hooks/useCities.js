import { useContext } from "react";
import { CitiesContext } from "./CitiesProvider"; // Adjust the import path as necessary

function useCities() {
    const context = useContext(CitiesContext);
    if (context === undefined) {
        throw new Error("useCities must be used within a CitiesProvider");
    }
    return context;
}

export { useCities };
