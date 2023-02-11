import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";
import { useMutation, useQuery } from "@apollo/client";
import { DOMAIN_DATA, STORE_DATA } from "../../api/queries";
import { handleUpload } from "../../components/aws/UploadToS3";
import { UPDATE_STORE, UPDATE_USER } from "../../api/mutations";
import LoadingButton from "@mui/lab/LoadingButton";
import { StoreSettingsInputs } from "../../components/inputs/StoreSettingsInputs";

const UserProfile = () => {
  const [currentUser] = useAtom(userAtom);
  const [storeName, setStoreName] = React.useState(currentUser?.username);
  const [username, setUsername] = React.useState(currentUser?.username);
  const [domainSelected, setDomainSelected] = useState("Gaming");
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [storeDescription, setStoreDescription] = React.useState("");
  const [mutationLoading, setMutationLoading] = React.useState(false);
  const [skipLoading, setSkipLoading] = React.useState(false);

  useEffect(() => {
    if (currentUser?.username) {
      setStoreName(currentUser?.username);
    }
  }, [currentUser]);

  const { data, error, loading } = useQuery(STORE_DATA, {
    variables: { storeID: currentUser?.storeID },
  });

  const {
    data: domainData,
    error: domainError,
    loading: domainLoading,
  } = useQuery(DOMAIN_DATA, {
    fetchPolicy: "network-only",
  });

  const [updateStore, { storeError }] = useMutation(UPDATE_STORE);
  const [updateUser, { userError }] = useMutation(UPDATE_USER);

  const articles = data?.store_by_pk?.articles;
  const Shopitems = articles?.map((article) => {
    return {
      title: article.name,
      category: article.category,
      price: article.price,
      photo: article.articlePictures?.[0],
      id: article.id,
    };
  });

  if (loading || domainLoading) return <div>Chargement ...</div>;

  const handleSkip = async () => {
    setSkipLoading(true);

    await updateUser({
      variables: {
        userID: currentUser?.id,
        firstOpening: false,
        domain: domainData?.domain?.find((item) => item.name === domainSelected)
          ?.key,
      },
    }).then(() => {
      window.location.href = "/home";
    });

    setSkipLoading(false);
  };

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
    });
    await updateUser({
      variables: {
        userID: currentUser?.id,
        firstOpening: false,
      },
    }).then(() => {
      window.location.href = "/home";
    });

    setMutationLoading(false);
  };

  return (
    <PageContainer
      title="Personnalise ta boutique"
      description="Définis le nom de ta boutique, ajoute une description, une photo de couverture et de profil."
    >
      <Grid
        lg={12}
        sx={{
          margin: "auto",
        }}
      >
        <Box
          sx={{
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
            mx: "15px",
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
              pl: 1,
            }}
          >
            <Breadcrumb
              title={`Ici, tu peux commencer à personnaliser ta boutique.`}
              subtitle={`Bienvenue `}
              username={currentUser?.username}
            ></Breadcrumb>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "row",

              px: 3,
              backgroundColor: "#fafbfb",
              position: {
                xs: "fixed",
                sm: "fixed",
                md: "initial",
                lg: "initial",
              },
              bottom: 0,
              left: 0,
              zIndex: 10,
              height: 100,
              width: "100%",
              alignItems: "center",
              justifyContent: {
                xs: "center",
                sm: "center",
                md: "end",
              },
            }}
          >
            <LoadingButton
              loading={skipLoading}
              onClick={handleSkip}
              color="primary"
              variant="outlined"
              sx={{
                backgroundColor: "white",
                height: "40px",
                width: "300px",
                fontWeight: "700",
                borderRadius: "100px",
                marginRight: "15px",
              }}
            >
              <Typography
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                  color: "black",
                }}
              >
                Passer cette étape
              </Typography>
              <Typography
                sx={{
                  display: {
                    xs: "block",
                    sm: "block",
                    md: "none",
                  },
                  color: "black",
                }}
              >
                Passer
              </Typography>
            </LoadingButton>

            <LoadingButton
              loading={mutationLoading}
              onClick={handleStoreUpdate}
              color="primary"
              variant="contained"
              disabled={
                (currentUser.username === storeName &&
                  currentUser.username === username &&
                  currentUser.domain ===
                    domainData?.domain?.find(
                      (item) => item.name === domainSelected
                    )?.key &&
                  storeDescription === "") ||
                profileFile ||
                bannerFile
              }
              sx={{
                height: "40px",
                width: "300px",
                fontWeight: "700",
                borderRadius: "100px",
              }}
            >
              <Typography
                sx={{
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "block",
                  },
                  color: "white",
                }}
              >
                Aperçu de ma boutique
              </Typography>
              <Typography
                sx={{
                  display: {
                    xs: "block",
                    sm: "block",
                    md: "none",
                  },
                  color: "white",
                }}
              >
                Aperçu
              </Typography>
            </LoadingButton>
          </Box>
        </Box>

        <StoreSettingsInputs
          username={username}
          setUsername={setUsername}
          storeName={storeName}
          setStoreName={setStoreName}
          storeDescription={storeDescription}
          setStoreDescription={setStoreDescription}
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          profileFile={profileFile}
          setProfileFile={setProfileFile}
          domains={domainData?.domain}
          setDomainSelected={setDomainSelected}
          domainSelected={domainSelected}
        ></StoreSettingsInputs>
      </Grid>
      <Box sx={{ marginBottom: 20 }}></Box>
    </PageContainer>
  );
};

export default UserProfile;
