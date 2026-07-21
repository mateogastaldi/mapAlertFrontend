// The admin users endpoint responds with Spanish field names (usuario, nombres,
// apellidos, rol, activo) while the rest of the app (auth/profile) works with the
// English/camelCase shape (username, firstName, lastName, role, active). This
// adapter normalizes the response so AdminDashboard can use the same shape as
// everywhere else — it does not change the request itself.
export const adaptUsuario = (raw) => ({
  id: raw.id,
  username: raw.usuario || raw.username,
  firstName: raw.nombres || raw.firstName,
  lastName: raw.apellidos || raw.lastName,
  email: raw.email,
  role: raw.rol || raw.role,
  active: raw.activo || raw.active,
});
