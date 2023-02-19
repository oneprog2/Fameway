import AsyncStorage from "@react-native-async-storage/async-storage";
import { createContext, useContext, useEffect, useState } from "react";
import jwtDecode from "jwt-decode";

import EmailValidator from "email-validator";

import params from "../../auth0-params.json";
import { useAtom } from "jotai";
import { userAtom } from "../atoms/Atoms";
import { useQuery } from "@apollo/client";
import { USER_DATA } from "@api";

const AuthContext = createContext<any>({});

export function AuthProvider({ children }: any) {
  const [user, setUser] = useAtom(userAtom);

  useEffect(() => {
    syncAuth();
  }, []);

  const { data, loading, error } = useQuery(USER_DATA, {
    variables: {
      id: user?.sub,
    },
  });

  useEffect(() => {
    if (data) {
      setUser({
        ...user,
        cartID: data?.user_by_pk?.carts?.[0].id,
      });
    }
  }, [data]);

  const syncAuth = async () => {
    const idToken = await AsyncStorage.getItem("idToken");
    const accessToken = await AsyncStorage.getItem("accessToken");
    const expiresIn = await AsyncStorage.getItem("expiresIn");

    if (idToken && accessToken && expiresIn) {
      setUser(jwtDecode(idToken));
    }
  };

  const signout = async () => {
    await AsyncStorage.removeItem("idToken");
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("expiresIn");
    setUser({});
  };

  const signin = async ({ email, password }) => {
    if (!EmailValidator.validate(email)) {
      console.log("Illegal email");
      return {
        error: "Email invalide",
        type: "EMAIL_FAIL",
      };
    }

    if (!password) {
      return {
        error: "Mot de passe invalide",
        type: "PASSWORD_FAIL",
      };
    }

    const bodyParams = {
      client_id: params.clientId,
      grant_type: "http://auth0.com/oauth/grant-type/password-realm",
      username: email,
      password: password,
      realm: params.realm,
      audience: params.apiAudience,
      scope: params.scope,
    };

    await fetch(`https://${params.domain}/oauth/token`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    })
      .then((response) => response.json())
      .then(async (responseJson) => {
        if (responseJson.error) {
          console.log("fail to login");
          return;
        }
        const { id_token, access_token, expires_in } = responseJson;

        await AsyncStorage.setItem("idToken", id_token);
        await AsyncStorage.setItem("accessToken", access_token);
        await AsyncStorage.setItem("expiresIn", expires_in.toString());

        setUser(jwtDecode(id_token));

        return {
          type: "SIGNIN_SUCCESS",
          payload: {
            idToken: id_token,
            accessToken: access_token,
            expiresIn: expires_in,
          },
        };
      })
      .catch((err) => {
        console.error(err);
        console.log("fail to login");
        return;
      });
  };

  const isLogged = Boolean(user?.jwt);

  return (
    <AuthContext.Provider
      value={{
        jwt: user?.jwt,
        user,
        userId: user?.sub,
        isLogged,
        syncAuth,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
