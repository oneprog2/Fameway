import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import PageContainer from "../../components/container/PageContainer";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";

const UserProfile = () => {
  return (
    <PageContainer
      title="Coming sooooooon !"
      sx={{
        display: "flex",
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        lg={12}
        sx={{
          mt: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: 50,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Coming sooooooon ! 🚀
          </Typography>
          <Typography
            sx={{
              mb: 1,
            }}
          >
            Cette fonctionnalité n’est malheureusement pas encore disponible !
          </Typography>
          <Typography>
            Nos supers développeurs travaillent dur pour vous la rendre
            disponible au plus vite. 🦸
          </Typography>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
