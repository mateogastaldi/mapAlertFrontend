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