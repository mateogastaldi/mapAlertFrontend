// Extracts a user-facing message from an axios error, falling back when the
// backend didn't send one of the shapes we recognize.
export function getErrorMessage(err, fallback) {
  const data = err?.response?.data;
  const serverMsg = data?.message || data?.reason || data?.detail || (typeof data === "string" ? data : null);
  return serverMsg || fallback;
}
