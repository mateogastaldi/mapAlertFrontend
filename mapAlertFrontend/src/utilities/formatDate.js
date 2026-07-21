// Converts a Date (or a dayjs-like object with .toDate()) into the
// "yyyy-MM-ddTHH:mm:ss" shape the backend expects for datetime query params.
export function toBackendDateTime(date) {
  const dateVal = typeof date?.toDate === "function" ? date.toDate() : new Date(date);

  if (isNaN(dateVal.getTime())) return null;

  return dateVal.toISOString().slice(0, 19);
}
