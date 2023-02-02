import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import Breadcrumb from "../../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../../components/container/PageContainer";
import CoverCard from "../../../components/profile/CoverCard";
import { userAtom } from "../../../atoms/Atoms";
import { useAtom } from "jotai";
import { useMutation, useQuery } from "@apollo/client";
import { STORE_DATA } from "../../../api/queries";
import { handleUpload } from "../../../components/aws/UploadToS3";
import { UPDATE_STORE } from "../../../api/mutations";
import Spinner from "../../spinner/Spinner";
import { CategoryButton } from "../../../components/buttons/CategoryButton";
import { BigButton } from "../../../components/buttons/BigButton";

const ArticleList = () => {
  const [currentUser] = useAtom(userAtom);
  const [storeName, setStoreName] = React.useState(`@${currentUser?.username}`);
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [category, setCategory] = useState("Personnalisation");

  const [storeDescription, setStoreDescription] = React.useState("");
  const [mutationLoading, setMutationLoading] = React.useState(false);

  useEffect(() => {
    if (currentUser?.username) {
      setStoreName(`@${currentUser?.username}`);
    }
  }, [currentUser]);

  const { data, error, loading } = useQuery(STORE_DATA, {
    variables: { storeID: currentUser?.storeID },
  });

  const [updateStore, { storeError }] = useMutation(UPDATE_STORE);

  if (loading) return <div>Chargement ...</div>;

  const handleStoreUpdate = async () => {
    setMutationLoading(true);
    let profileUrl;
    let bannerUrl;

    if (profileFile)
      await handleUpload(profileFile, currentUser?.username)
        .then((res) => {
          profileUrl = res?.location;
        })
        .catch((err) => {
          console.log(err);
        });
    if (bannerFile)
      await handleUpload(bannerFile, currentUser?.username)
        .then((res) => {
          bannerUrl = res?.location;
        })
        .catch((err) => {
          console.log(err);
        });

    await updateStore({
      variables: {
        storeID: currentUser?.storeID,
        status: "draft",
        name: storeName,
        bannerPicture: bannerUrl,
        profilePicture: profileUrl,
        description: storeDescription,
      },
    }).then(() => {
      window.location.href = "/home";
    });

    setMutationLoading(false);
  };

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
                title: "Boutique",
              },
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
            icon={"🎨"}
            title={"Ajouter un nouvel article à ma boutique"}
          />
          <BigButton icon={"👕"} title={"Créer une nouvelle collection"} />
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default ArticleList;
