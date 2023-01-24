import React from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Rating,
  Typography,
} from "@mui/material";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import CoverCard from "../../components/profile/CoverCard";
import IntroCard from "../../components/profile/IntroCard";
import PhotosCard from "../../components/profile/PhotosCard";
import NewPost from "../../components/profile/NewPost";
import ImgPost from "../../components/profile/ImgPost";
import TypographyPost from "../../components/profile/TypographyPost";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";

const UserProfile = () => {
  const [currentUser] = useAtom(userAtom);
  const [storeName, setStoreName] = React.useState(
    currentUser?.username || "@nom"
  );
  const [storeDescription, setStoreDescription] = React.useState(
    "Ecrire une description"
  );

  const Shopitems = [
    {
      title: "B Natural Mixed Fruit",
      category: "Ice-cream shop",
      price: "$50",
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
      price: "$25",
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
      price: "$15",
      colors: [
        (theme) => theme.palette.primary.main,
        (theme) => theme.palette.secondary.main,
      ],
      photo: null,
      id: 7,
      star: [1, 2, 3, 4, 5],
    },
    {
      title: "Wireless Headphones",
      category: "Boat Headphones",
      price: "$300",
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
        <Breadcrumb
          title={`Ici, tu peux commencer à personnaliser ta boutique.`}
          subtitle={`Bienvenue ${currentUser?.username} !`}
        ></Breadcrumb>
        <Button label={"Valider les modifications"}></Button>
        <CoverCard username={storeName} description={storeDescription} />
      </Grid>

      <Grid
        sx={{
          margin: "auto",
          marginTop: 20,
        }}
        container
        lg={10}
      >
        {Shopitems.map((product) => (
          <Grid
            item
            xs={12}
            lg={3}
            sm={4}
            display="flex"
            alignItems="stretch"
            key={product.title}
          >
            <Card sx={{ p: 0, width: "100%" }}>
              <Box
                sx={{
                  backgroundColor: "red",
                  height: "200px",
                  width: "100%",
                }}
              ></Box>
              {/* <img src={product.photo} alt="img" width="100%" /> */}
              <CardContent sx={{ p: 3 }}>
                <Typography variant="caption">{product.category}</Typography>
                <Typography variant="h5">{product.title}</Typography>
                <Box display="flex" alignItems="center" sx={{ mt: "15px" }}>
                  <Typography variant="h5" sx={{ mr: "auto" }}>
                    {product.price}
                  </Typography>
                  <Rating
                    size="small"
                    name={product.rname}
                    value={3}
                    onChange={(event, newValue) => {
                      // setValue(newValue);
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
