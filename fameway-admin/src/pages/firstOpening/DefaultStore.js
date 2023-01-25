import React, { useState } from "react";
import {
  Box,
  Button,
  CardContent,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import CoverCard from "../../components/profile/CoverCard";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";

const CategoryButton = ({ title, active, onClick }) => (
  <Link
    onClick={onClick}
    sx={{
      cursor: "pointer",
      borderRadius: "0",
      textTransform: "capitalize",
      fontWeight: active ? "700" : "500",
      fontSize: "14px",
      color: "#000",
      paddingBottom: "10px",
      borderBottom: active ? "2px solid #000" : "none",
      textDecoration: "none",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
    }}
  >
    <Typography variant="h5">{title}</Typography>
  </Link>
);

const UserProfile = () => {
  const [currentUser] = useAtom(userAtom);
  const [storeName, setStoreName] = React.useState(
    currentUser?.username ? `@${currentUser?.username}` : "@Nom"
  );
  const [category, setCategory] = useState("Tout");
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [storeDescription, setStoreDescription] = React.useState(
    "Ecrire une description"
  );

  const Shopitems = [
    {
      title: "Rencontre en visio - 30 Min",
      category: "Ice-cream shop",
      price: "50 €",
      colors: [
        (theme) => theme.palette.secondary.main,
        (theme) => theme.palette.primary.main,
      ],
      photo: null,
      id: 5,
      star: [1, 2, 3, 4, 5],
    },
    {
      title: "Mix Strawberry Candy",
      category: "Ice-cream shop",
      price: "25 €",
      colors: [
        (theme) => theme.palette.success.main,
        (theme) => theme.palette.secondary.main,
      ],
      photo: null,
      id: 6,
      star: [1, 2, 3, 4, 5],
    },
    {
      title: "Wafer cones",
      category: "Ice-cream shop",
      price: "15 €",
      colors: [
        (theme) => theme.palette.primary.main,
        (theme) => theme.palette.secondary.main,
      ],
      photo: null,
      id: 7,
      star: [1, 2, 3, 4, 5],
    },
    {
      title: "Ajouter un produit",
      price: "prix",
      colors: [
        (theme) => theme.palette.error.main,
        (theme) => theme.palette.warning.main,
      ],
      photo: null,
      id: 8,
      star: [1, 2, 3, 4, 5],
    },
  ];

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
              subtitle={`Bienvenue ${currentUser?.username} !`}
            ></Breadcrumb>
          </Box>

          <Button
            color="primary"
            variant="contained"
            sx={{
              height: "40px",
              width: "300px",
              fontWeight: "700",
              borderRadius: "100px",
            }}
          >
            Valider les modifications
          </Button>
        </Box>

        <CoverCard
          username={storeName}
          description={storeDescription}
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
          {Shopitems.map((product) => (
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
                    height: "280px",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    sx={{
                      pt: "13px",
                      pl: "17px",
                    }}
                  >
                    Suggestion
                  </Typography>
                </Box>
                {/* <img src={product.photo} alt="img" width="100%" /> */}
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
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
