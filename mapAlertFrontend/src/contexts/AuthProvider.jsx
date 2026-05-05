// contexts/AuthProvider.jsx  → solo el provider
import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { loginService, registerService, validateTokenService } from "../services/authService";

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // true only while we wait for the backend to confirm the stored token
    const [isLoading, setIsLoading] = useState(!!localStorage.getItem("token"));

    useEffect(() => {
        if (!localStorage.getItem("token")) return;

        const validate = async () => {
            try {
                const data = await validateTokenService();
                setUser(data?.user ?? null);
                setIsLoggedIn(true);
            } catch {
                // 401 or network error: token is stale/invalid
                localStorage.removeItem("token");
                setIsLoggedIn(false);
                setUser(null);
            } finally {
                setIsLoading(false);
            }
        };

        validate();
    }, []);

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
        <AuthContext.Provider value={{ user, isLoggedIn, isLoading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
}