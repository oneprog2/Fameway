import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";

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

const Dashboard1 = () => {
  const [currentUser] = useAtom(userAtom);

  return (
    <PageContainer
      title="Fameway - Gestion de boutique"
      description="Main informations"
    >
      <Breadcrumb
        title={`Voilà ce qu’il s’est passé depuis votre dernière connexion`}
        subtitle={`Bonjour, `}
        username={currentUser?.username}
      ></Breadcrumb>
    </PageContainer>
  );
};

export default Dashboard1;
