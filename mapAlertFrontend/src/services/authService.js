import api from "../interceptor/api";

const API = "/api/auth";

export const loginService = async (data) => {
    const response = await api.post(`${API}/login`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
};

export const registerService = async (data) => {
    const response = await api.post(`${API}/register`, data);
    localStorage.setItem("token", response.data.token);
    return response.data;
};

// Validates the stored token against the backend.
// Throws on 401/network error so the caller can treat it as invalid.
export const validateTokenService = async () => {
    if (!localStorage.getItem("token")) return null;
    const response = await api.get(`${API}/me`);
    return response.data;
};
