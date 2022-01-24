import { createTheme } from "@mui/material/styles";

/* Primary */
const primaryLight = "#42a5f5";
const primaryMain = "#1976d2";
const primaryDark = "#1565c0";

/* Secondary */
const secondaryLight = "#ba68c8";
const secondaryMain = "#9c27b0";
const secondaryDark = "#7b1fa2";

/* Error */
const errorLight = "#ef5350";
const errorMain = "#d32f2f";
const errorDark = "#c62828";

/* Warning */
const warningLight = "#ff9800";
const warningMain = "#ed6c02";
const warningDark = "#e65100";

/* Info */
const infoLight = "#03a9f4";
const infoMain = "#0288d1";
const infoDark = "#01579b";

/* Success */
const successLight = "#4caf50";
const successMain = "#2e7d32";
const successDark = "#1b5e20";

/* Compass */
const compassBack = "#1976d2";
const compassTick = "#e0e0e0";
const compassDial = "#1565c0";

/* General */
//const background = "#ffffff";

const theme = createTheme({
  palette: {
    primary: {
      light: primaryLight,
      main: primaryMain,
      dark: primaryDark,
    },
    secondary: {
      light: secondaryLight,
      main: secondaryMain,
      dark: secondaryDark,
    },
    error: {
      light: errorLight,
      main: errorMain,
      dark: errorDark,
    },
    warning: {
      light: warningLight,
      main: warningMain,
      dark: warningDark,
    },
    info: {
      light: infoLight,
      main: infoMain,
      dark: infoDark,
    },
    success: {
      light: successLight,
      main: successMain,
      dark: successDark,
    },
    compass: {
      back: compassBack,
      tick: compassTick,
      dial: compassDial,
    },
  },
});

export default theme;
