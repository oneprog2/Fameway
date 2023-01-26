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
import { useQuery } from "@apollo/client";
import { CURRENT_USER } from "./api/queries";
import { userAtom } from "./atoms/Atoms";
import { useAtom } from "jotai";

const App = () => {
  const routing = useRoutes(Router);
  const theme = ThemeSettings();
  const customizer = useSelector((state) => state.CustomizerReducer);
  const { isLoading, loginWithRedirect, isAuthenticated } = useAuth0();
  const [notReady, setNotReady] = useState(true);

  const { user } = useAuth0();
  const { data, error } = useQuery(CURRENT_USER, {
    variables: { email: user?.email },
  });
  const [currentUser, setCurrentUser] = useAtom(userAtom);

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      loginWithRedirect();
    } else if (
      isAuthenticated &&
      !isLoading &&
      data?.user &&
      currentUser === null
    ) {
      const userData = data?.user[0];

      setCurrentUser({
        username: userData.username,
        firstname: userData.firstname,
        lastname: userData.lastname,
        firstOpening: userData.firstOpening,
        storeID: userData.stores?.[0].id,
      });
    } else {
      if (
        currentUser?.firstOpening &&
        window.location.pathname !== "/setup/store"
      ) {
        window.location.href = "/setup/store";
      } else setNotReady(false);
    }
  }, [
    setCurrentUser,
    data?.user,
    isAuthenticated,
    isLoading,
    loginWithRedirect,
    currentUser,
    data,
  ]);

  useEffect(() => {}, [currentUser]);

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
