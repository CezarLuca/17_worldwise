import { createContext, useContext } from "react";

const AuthContext = createContext();

function AuthProvider({ children }) {
    return <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>;
}

function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export { AuthContext, AuthProvider };
