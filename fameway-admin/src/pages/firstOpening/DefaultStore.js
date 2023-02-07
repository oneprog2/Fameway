import React, { useEffect, useState } from "react";
import { Box, Button, Grid } from "@mui/material";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";
import { useMutation, useQuery } from "@apollo/client";
import { STORE_DATA } from "../../api/queries";
import { handleUpload } from "../../components/aws/UploadToS3";
import { UPDATE_STORE, UPDATE_USER } from "../../api/mutations";
import Spinner from "../spinner/Spinner";
import { StoreSettingsInputs } from "../../components/inputs/StoreSettingsInputs";

const UserProfile = () => {
  const [currentUser] = useAtom(userAtom);
  const [storeName, setStoreName] = React.useState(currentUser?.username);
  const [username, setUsername] = React.useState(currentUser?.username);
  const [category, setCategory] = useState("Tout");
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [storeDescription, setStoreDescription] = React.useState("");
  const [mutationLoading, setMutationLoading] = React.useState(false);

  useEffect(() => {
    if (currentUser?.username) {
      setStoreName(currentUser?.username);
    }
  }, [currentUser]);

  const { data, error, loading } = useQuery(STORE_DATA, {
    variables: { storeID: currentUser?.storeID },
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
    <PageContainer title="User Profile" description="this is User Profile page">
      <Grid
        lg={10}
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

          <Button
            onClick={handleStoreUpdate}
            color="primary"
            variant="contained"
            sx={{
              height: "40px",
              width: "300px",
              fontWeight: "700",
              borderRadius: "100px",
            }}
          >
            {mutationLoading ? (
              <Box
                sx={{
                  height: "30px",
                  width: "30px",
                }}
              >
                <Spinner />
              </Box>
            ) : (
              "Valider les modifications"
            )}
          </Button>
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
        ></StoreSettingsInputs>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "end",
          }}
        >
          <Button
            color="primary"
            variant="contained"
            sx={{
              alignSelf: "self-end",
              marginTop: 10,
              marginBottom: 10,
              height: "40px",
              width: "300px",
              fontWeight: "700",
              borderRadius: "100px",
            }}
          >
            Valider les modifications
          </Button>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
