import api from "../interceptor/api";

const PROFILE_API = "/api/user/profile";
const ADMIN_API = "/api/admin/usuarios";

// ── Profile Methods ──
export const updateProfile = async (params) => {
  const res = await api.put(PROFILE_API, params);
  return res.data;
};

export const deleteAccount = async () => {
  const res = await api.delete(PROFILE_API);
  return res.data;
};

// ── Admin Methods ──
export const adminListUsers = async () => {
  const res = await api.get(ADMIN_API);
  return res.data;
};

export const adminCreateUser = async (params, rol) => {
  const res = await api.post(`${ADMIN_API}?rol=${rol}`, params);
  return res.data;
};

export const adminUpdateUser = async (id, params, rol) => {
  const res = await api.put(`${ADMIN_API}/${id}?rol=${rol}`, params);
  return res.data;
};

export const adminChangeRole = async (id, rol) => {
  const res = await api.put(`${ADMIN_API}/${id}/rol?rol=${rol}`, {});
  return res.data;
};

export const adminToggleStatus = async (id, activo) => {
  const params = activo !== undefined ? `?activo=${activo}` : "";
  const res = await api.put(`${ADMIN_API}/${id}/estado${params}`, {});
  return res.data;
};

export const adminDeleteUser = async (id) => {
  const res = await api.delete(`${ADMIN_API}/${id}`);
  return res.data;
};
