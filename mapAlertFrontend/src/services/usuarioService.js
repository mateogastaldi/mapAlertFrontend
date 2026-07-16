import axios from "axios";

const PROFILE_API = "http://localhost:8080/api/user/profile";
const ADMIN_API = "http://localhost:8080/api/admin/usuarios";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { headers: { Authorization: `Bearer ${token}` } } : {};
};

// ── Profile Methods ──
export const updateProfile = async (params) => {
  const res = await axios.put(PROFILE_API, params, getAuthHeader());
  return res.data;
};

export const deleteAccount = async () => {
  const res = await axios.delete(PROFILE_API, getAuthHeader());
  return res.data;
};

// ── Admin Methods ──
export const adminListUsers = async () => {
  const res = await axios.get(ADMIN_API, getAuthHeader());
  return res.data;
};

export const adminCreateUser = async (params, rol) => {
  const res = await axios.post(`${ADMIN_API}?rol=${rol}`, params, getAuthHeader());
  return res.data;
};

export const adminUpdateUser = async (id, params, rol) => {
  const res = await axios.put(`${ADMIN_API}/${id}?rol=${rol}`, params, getAuthHeader());
  return res.data;
};

export const adminDeleteUser = async (id) => {
  const res = await axios.delete(`${ADMIN_API}/${id}`, getAuthHeader());
  return res.data;
};
