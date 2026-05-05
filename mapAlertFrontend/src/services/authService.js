import axios from "axios";

const API = "http://localhost:8080/api/auth";

export const loginService = async (data) => {
    const response = await axios.post(`${API}/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const registerService = async (data) => {
    const response = await axios.post(`${API}/register`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
};

// Validates the stored token against the backend.
// Throws on 401/network error so the caller can treat it as invalid.
export const validateTokenService = async () => {
    const token = localStorage.getItem("token");
    if (!token) return null;
    const response = await axios.get(`${API}/me`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};