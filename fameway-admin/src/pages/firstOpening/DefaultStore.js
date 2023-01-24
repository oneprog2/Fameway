import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Link,
  Rating,
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
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
