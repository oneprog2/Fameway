import { useEffect } from "react";
import { BuildTheme } from "./Theme-variable";

const ThemeSettings = () => {
  const theme = BuildTheme({
    direction: "ltr",
    theme: "dark",
  });

  return theme;
};
export default ThemeSettings;
