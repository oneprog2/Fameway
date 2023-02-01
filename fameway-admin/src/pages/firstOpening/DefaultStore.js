import React, { useEffect, useState } from "react";
import { Box, Button, CardContent, Grid, Typography } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import CoverCard from "../../components/profile/CoverCard";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";
import { useMutation, useQuery } from "@apollo/client";
import { STORE_DATA } from "../../api/queries";
import { handleUpload } from "../../components/aws/UploadToS3";
import { UPDATE_STORE, UPDATE_USER } from "../../api/mutations";
import Spinner from "../spinner/Spinner";
import { CategoryButton } from "../../components/buttons/CategoryButton";

const UserProfile = () => {
  const [currentUser] = useAtom(userAtom);
  const [storeName, setStoreName] = React.useState(`@${currentUser?.username}`);
  const [category, setCategory] = useState("Tout");
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

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

        <CoverCard
          storeName={storeName}
          setStoreName={setStoreName}
          storeDescription={storeDescription}
          setStoreDescription={setStoreDescription}
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          profileFile={profileFile}
          setProfileFile={setProfileFile}
        />

        <Grid
          sx={{
            margin: 5,
            width: "100%",
          }}
          container
          lg={10}
        >
          <CategoryButton
            onClick={() => setCategory("Tout")}
            title="Tout"
            active={category === "Tout" ? true : false}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 4,
            }}
          >
            <CategoryButton
              onClick={() => setCategory("Articles virtuels")}
              title="Articles virtuels"
              active={category === "Articles virtuels" ? true : false}
            />
          </Box>
        </Grid>

        <Grid
          sx={{
            width: "100%",
          }}
          lg={12}
          container
        >
          {Shopitems?.map((product) => (
            <Grid
              item
              xs={12}
              lg={3}
              sm={4}
              display="flex"
              sx={{ flexDirection: "column", px: 1 }}
              key={product.title}
            >
              <Box
                sx={{
                  p: 0,
                  m: 0,
                  mb: 1,
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    borderRadius: "6px",
                    backgroundColor: "#F5F5F5",
                    height: "320px",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      position: "absolute",
                      pt: "13px",
                      pl: "17px",
                    }}
                  >
                    Suggestion
                  </Typography>
                  <img
                    src={product.photo}
                    srtl
                    alt="img"
                    height="100%"
                    width="100%"
                    style={{
                      objectFit: "contain",
                    }}
                  />
                </Box>
              </Box>
              <CardContent sx={{ px: 1, pt: 0, w: "100%" }}>
                <Typography textAlign={"center"} fontWeight={700} variant="h5">
                  {product.title}
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    justifyContent: "center",
                    mt: "10px",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      color: "#717171",
                    }}
                    textAlign={"center"}
                  >
                    {product.price}
                  </Typography>
                </Box>
              </CardContent>
            </Grid>
          ))}
          <Grid
            item
            xs={12}
            lg={3}
            sm={4}
            display="flex"
            sx={{ flexDirection: "column", px: 1 }}
          >
            <Box
              sx={{
                p: 0,
                m: 0,
                mb: 1,
                width: "100%",
              }}
            >
              <Box
                sx={{
                  borderRadius: "6px",
                  backgroundColor: "#F5F5F5",
                  height: "320px",
                  width: "100%",
                  alignContent: "center",
                  justifyContent: "center",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    backgroundColor: "#ffce00",
                    borderRadius: "100px",
                    width: "50px",
                    height: "50px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <FeatherIcon icon="plus" width="25" height="25" />
                </Box>
              </Box>
              {/* <img src={product.photo} alt="img" width="100%" /> */}
            </Box>
            <CardContent sx={{ px: 1, pt: 0, w: "100%" }}>
              <Typography textAlign={"center"} fontWeight={700} variant="h5">
                Ajouter un produit
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                sx={{
                  justifyContent: "center",
                  mt: "10px",
                }}
              >
                <Typography
                  variant="h6"
                  sx={{
                    color: "#717171",
                  }}
                  textAlign={"center"}
                >
                  Prix
                </Typography>
              </Box>
            </CardContent>
          </Grid>
        </Grid>

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
