import React from "react";
import { Grid, Box, Card, CardContent, Typography, Link } from "@mui/material";
import profilecover from "../../assets/images/users/user.png";
import imageIcon from "../../assets/images/logos/Icons.png";
import FeatherIcon from "feather-icons-react";

const EditButton = ({ onClick, size }) => (
  <Link
    onClick={onClick}
    sx={{
      cursor: "pointer",
      backgroundColor: "#ffce00",
      height: size === "small" ? 20 : 25,
      width: size === "small" ? 20 : 25,
      borderRadius: "6px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}
  >
    <FeatherIcon size={size === "small" ? 12 : 18} icon={"edit-2"} />
  </Link>
);

const CoverCard = ({ username, description }) => (
  <div
    sx={{
      padding: "0",
      marginTop: 5,
    }}
  >
    <Card
      sx={{
        height: "200px",
        backgroundColor: "#D5D1FF",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      <Box
        sx={{
          height: "100%",
          display: "flex",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
          backgroundPosition: "center",
          backgroundSize: "100px",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${imageIcon})`,
        }}
      ></Box>

      <Box
        style={{
          position: "absolute",
          bottom: 15,
          right: 20,
          alignItems: "center",
          justifyContent: "center",
          alignSelf: "center",
        }}
      >
        <EditButton></EditButton>
      </Box>
    </Card>

    <CardContent
      sx={{
        pt: "24px",
        pb: "28px",
      }}
    >
      <Grid container spacing={0}>
        {/* about profile */}

        <Grid
          item
          lg={4}
          sm={12}
          xs={12}
          sx={{
            zIndex: 2000,
            order: {
              xs: "1",
              sm: "1",
              lg: "2",
            },
          }}
        >
          <Box
            display="flex"
            alignItems="flex-start"
            justifyContent="flex-start"
            sx={{
              mt: "-90px",
              ml: "20px",
            }}
          >
            <Box>
              <Box
                sx={{
                  borderRadius: "100%",
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  backgroundImage: `url(${profilecover})`,
                  width: "162px",
                  height: "162px",
                  backgroundColor: "#fff",
                  border: "3px solid #fff",
                  position: "relative",
                }}
              >
                <Box
                  style={{
                    position: "absolute",
                    bottom: 10,
                    right: 10,
                    alignItems: "center",
                    justifyContent: "center",
                    alignSelf: "center",
                  }}
                >
                  <EditButton></EditButton>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                mt: "70px",
                ml: "20px",
                display: "block",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontWeight="800"
                  sx={{
                    textAlign: "start",
                    fontWeight: "900",
                    fontSize: 30,
                  }}
                >
                  {username}
                </Typography>
                <Box
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  <EditButton size={"small"}></EditButton>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Typography
                  fontWeight="300"
                  variant="subtitle2"
                  sx={{
                    textAlign: "start",
                  }}
                >
                  {description}
                </Typography>
                <Box
                  sx={{
                    marginLeft: "10px",
                  }}
                >
                  <EditButton size={"small"}></EditButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </div>
);

export default CoverCard;
