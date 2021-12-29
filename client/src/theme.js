import { createTheme } from "@mui/material/styles";

function getCSS(varStr) {
  return getComputedStyle(document.documentElement, null)
    .getPropertyValue(varStr)
    .trim();
}

const theme = createTheme({
  palette: {
    primary: {
      light: getCSS("--primaryLight"),
      main: getCSS("--primaryMain"),
      dark: getCSS("--primaryDark"),
    },
    secondary: {
      light: getCSS("--secondaryLight"),
      main: getCSS("--secondaryMain"),
      dark: getCSS("--secondaryDark"),
    },
    error: {
      light: getCSS("--errorLight"),
      main: getCSS("--errorMain"),
      dark: getCSS("--errorDark"),
    },
    warning: {
      light: getCSS("--warningLight"),
      main: getCSS("--warningMain"),
      dark: getCSS("--warningDark"),
    },
    info: {
      light: getCSS("--infoLight"),
      main: getCSS("--infoMain"),
      dark: getCSS("--infoDark"),
    },
    success: {
      light: getCSS("--successLight"),
      main: getCSS("--successMain"),
      dark: getCSS("--successDark"),
    },
  },
});

export default theme;
