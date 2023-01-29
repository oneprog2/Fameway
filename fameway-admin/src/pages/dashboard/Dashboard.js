import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";
import FeatherIcon from "feather-icons-react";

import {
  WeeklyStats,
  ProductsTable,
  MedicalproBranding,
  InformationsCard,
  BlogCard,
} from "../dashboard2-components";
import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import DashboardButton from "../dashboard2-components/DashboardButton";
import OnboardingCard from "../dashboard2-components/OnboardingCard";
import OnboardingVideoCard from "../dashboard2-components/OnboardingVideoCard";

const Dashboard1 = () => {
  const [currentUser] = useAtom(userAtom);

  return (
    <PageContainer
      title="Fameway - Gestion de boutique"
      description="Main informations"
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          pl: 1,
          alignItems: "center",
        }}
      >
        <Breadcrumb
          title={`Bienvenue sur l’espace administratif de votre compte.`}
          subtitle={`Bonjour, `}
          username={currentUser?.username}
        ></Breadcrumb>

        <Button
          // onClick={handleStoreUpdate}
          color="primary"
          variant="contained"
          sx={{
            height: "40px",
            width: "300px",
            fontWeight: "700",
            borderRadius: "100px",
          }}
        >
          <FeatherIcon icon="plus" width="20" />
          <Typography
            variant="button"
            color="white"
            fontWeight={600}
            sx={{
              marginLeft: 1,
            }}
          >
            Créer un nouvel article
          </Typography>
        </Button>
      </Box>

      <Grid container spacing={0}>
        <Grid item xs={12} lg={6}>
          <OnboardingCard />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            flex: 1,
            height: "100%",
          }}
        >
          <OnboardingVideoCard />
        </Grid>

        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <InformationsCard
            alignTitle="center"
            borderColor={"#B8F1BE"}
            title={"Questions"}
            buttonTitle={"Lire plus"}
            description={
              "Tu as une question ? Alors consulte notre FAQ dans l’onglet “aide” ou envoie nous un message."
            }
          />
          <InformationsCard
            alignTitle="center"
            borderColor={"#FFE3EA"}
            title={"Conseils 🎈"}
            description={
              "Pour commencer à prendre en main ta boutique, n’hésite pas à mettre en vente des produits virtuels."
            }
            buttonTitle={"Lire plus"}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={6}
          sx={{
            mt: -20,

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <DashboardButton
              onPress={() => console.log("plk")}
              icon={"🧑🏽‍🦱"}
              bgColor="#FFD028"
              textColor="#222222"
              title={"Configure ton compte et tes préférences"}
            />
            <DashboardButton
              onPress={() => console.log("pok")}
              bgColor="#222222"
              textColor="white"
              icon={"✌🏽"}
              title={"Lance ta 1ère campagne marketing"}
            />
          </Box>
          <Box>
            <InformationsCard
              centerAll
              alignTitle="left"
              borderColor="#FFDFD5"
              title={"Bravo ! 👏🏾"}
              description={
                "En créant ton compte tu rejoins les 241 autres créateurs que compte Fameway."
              }
            />
          </Box>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default Dashboard1;
