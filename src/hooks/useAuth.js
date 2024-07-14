import { useContext } from "react";
import { AuthContext } from "../contexts/MockAuthContext"; // Adjust the import path as necessary

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { useAuth };
