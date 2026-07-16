// contexts/AuthProvider.jsx  → solo el provider
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { loginService, registerService, validateTokenService } from "../services/authService";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // true only while we wait for the backend to confirm the stored token
    const [isLoading, setIsLoading] = useState(!!localStorage.getItem("token"));

    const validate = async () => {
        if (!localStorage.getItem("token")) {
            setIsLoading(false);
            return;
        }
        try {
            const data = await validateTokenService();
            setUser(data ?? null);
            setIsLoggedIn(true);
        } catch (err) {
            console.error("Token validation failed:", err);
            localStorage.removeItem("token");
            setIsLoggedIn(false);
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        validate();
    }, []);

    const login = async (data) => {
        await loginService(data); // Saves token
        const userData = await validateTokenService(); // Fetches user data
        setUser(userData ?? null);
        setIsLoggedIn(true);
    };

    const register = async (data) => {
        await registerService(data); // Saves token
        const userData = await validateTokenService(); // Fetches user data
        setUser(userData ?? null);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, register, logout, reloadUser: validate }}>
            {children}
        </AuthContext.Provider>
    );
}