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
import { CategoryButton } from "../../components/buttons/CategoryButton";

const StoreSettings = () => {
  const firstOpening = window.location.pathname === "/firstOpening";

  const [currentUser, setCurrentUser] = useAtom(userAtom);
  const [storeName, setStoreName] = React.useState(
    firstOpening ? currentUser?.username : null
  );
  const [username, setUsername] = React.useState(currentUser?.username);
  const [domainSelected, setDomainSelected] = useState(
    firstOpening ? "Gaming" : null
  );
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [storeDescription, setStoreDescription] = React.useState("");
  const [mutationLoading, setMutationLoading] = React.useState(false);
  const [skipLoading, setSkipLoading] = React.useState(false);
  const [category, setCategory] = useState("Personnalisation");

  useEffect(() => {
    if (currentUser?.username && firstOpening) {
      setStoreName(currentUser?.username);
    }
  }, [currentUser, firstOpening]);

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

  useEffect(() => {
    if (!firstOpening && domainData) {
      setDomainSelected(
        domainData?.domain?.find((item) => item.key === currentUser?.domain)
          ?.name
      );
    }
  }, [domainData, currentUser, firstOpening, domainLoading]);

  const [updateStore, { storeError }] = useMutation(UPDATE_STORE);
  const [updateUser, { userError }] = useMutation(UPDATE_USER);
  const [loadData, setLoadData] = React.useState(false);

  useEffect(() => {
    setLoadData(true);
    if (data?.store_by_pk) {
      setStoreDescription(data?.store_by_pk?.description);
      setProfileFile(data?.store_by_pk?.profilePicture);
      setBannerFile(data?.store_by_pk?.bannerPicture);
      if (!firstOpening) {
        setStoreName(data?.store_by_pk?.name);
        setLoadData(false);
      }
      setLoadData(false);
    }
  }, [data, firstOpening, loading]);

  if (loading || domainLoading || (!firstOpening && loadData))
    return <div>Chargement ...</div>;

  const handleSkip = async () => {
    setSkipLoading(true);

    await updateUser({
      variables: {
        userID: currentUser?.id,
        firstOpening: false,
        domain: domainData?.domain?.find((item) => item.name === domainSelected)
          ?.key,
        username: username,
      },
    }).then(() => {
      window.location.href = "/home";
    });

    setSkipLoading(false);
  };

  const handleStoreUpdate = async () => {
    setMutationLoading(true);
    let profileUrl = profileFile;
    let bannerUrl = bannerFile;

    if (profileFile && profileFile !== data?.store_by_pk?.profilePicture) {
      await handleUpload(profileFile, currentUser?.username)
        .then((res) => {
          profileUrl = res?.location;
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (bannerFile && bannerFile !== data?.store_by_pk?.bannerPicture)
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
        username: username,
        domain: domainData?.domain?.find((item) => item.name === domainSelected)
          ?.key,
      },
    }).then(() => {
      window.location.href = firstOpening ? "/home" : "/store/settings";
    });

    setMutationLoading(false);
  };

  const StoreButtons = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          px: firstOpening ? 0 : 3,
          backgroundColor: "#fafbfb",
          position: {
            xs: "fixed",
            sm: "fixed",
            md: "initial",
            lg: "initial",
          },
          bottom: 0,
          left: 0,
          my: !firstOpening
            ? {
                xs: 0,
                sm: 0,
                md: 0,
                lg: 10,
              }
            : 0,
          mt: firstOpening ? 4 : 0,
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
          {!skipLoading ? (
            <>
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
                {firstOpening ? "Passer cette étape" : "Aperçu de la boutique"}
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
                {firstOpening ? "Passer" : "Aperçu"}
              </Typography>
            </>
          ) : null}
        </LoadingButton>

        <LoadingButton
          loading={mutationLoading}
          onClick={handleStoreUpdate}
          color="primary"
          variant="contained"
          disabled={
            currentUser.username === storeName &&
            currentUser.username === username &&
            !profileFile &&
            !bannerFile &&
            currentUser.domain ===
              domainData?.domain?.find((item) => item.name === domainSelected)
                ?.key
          }
          sx={{
            height: "40px",
            width: "300px",
            fontWeight: "700",
            borderRadius: "100px",
          }}
        >
          {!mutationLoading ? (
            <>
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
                {firstOpening
                  ? "Aperçu de ma boutique"
                  : "Valider les modifications"}
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
                {firstOpening ? "Continuer" : "Valider"}
              </Typography>
            </>
          ) : null}
        </LoadingButton>
      </Box>
    );
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
            // mx: "15px",
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
              title={
                !firstOpening
                  ? `Fait briller ta boutique.`
                  : `Ici, tu peux commencer à personnaliser ta boutique.`
              }
              subtitle={!firstOpening ? "" : `Bienvenue `}
              username={currentUser?.username}
            ></Breadcrumb>
          </Box>
          <Box>{firstOpening ? <StoreButtons /> : null}</Box>
        </Box>

        {!firstOpening ? (
          <Grid
            sx={{
              px: 1,
              mb: 6,
              width: "100%",
            }}
            container
            lg={12}
          >
            <CategoryButton
              onClick={() => setCategory("Personnalisation")}
              title="Personnalisation"
              active={category === "Personnalisation" ? true : false}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                marginLeft: 4,
              }}
            >
              <CategoryButton
                onClick={() => setCategory("Paramètres")}
                title="Paramètres"
                active={category === "Paramètres" ? true : false}
              />
            </Box>
          </Grid>
        ) : null}

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

      <StoreButtons />

      <Box
        sx={{
          marginBottom: !firstOpening
            ? {
                xs: 10,
                sm: 10,
                md: 0,
              }
            : 3,
        }}
      ></Box>
    </PageContainer>
  );
};

export default StoreSettings;
