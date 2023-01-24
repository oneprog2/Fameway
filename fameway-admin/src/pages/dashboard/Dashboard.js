import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";

import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { CURRENT_USER } from "../../api/queries";
import { useQuery } from "@apollo/client";
import { useGetUser, useSetUser } from "../../atoms/userAtom";

const Dashboard1 = () => {
  const { user } = useAuth0();
  const { data, error } = useQuery(CURRENT_USER, {
    variables: { email: user?.email },
  });
  const setUser = useSetUser();
  const currentUser = useGetUser();

  useEffect(() => {
    if (data?.user?.[0]?.username) {
      setUser({ username: data?.user?.[0].username });
    }
  }, [data, setUser]);

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

export default Dashboard1;
