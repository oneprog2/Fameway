import React from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import profilecover from "../../assets/images/users/user.png";
import imageIcon from "../../assets/images/logos/Icons.png";

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
                variant="h5"
                fontWeight="400"
                sx={{
                  marginLeft: "1px",
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
  </div>
);

export default CoverCard;
