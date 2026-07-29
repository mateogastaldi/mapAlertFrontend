// Password policy shared by Register, ProfileSettings and AdminDashboard forms.
export function isValidPassword(password) {
  const hasUppercase = /[A-Z]/.test(password);
  const isMinLength = password.length >= 8;
  const isMaxLength = password.length <= 100;
  return hasUppercase && isMinLength && isMaxLength;
}

const NAME_PATTERN = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?:[ ][A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
const USERNAME_PATTERN = /^[a-zA-Z0-9_.]+$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Validation + "field characteristics" tooltip copy for the Register form.
// Kept in one place so the input's helper popup and its actual check never drift apart.
export const REGISTER_FIELD_RULES = {
  firstName: {
    maxLength: 50,
    info: "Solo letras y espacios, hasta 50 caracteres.",
    validate: (value) => {
      if (!value.trim()) return "El nombre es obligatorio.";
      if (!NAME_PATTERN.test(value)) return "El nombre solo puede contener letras y espacios.";
      return "";
    },
  },
  lastName: {
    maxLength: 50,
    info: "Solo letras y espacios, hasta 50 caracteres.",
    validate: (value) => {
      if (!value.trim()) return "El apellido es obligatorio.";
      if (!NAME_PATTERN.test(value)) return "El apellido solo puede contener letras y espacios.";
      return "";
    },
  },
  username: {
    maxLength: 20,
    info: "Entre 4 y 20 caracteres: letras, números, puntos y guiones bajos, sin espacios.",
    validate: (value) => {
      if (!value.trim()) return "El usuario es obligatorio.";
      if (value.length < 4) return "El usuario debe tener al menos 4 caracteres.";
      if (!USERNAME_PATTERN.test(value)) return "El usuario solo puede contener letras, números, puntos y guiones bajos.";
      return "";
    },
  },
  email: {
    maxLength: 254,
    info: "Formato de email válido, por ejemplo nombre@dominio.com.",
    validate: (value) => {
      if (!value.trim()) return "El email es obligatorio.";
      if (!EMAIL_PATTERN.test(value)) return "Ingresá un email con un formato válido.";
      return "";
    },
  },
  password: {
    maxLength: 100,
    info: "Entre 8 y 100 caracteres, con al menos una letra mayúscula.",
    validate: (value) => {
      if (!value) return "La contraseña es obligatoria.";
      if (value.length < 8) return "La contraseña debe tener al menos 8 caracteres.";
      if (!/[A-Z]/.test(value)) return "La contraseña debe contener al menos una letra mayúscula.";
      return "";
    },
  },
};
