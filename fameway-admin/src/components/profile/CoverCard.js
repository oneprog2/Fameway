import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import profilecover from "../../assets/images/backgrounds/profilebg.jpg";
import userimg from "../../assets/images/users/user2.jpg";

const CoverCard = ({ username, description }) => (
  <Card
    sx={{
      padding: "0",
      marginTop: 5,
    }}
  >
    <img
      srcSet={`${profilecover} 1x, ${profilecover} 2x`}
      alt={profilecover}
      width="100%"
    />

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
            }}
          >
            <Box>
              <Box
                sx={{
                  backgroundColor: "#C2F0FF",
                  borderRadius: "50%",
                  width: "162px",
                  height: "162px",
                  border: (theme) =>
                    `${
                      theme.palette.mode === "dark"
                        ? "4px solid #3c414c"
                        : "4px solid #fff"
                    }`,
                }}
              />
            </Box>
            <Box
              sx={{
                mt: "70px",
                ml: "20px",
                display: "block",
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
              <Typography
                color="textSecondary"
                variant="h6"
                fontWeight="400"
                sx={{
                  textAlign: "center",
                }}
              >
                {description}
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </CardContent>
  </Card>
);

export default CoverCard;
