import { createTheme } from "@mui/material";

// Design tokens sourced from DESING.md ("Signal Green" design system).
// This is the single source of truth for color/typography/shape — components
// should read from `theme` (via `useTheme()` or the `sx` `"primary.main"`
// string shorthand) instead of hardcoding hex values.

const manrope = "'Manrope', sans-serif";
const inter = "'Inter', sans-serif";
const jetbrainsMono = "'JetBrains Mono', monospace";

// Shared with Layout.jsx so the fixed AppBar's height and its spacer always match.
export const APP_BAR_HEIGHT = { xs: 56, sm: 64 };

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#01964b",
      dark: "#01783c",
      light: "#63e6be",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#343a40",
      contrastText: "#ffffff",
    },
    tertiary: {
      main: "#63e6be",
      contrastText: "#01964b",
    },
    error: {
      main: "#ba1a1a",
      contrastText: "#ffffff",
      light: "#ffdad6",
      dark: "#93000a",
    },
    background: {
      default: "#f8f9fa",
      paper: "#ffffff",
    },
    text: {
      primary: "#191c1d",
      secondary: "#5f656c",
    },
    divider: "#dee2e6",
  },
  shape: {
    borderRadius: 8,
    borderRadiusSm: 4,
    borderRadiusMd: 12,
    borderRadiusLg: 16,
    borderRadiusXl: 24,
    borderRadiusFull: 9999,
  },
  spacing: 8,
  typography: {
    fontFamily: inter,
    h1: { fontFamily: manrope, fontSize: "40px", fontWeight: 800, lineHeight: "48px", letterSpacing: "-0.02em" },
    h2: { fontFamily: manrope, fontSize: "32px", fontWeight: 700, lineHeight: "40px", letterSpacing: "-0.01em" },
    h3: { fontFamily: manrope, fontSize: "24px", fontWeight: 600, lineHeight: "32px" },
    h4: { fontFamily: manrope, fontSize: "20px", fontWeight: 600, lineHeight: "28px" },
    h5: { fontFamily: manrope, fontSize: "18px", fontWeight: 700, lineHeight: "26px" },
    h6: { fontFamily: manrope, fontSize: "16px", fontWeight: 700, lineHeight: "24px" },
    subtitle1: { fontFamily: inter, fontSize: "18px", fontWeight: 400, lineHeight: "28px" },
    body1: { fontFamily: inter, fontSize: "16px", fontWeight: 400, lineHeight: "24px" },
    body2: { fontFamily: inter, fontSize: "14px", fontWeight: 400, lineHeight: "20px" },
    button: { fontFamily: inter, fontSize: "14px", fontWeight: 600, textTransform: "none", letterSpacing: 0 },
    overline: {
      fontFamily: jetbrainsMono,
      fontSize: "14px",
      fontWeight: 500,
      lineHeight: "16px",
      letterSpacing: "0.05em",
      textTransform: "none",
    },
    caption: {
      fontFamily: jetbrainsMono,
      fontSize: "12px",
      fontWeight: 500,
      lineHeight: "14px",
      letterSpacing: "0.05em",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 9999,
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
