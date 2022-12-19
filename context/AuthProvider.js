import React, { createContext } from "react";
import useAuthentication from "../hooks/useAuthentication";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
    const allAuthContext = useAuthentication();
    return (
        <AuthContext.Provider value={allAuthContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
