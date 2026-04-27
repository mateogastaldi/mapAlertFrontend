// contexts/AuthProvider.jsx  → solo el provider
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { loginService, registerService } from "../services/authService";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

    const login = async (data) => {
        const response = await loginService(data);
        console.log(response);
        setUser(response.user);
        setIsLoggedIn(true);
    };

    const register = async (data) => {
        const response = await registerService(data);
        setUser(response.user);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}