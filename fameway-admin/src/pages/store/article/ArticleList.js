import React, { useEffect } from "react";
import { Box, Grid } from "@mui/material";
import Breadcrumb from "../../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../../components/container/PageContainer";
import { userAtom } from "../../../atoms/Atoms";
import { useAtom } from "jotai";
import { useQuery } from "@apollo/client";
import { STORE_DATA } from "../../../api/queries";
import { BigButton } from "../../../components/buttons/BigButton";

const ArticleList = () => {
  const [currentUser] = useAtom(userAtom);

  const { data, error, loading } = useQuery(STORE_DATA, {
    variables: { storeID: currentUser?.storeID },
  });

  if (loading) return <div>Chargement ...</div>;

  return (
    <PageContainer title="User Profile" description="this is User Profile page">
      <Box
        sx={{
          px: 1,
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "column",
            lg: "row",
          },
          alignItems: {
            xs: "start",
            sm: "start",
            md: "start",
            lg: "center",
          },
          mb: {
            xs: "15px",
            sm: "15px",
            md: "15px",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
          }}
        >
          <Breadcrumb
            items={[
              {
                title: "Articles",
              },
            ]}
            title={`Gère les articles présents sur ta boutique.`}
          ></Breadcrumb>
        </Box>
      </Box>
      <Grid lg={12}>
        <Box
          sx={{
            flexDirection: "row",
            display: "flex",
            gap: 4,
          }}
        >
          <BigButton
            onClick={() => {
              window.location.href = "/store/articles/add";
            }}
            icon={"🎨"}
            title={"Ajouter un nouvel article à ma boutique"}
          />
          <BigButton
            disabled
            icon={"👕"}
            title={"Créer une nouvelle collection"}
          />
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default ArticleList;
