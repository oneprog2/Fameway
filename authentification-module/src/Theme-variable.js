import _ from "lodash";
import { createTheme } from "@mui/material/styles";
import typography from "./Typography";
import components from "./Override";
import shadows from "./Shadows";

export const BLUE_THEME = 'BLUE_THEME';

const SidebarWidth = 265;
const TopbarHeight = 70;

const baseTheme = {
  direction: "ltr",
  palette: {
    primary: {
      main: "#1a97f5",
      light: "#e6f4ff",
      dark: "#1682d4",
    },
    secondary: {
      main: "#1e4db7",
      light: "#ddebff",
      dark: "#173f98",
    },

    success: {
      main: "#00c292",
      light: "#ebfaf2",
      dark: "#00964b",
      contrastText: "#ffffff",
    },
    danger: {
      main: "#e46a76",
      light: "#fdf3f5",
    },
    info: {
      main: "#0bb2fb",
      light: "#a7e3f4",
    },
    error: {
      main: "#e46a76",
      light: "#fdf3f5",
      dark: "#e45a68",
    },
    warning: {
      main: "#fec90f",
      light: "#fff4e5",
      dark: "#dcb014",
      contrastText: "#ffffff",
    },
    text: {
      secondary: "#777e89",
      danger: "#fc4b6c",
    },
    grey: {
      A100: "#ecf0f2",
      A200: "#99abb4",
      A400: "#767e89",
      A700: "#e6f4ff",
    },
    action: {
      disabledBackground: "rgba(73,82,88,0.12)",
      hoverOpacity: 0.02,
      hover: "rgba(0, 0, 0, 0.03)",
    },
  },

  shape: {
    borderRadius: 5,
  },
  mixins: {
    toolbar: {
      color: "#949db2",
      "@media(min-width:1280px)": {
        minHeight: TopbarHeight,
        padding: "0 30px",
      },
      "@media(max-width:1280px)": {
        minHeight: "64px",
      },
    },
  },
  status: {
    danger: "#e53e3e",
  },
  components,
  typography,
  shadows,
};

const themesOptions = [
  {
    name: BLUE_THEME,
    palette: {
      primary: {
        main: "#222222",
        light: "#222222",
        dark: "#444444",
      },
      secondary: {
        main: "#e6e6e6",
        light: "#e6e6e6",
        dark: "#e6e6e6",
      },
    },
  },
];

export const BuildTheme = (config = {}) => {
  let themeOptions = themesOptions.find((theme) => theme.name === config.theme);

  const baseMode = {
    palette: {
      mode: "light",
      background: {
        default: "#fafbfb",
        dark:  "#ffffff",
        paper:"#ffffff",
      },
      text: {
        primary:
           "rgba(0, 0, 0, 0.87)",
        secondary: "#777e89",
      },
    },
  };
  if (!themeOptions) {
    console.warn(new Error(`The theme ${config.theme} is not valid`));
    [themeOptions] = themesOptions;
  }

  const theme = createTheme(
    _.merge({}, baseTheme, baseMode, themeOptions, {
      direction: config.direction,
    })
  );
  return theme;
};

export { TopbarHeight, SidebarWidth, baseTheme };
