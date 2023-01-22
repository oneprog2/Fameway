import React, { useEffect, useState } from "react";
import {
  Grid,
  Box,
  Typography,
  FormGroup,
  FormControlLabel,
  Button,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import CustomCheckbox from "./CustomCheckbox";

import CustomTextField from "./CustomTextField";

import { VisibilityOff, Visibility } from "@mui/icons-material";
import { auth } from "./auth0.service";
import {
  AUTH0_LOGIN_REDIRECT_URI,
  AUTH0_REALM,
  LOGIN_RESPONSE_TYPE,
} from "./config";

const Login = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);
  const [signup, setSignup] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [error, setError] = useState("");
  const [mailSent, setMailSent] = useState(false);

  const cantLogin = !email || !password;
  const cantSignup = !email || !password || !username;

  const manageError = (err) => {
    console.log(err.message);
    if (!signup)
      setError("La connexion a échoué : email ou mot de passe incorrect.");
    else setError(err.code);
  };

  const handleSubmitLogin = async (e) => {
    setLoading(true);
    const urlParams = new URLSearchParams(window.location.search);
    const stateParam = urlParams.get("state") || "";

    try {
      await auth.login(
        {
          email,
          password,
          realm: AUTH0_REALM,
          state: stateParam,
        },
        async (err, result) => {
          if (err) {
            await auth.login(
              {
                username: email,
                password,
                realm: AUTH0_REALM,
                state: stateParam,
              },
              (err, result) => {
                if (err) {
                  manageError(err);
                  setLoading(false);
                  return;
                }
                setLoading(false);
              }
            );
          }
          setLoading(false);
        }
      );
    } catch (error) {
      setError("Wrong username or password");
      return;
    }
  };

  const handleSubmitLoginGoogle = async (e) => {
    setLoadingGoogle(true);
    try {
      await auth.authorize({ connection: "google-oauth2" }, (err, result) => {
        if (err) {
          setError("Failed to connect with Google.");
          return;
        }
      });
    } catch (error) {
      setError("Failed to login with Google");
      return;
    }
  };

  const handleSubmitSignup = async (e) => {
    setLoading(true);
    try {
      await auth.signup(
        {
          connection: AUTH0_REALM,
          username,
          email,
          password,
        },
        async (err, result) => {
          if (err) {
            manageError(err);
            setLoading(false);
            return err;
          }
          await handleSubmitLogin();
        }
      );
    } catch (error) {
      setError("Failed to create an account");
    }
  };

  const handlePasswordChange = async (e) => {
    setLoading(true);
    try {
      await auth.changePassword(
        {
          connection: AUTH0_REALM,
          email,
        },
        async (err, result) => {
          if (err) {
            manageError(err);
            setLoading(false);
            return err;
          }
          setMailSent(true);
          setLoading(false);
        }
      );
    } catch (error) {
      setError("Failed to create an account");
    }
  };

  return (
    <Grid
      container
      sx={{
        height: "100vh",
        width: "100vw",
        justifyContent: "center",
        backgroundColor: {
          xs: "white",
          sm: "white",
          md: "#222222",
          lg: "#222222",
          xl: "#222222",
        },
      }}
    >
      <Grid
        item
        md={6}
        lg={7}
        display="flex"
        alignItems="center"
        sx={{
          paddingTop: { xs: 10, sm: 0, md: 0, lg: 0 },
          zIndex: 10,
          borderTopRightRadius: { lg: 55, xl: 55, md: 55 },
          borderBottomRightRadius: { lg: 55, xl: 55, md: 55 },
          backgroundColor: "white",
          flexDirection: {
            xs: "column",
            sm: "row",
            md: "row",
            lg: "row",
            xl: "row",
          },
        }}
      >
        <Box
          onClick={() => {
            window.location.href = "/";
          }}
          sx={{
            cursor: "pointer",
            top: {
              xs: 0,
              sm: 30,
              md: 30,
              lg: 30,
              xl: 30,
            },
            left: {
              xs: 0,
              sm: 30,
              md: 30,
              lg: 30,
              xl: 30,
            },
            position: {
              xs: "relative",
              sm: "absolute",
              md: "absolute",
              lg: "absolute",
              xl: "absolute",
            },
            marginBottom: { xs: 5 },
            height: {
              xs: "80px",
              sm: "50px",
              md: "50px",
              lg: "50px",
              xl: "50px",
            },
          }}
        >
          <img
            style={{
              height: "100%",
            }}
            src={
              "https://global-uploads.webflow.com/62f0c9ac63e2203fac4be612/62f0d831f9175953746e46b4_62dfe1b50e142ed34127e6c3_logo.svg"
            }
          ></img>
        </Box>

        <Grid container spacing={0} display="flex" justifyContent="center">
          <Grid item xs={12} lg={9} xl={6}>
            {forgetPassword ? (
              <Box
                sx={{
                  p: {
                    xs: 4,
                    sm: 10,
                    md: 4,
                    lg: 4,
                    xl: 0,
                  },
                }}
              >
                <Box>
                  <Box
                    sx={{
                      cursor: "pointer",
                      width: 40,
                    }}
                    onClick={() => {
                      setError("");
                      setMailSent(false);
                      setForgetPassword(false);
                    }}
                  >
                    <FeatherIcon
                      color="primary"
                      size={40}
                      icon={"arrow-left-circle"}
                    />
                  </Box>
                </Box>

                <Typography
                  fontWeight="700"
                  variant="h1"
                  style={{ marginBottom: 10, marginTop: 10 }}
                >
                  Un petit oubli ?
                </Typography>

                <Box display="flex" alignItems="center">
                  <Typography
                    color="textSecondary"
                    variant="h4"
                    fontWeight="500"
                    sx={{
                      mr: 1,
                    }}
                  >
                    Ça arrive même aux meilleurs d'entre nous.
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                  }}
                >
                  {/* <CustomFormLabel htmlFor="email">Ton mail</CustomFormLabel> */}

                  <CustomTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FeatherIcon size={20} icon={"mail"} />
                        </InputAdornment>
                      ),
                    }}
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 5,
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    placeholder={"Email"}
                    variant="outlined"
                    fullWidth
                  />

                  {mailSent ? (
                    <Box
                      display="flex"
                      alignItems="center"
                      style={{ marginTop: 5 }}
                    >
                      <Typography
                        color="textSecondary"
                        variant="h4"
                        fontWeight="500"
                        sx={{
                          textAlign: "center",
                          mt: 4,
                        }}
                      >
                        Le mail de réinitialisation de mot de passe a bien été
                        envoyé !
                      </Typography>
                    </Box>
                  ) : (
                    <Button
                      color="primary"
                      variant="contained"
                      size="large"
                      fullWidth
                      disabled={loading || (forgetPassword && !email)}
                      onClick={handlePasswordChange}
                      sx={{
                        mt: 5,
                        fontWeight: "700",
                        borderRadius: "100px",
                        pt: "10px",
                        pb: "10px",
                      }}
                    >
                      {loading ? (
                        <CircularProgress size={25} />
                      ) : (
                        "Envoyer un mail de réinitialisation"
                      )}
                    </Button>
                  )}
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  p: {
                    xs: 4,
                    sm: 10,
                    md: 4,
                    lg: 4,
                    xl: 0,
                  },
                }}
              >
                {signup ? (
                  <Box>
                    <Box
                      sx={{
                        cursor: "pointer",
                        width: 40,
                        marginBottom: 5,
                      }}
                      onClick={() => {
                        setSignup(false);
                      }}
                    >
                      <FeatherIcon
                        color="primary"
                        size={40}
                        icon={"arrow-left-circle"}
                      />
                    </Box>
                  </Box>
                ) : null}

                <Typography
                  fontWeight="700"
                  variant="h1"
                  style={{ marginBottom: 10 }}
                >
                  {!signup
                    ? "(Re) Bienvenue sur Fameway !"
                    : "Crée ta boutique d’influence gratuite en quelques clics."}
                </Typography>

                <Box display="flex" alignItems="center">
                  <Typography
                    color="textSecondary"
                    variant="h4"
                    fontWeight="500"
                    sx={{
                      mr: 1,
                    }}
                  >
                    {signup
                      ? "Vends ton contenu, boost tes revenus."
                      : "Connecte toi pour gérer ta boutique sécurisée."}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 4,
                  }}
                >
                  {/* <CustomFormLabel htmlFor="email">Ton mail</CustomFormLabel> */}
                  {signup ? (
                    <CustomTextField
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FeatherIcon size={20} icon="user" />
                          </InputAdornment>
                        ),
                      }}
                      style={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: 5,
                        marginBottom: 15,
                      }}
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      id="username"
                      placeholder="Nom de créateur"
                      variant="outlined"
                      fullWidth
                    />
                  ) : null}

                  <CustomTextField
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <FeatherIcon
                            size={20}
                            icon={signup ? "mail" : "user"}
                          />
                        </InputAdornment>
                      ),
                    }}
                    style={{
                      backgroundColor: "#f0f0f0",
                      borderRadius: 5,
                    }}
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    id="email"
                    placeholder={signup ? "Email" : "Email ou nom de créateur"}
                    variant="outlined"
                    fullWidth
                  />

                  <>
                    <CustomTextField
                      style={{
                        backgroundColor: "#f0f0f0",
                        borderRadius: 5,
                      }}
                      type={showPassword ? "text" : "password"}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <FeatherIcon size={20} icon="lock" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              disabled={loading}
                              aria-label="toggle password visibility"
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {!showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      id="password"
                      variant="outlined"
                      fullWidth
                      placeholder="Mot de passe"
                      sx={{
                        mt: 2,
                        mb: 3,
                      }}
                    />

                    {error ? (
                      <Box
                        sx={{
                          mb: 2,
                          textAlign: "center",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                        display="flex"
                        alignItems="center"
                      >
                        <Typography
                          align="center"
                          color="red"
                          textAlign={"center"}
                          variant="h6"
                          fontWeight="500"
                        >
                          {error}
                        </Typography>
                      </Box>
                    ) : null}

                    {!signup ? (
                      <Box
                        sx={{
                          display: {
                            xs: "block",
                            sm: "flex",
                            lg: "flex",
                          },
                          alignItems: "center",
                        }}
                      >
                        <FormGroup>
                          <FormControlLabel
                            control={<CustomCheckbox defaultChecked />}
                            label="Se souvenir de moi"
                            sx={{
                              mb: 2,
                            }}
                          />
                        </FormGroup>
                        <Box
                          onClick={() => {
                            setError("");
                            setForgetPassword(true);
                          }}
                          sx={{
                            ml: "auto",
                          }}
                        >
                          <Typography
                            fontWeight="500"
                            sx={{
                              fontSize: "14px",
                              display: "block",
                              textDecoration: "none",
                              mb: "16px",
                              color: "primary.main",
                              cursor: "pointer",
                            }}
                          >
                            Mot de passe oublié ?
                          </Typography>
                        </Box>
                      </Box>
                    ) : (
                      <Box
                        onClick={() => {
                          setError("");
                          setSignup(false);
                        }}
                      >
                        <Typography
                          fontWeight="500"
                          sx={{
                            textAlign: "right",
                            fontSize: "14px",
                            display: "block",
                            textDecoration: "none",
                            my: 1,
                            color: "primary.main",
                            cursor: "pointer",
                          }}
                        >
                          Tu as déjà une boutique ?
                        </Typography>
                      </Box>
                    )}
                  </>

                  <Button
                    color="primary"
                    variant="contained"
                    size="large"
                    fullWidth
                    disabled={
                      loading ||
                      (signup && cantSignup) ||
                      (!signup && cantLogin)
                    }
                    sx={{
                      mt: 3,
                      fontWeight: "700",
                      borderRadius: "100px",
                      pt: "10px",
                      pb: "10px",
                    }}
                    onClick={signup ? handleSubmitSignup : handleSubmitLogin}
                  >
                    {loading ? (
                      <CircularProgress size={25} />
                    ) : signup ? (
                      "Créer ma boutique"
                    ) : (
                      "Se connecter"
                    )}
                  </Button>

                  <Box>
                    {!signup ? (
                      <Button
                        variant="outlined"
                        size="large"
                        display="flex"
                        alignitems="center"
                        justifycontent="center"
                        onClick={handleSubmitLoginGoogle}
                        sx={{
                          borderRadius: "100px",
                          width: "100%",
                          borderColor: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? "#42464d"
                                : "#dde3e8"
                            }`,
                          borderWidth: "2px",
                          textAlign: "center",
                          mt: 2,
                          pt: "10px",
                          pb: "10px",
                          "&:hover": {
                            borderColor: (theme) =>
                              `${
                                theme.palette.mode === "dark"
                                  ? "#42464d"
                                  : "#dde3e8"
                              }`,
                            borderWidth: "2px",
                          },
                        }}
                      >
                        {loadingGoogle ? (
                          <CircularProgress size={25} />
                        ) : (
                          <Box display="flex" alignItems="center">
                            <img
                              style={{ width: 25, height: 25 }}
                              src={
                                "https://res.cloudinary.com/dgzpshsab/image/upload/v1673514918/google-logo-icon-png-transparent-background-osteopathy-16_xuuafj.png"
                              }
                            ></img>
                            <Typography
                              variant="h6"
                              sx={{
                                ml: 1,
                                color: (theme) =>
                                  `${
                                    theme.palette.mode === "dark"
                                      ? theme.palette.grey.A200
                                      : "#13152a"
                                  }`,
                              }}
                            >
                              Me connecter avec Gmail
                            </Typography>
                          </Box>
                        )}
                      </Button>
                    ) : null}
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      textAlign: "center",
                      mt: "30px",
                      mb: "20px",
                      "&::before": {
                        content: '""',
                        background: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#ecf0f2"
                          }`,
                        height: "1px",
                        width: "100%",
                        position: "absolute",
                        left: "0",
                        top: "11px",
                      },
                    }}
                  >
                    <Typography
                      component="span"
                      color="textSecondary"
                      variant="h6"
                      fontWeight="400"
                      sx={{
                        position: "relative",
                        padding: "0 12px",
                        background: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#282c34"
                              : "#ffffff"
                          }`,
                      }}
                    >
                      {signup ? "OU" : "PAS DE COMPTE ?"}
                    </Typography>
                  </Box>

                  {!signup ? (
                    <Box display="flex" alignItems="center">
                      <Typography
                        color="textPrimary"
                        variant="h4"
                        textAlign="center"
                        align="center"
                        position="center"
                        fontWeight="500"
                        sx={{
                          flex: 1,
                          mt: 2,
                          mr: 1,
                          mb: 2,
                        }}
                      >
                        Tu as une communauté de +10k fans ?
                      </Typography>
                    </Box>
                  ) : null}

                  {!signup ? (
                    <Box
                      style={{
                        marginTop: 17,
                      }}
                    >
                      <Button
                        onClick={() => {
                          setError("");
                          setSignup(true);
                        }}
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        sx={{
                          fontWeight: "700",
                          borderRadius: "100px",
                          pt: "10px",
                          pb: "10px",
                        }}
                      >
                        Créer ma boutique
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="outlined"
                      size="large"
                      display="flex"
                      alignitems="center"
                      onClick={handleSubmitLoginGoogle}
                      justifycontent="center"
                      sx={{
                        borderRadius: "100px",
                        width: "100%",
                        borderColor: (theme) =>
                          `${
                            theme.palette.mode === "dark"
                              ? "#42464d"
                              : "#dde3e8"
                          }`,
                        borderWidth: "2px",
                        textAlign: "center",
                        mt: 2,
                        pt: "10px",
                        pb: "10px",
                        "&:hover": {
                          borderColor: (theme) =>
                            `${
                              theme.palette.mode === "dark"
                                ? "#42464d"
                                : "#dde3e8"
                            }`,
                          borderWidth: "2px",
                        },
                      }}
                    >
                      {loadingGoogle ? (
                        <CircularProgress size={25} />
                      ) : (
                        <Box display="flex" alignItems="center">
                          <img
                            style={{ width: 25, height: 25 }}
                            src={
                              "https://res.cloudinary.com/dgzpshsab/image/upload/v1673514918/google-logo-icon-png-transparent-background-osteopathy-16_xuuafj.png"
                            }
                          ></img>
                          <Typography
                            variant="h6"
                            sx={{
                              ml: 1,
                              color: (theme) =>
                                `${
                                  theme.palette.mode === "dark"
                                    ? theme.palette.grey.A200
                                    : "#13152a"
                                }`,
                            }}
                          >
                            Créer ma boutique avec Gmail
                          </Typography>
                        </Box>
                      )}
                    </Button>
                  )}
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
      <Grid
        item
        md={6}
        lg={5}
        sx={{
          display: { xs: "none", sm: "none", md: "block" },
          background: (theme) =>
            `${theme.palette.mode === "dark" ? "#1c1f25" : "#222222"}`,
        }}
      >
        <Box
          sx={{
            marginLeft: -8,

            backgroundImage:
              "url(https://res.cloudinary.com/dgzpshsab/image/upload/v1673514005/Stars_kw03wm.svg)",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            height: "100vh",
          }}
        ></Box>
      </Grid>
    </Grid>
  );
};

export default Login;
