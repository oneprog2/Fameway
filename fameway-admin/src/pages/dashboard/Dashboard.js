import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";

import InformationsCard from "../../components/cards/InformationsCard";
import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import DashboardButton from "../../components/buttons/DashboardButton";
import OnboardingCard from "../../components/cards/OnboardingCard";
import OnboardingVideoCard from "../../components/cards/OnboardingVideoCard";

const Dashboard1 = () => {
  const [currentUser] = useAtom(userAtom);

  const steps = ["🔎 Identité", "🔥 Articles", "🚀 Publication"];

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
          px: 2,
          alignItems: "center",
        }}
      >
        <Breadcrumb
          title={`Bienvenue sur l’espace administratif de votre compte.`}
          subtitle={`Bonjour `}
          username={currentUser?.username}
        ></Breadcrumb>
      </Box>

      <Grid lg={12} container>
        <Grid item xs={12} lg={6}>
          <OnboardingCard steps={steps} />
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
          lg={3}
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
        </Grid>

        <Grid
          item
          xs={12}
          lg={3}
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
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
            mt: {
              lg: -20,
            },

            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: {
                xs: "column",
                lg: "row",
              },
            }}
          >
            <DashboardButton
              onClick={() => window.location.replace("/store/settings")}
              icon={"🚀"}
              bgColor="#FFD028"
              textColor="#222222"
              title={"Personnalise ta boutique avant de la publier"}
            />

            <DashboardButton
              onClick={() => window.location.replace("/store/articles/add")}
              bgColor="#222222"
              textColor="white"
              icon={"🌟"}
              title={"Propose à tes fans ton premier article virtuel"}
            />
          </Box>

          <Box>
            <InformationsCard
              withoutButton
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
