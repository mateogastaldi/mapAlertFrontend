import axios from "axios";

const API = "http://localhost:8080/api/v1/reportes";

export const getReportsByBounds = async (bounds) => {
  const params = new URLSearchParams({
    southLat: bounds.getSouth(),
    northLat: bounds.getNorth(),
    westLng: bounds.getWest(),
    eastLng: bounds.getEast(),
  });

  const res = await axios.get(`${API}/bounds`, { params });
  return res.data;
};

const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

export const reportRegister = async (params) => {
    console.log(params);
    const res = await axios.post(`${API}/crear`, params, getAuthHeader());
    return res.data;
};

export const rateReport = async (id, rating) => {
    const res = await axios.post(`${API}/${id}/calificar`, { puntaje: rating, reporteId: id }, getAuthHeader());
    return res.data;
};

export const verifyReport = async (id) => {
    const res = await axios.post(`${API}/${id}/verificar`, {}, getAuthHeader());
    return res.data;
};

export const dismissReport = async (id) => {
    const res = await axios.post(`${API}/${id}/desestimar`, {}, getAuthHeader());
    return res.data;
};

export const editReport = async (id, params) => {
    const res = await axios.put(`${API}/${id}`, params, getAuthHeader());
    return res.data;
};

export const deleteReport = async (id) => {
    const res = await axios.delete(`${API}/${id}`, getAuthHeader());
    return res.data;
};

export const getReportsByBoundsAndFilters = async (bounds, filters) => {
    const params = new URLSearchParams({
        southLat: bounds.getSouth(),
        northLat: bounds.getNorth(),
        westLng: bounds.getWest(),
        eastLng: bounds.getEast(),
    });

    if (filters.soloMios !== null && filters.soloMios !== undefined) {
        params.append("soloMios", filters.soloMios);
    }

    if (filters.desdeFecha !== null && filters.desdeFecha !== undefined) {
        let dateVal;
        if (typeof filters.desdeFecha.toDate === "function") {
            dateVal = filters.desdeFecha.toDate();
        } else {
            dateVal = new Date(filters.desdeFecha);
        }
        if (!isNaN(dateVal.getTime())) {
            const fecha = dateVal.toISOString().slice(0, 19);
            params.append("desdeFecha", fecha);
        }
    }

    if (filters.categorias !== null && filters.categorias?.length > 0) {
        filters.categorias.forEach((c) => params.append("categorias", c));
    }

    const res = await axios.get(`${API}/filters`, {
        params,
        ...getAuthHeader(),
    });
    return res.data;
};