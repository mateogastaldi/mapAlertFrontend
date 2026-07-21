// Password policy shared by Register, ProfileSettings and AdminDashboard forms.
export function isValidPassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const isMinLength = password.length >= 8;
  return hasUppercase && isMinLength;
}
