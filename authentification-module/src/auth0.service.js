import auth0 from "auth0-js";
import {
  AUTH0_CLIENT_ID,
  AUTH0_DOMAIN,
  AUTH0_LOGIN_REDIRECT_URI,
  LOGIN_RESPONSE_TYPE,
  AUTH0_USER_SCOPE,
} from "./config";

export const auth = new auth0.WebAuth({
  overrides: {
    __tenant: "dev-lzkir111o3ip75a0",
    __token_issuer: "auth.fameway.co",
  },
  scope: AUTH0_USER_SCOPE,
  domain: AUTH0_DOMAIN,
  clientID: AUTH0_CLIENT_ID,
  redirectUri: AUTH0_LOGIN_REDIRECT_URI,
  responseType: LOGIN_RESPONSE_TYPE,
});
