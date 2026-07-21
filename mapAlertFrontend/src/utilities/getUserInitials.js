// Initials shown on the app bar avatar when no name is set, falls back to the username.
export function getUserInitials(user) {
  if (!user) return "";
  const first = user.firstName ? user.firstName.charAt(0) : "";
  const last = user.lastName ? user.lastName.charAt(0) : "";
  return (first + last).toUpperCase() || user.username.charAt(0).toUpperCase();
}
