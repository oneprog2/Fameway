import React, { useEffect } from "react";
import {
  Grid,
  Button,
  Box,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { useAuth0 } from "@auth0/auth0-react";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { STORES } from "../../api/queries";
import { useQuery } from "@apollo/client";

const Dashboard1 = () => {
  const { user } = useAuth0();
  const { data, error } = useQuery(STORES);
  console.log(error);
  console.log(data);

  return (
    <PageContainer
      title="Fameway - Gestion de boutique"
      description="Main informations"
    >
      <Breadcrumb
        title={`Hello ${user?.username}`}
        subtitle={`C'est le come back !`}
      ></Breadcrumb>
    </PageContainer>
  );
};

export default Dashboard1;
