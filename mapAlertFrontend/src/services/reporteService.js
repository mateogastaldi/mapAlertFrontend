import api from "../interceptor/api";
import { toBackendDateTime } from "../utilities/formatDate";

const API = "/api/v1/reportes";

export const getReportsByBounds = async (bounds) => {
  const params = new URLSearchParams({
    southLat: bounds.getSouth(),
    northLat: bounds.getNorth(),
    westLng: bounds.getWest(),
    eastLng: bounds.getEast(),
  });

  const res = await api.get(`${API}/bounds`, { params });
  return res.data;
};

export const reportRegister = async (params) => {
    const res = await api.post(`${API}/crear`, params);
    return res.data;
};

export const rateReport = async (id, rating) => {
    const res = await api.post(`${API}/${id}/calificar`, { puntaje: rating, reporteId: id });
    return res.data;
};

export const verifyReport = async (id) => {
    const res = await api.post(`${API}/${id}/verificar`, {});
    return res.data;
};

export const dismissReport = async (id) => {
    const res = await api.post(`${API}/${id}/desestimar`, {});
    return res.data;
};

export const editReport = async (id, params) => {
    const res = await api.put(`${API}/${id}`, params);
    return res.data;
};

export const deleteReport = async (id) => {
    const res = await api.delete(`${API}/${id}`);
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
        const fecha = toBackendDateTime(filters.desdeFecha);
        if (fecha) params.append("desdeFecha", fecha);
    }

    if (filters.categorias !== null && filters.categorias?.length > 0) {
        filters.categorias.forEach((c) => params.append("categorias", c));
    }

    const res = await api.get(`${API}/filters`, { params });
    return res.data;
};
