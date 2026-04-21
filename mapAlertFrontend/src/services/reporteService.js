import axios from "axios";

const API = "http://localhost:8080/api/v1/reportes";

export const getReportsByBounds = async (bounds) => {
    const params = new URLSearchParams({
        southLat: bounds.getSouth(),
        northLat: bounds.getNorth(),
        westLng:  bounds.getWest(),
        eastLng:  bounds.getEast(),
    });

    const res = await axios.get(`${API}/bounds`, { params });
    return res.data;
};

export const reportRegister = async (params) => {
    const res = await axios.post(`${API}/crear`,params);
    return res.data;
}