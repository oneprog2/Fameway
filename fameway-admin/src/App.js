import React, { useState } from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { useSelector } from "react-redux";
import RTL from "./layouts/full-layout/customizer/RTL";
import ThemeSettings from "./layouts/full-layout/customizer/ThemeSettings";
import Router from "./routes/Router";
import "react-perfect-scrollbar/dist/css/styles.css";
import { useAuth0 } from "@auth0/auth0-react";
import { useEffect } from "react";

const App = () => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);
  const { isLoading, loginWithRedirect, isAuthenticated } = useAuth0();
  const [notReady, setNotReady] = useState(true);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    } else if (isAuthenticated && !isLoading) {
      setNotReady(false);
    }
  }, [isAuthenticated, isLoading, loginWithRedirect]);

  if (notReady) return <div>Chargement ...</div>;

  return (
    <ThemeProvider theme={theme}>
      <RTL direction={customizer.activeDir}>
        <CssBaseline />
        {routing}
      </RTL>
    </ThemeProvider>
  );
};

export default App;
