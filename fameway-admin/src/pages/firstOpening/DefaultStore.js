import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";

const DefaultStore = () => {
  const [currentUser] = useAtom(userAtom);
  console.log("ookok");
  return (
    <PageContainer
      title="Fameway - Gestion de boutique"
      description="Main informations"
    >
      <Breadcrumb
        title={`Hello ${currentUser?.username}`}
        subtitle={`C'est le come back !`}
      ></Breadcrumb>
    </PageContainer>
  );
};

export default DefaultStore;
