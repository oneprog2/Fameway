import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";
import FeatherIcon from "feather-icons-react";

import {
  EarningsShop,
  TopCards,
  ProductPerformance,
  WeeklyStats,
  RecentTransactions,
  Earnings,
  YearlySales,
  ProductsTable,
  MedicalproBranding,
  BlogCard,
} from "../dashboard2-components";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";

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
          alignItems: "flex-end",
        }}
      >
        <Breadcrumb
          title={`Voilà ce qu’il s’est passé depuis votre dernière connexion`}
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
    </PageContainer>
  );
};

export default Dashboard1;
