import React, { useEffect } from "react";
import { Box, CardContent, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../../components/container/PageContainer";
import { userAtom } from "../../../atoms/Atoms";
import { useAtom } from "jotai";
import { useQuery } from "@apollo/client";
import { STORE_DATA } from "../../../api/queries";
import { BigButton } from "../../../components/buttons/BigButton";
import FeatherIcon from "feather-icons-react";
import { ArticleCard } from "../../../components/cards/ArticleCard";

const List = ({ data }) => {
  return (
    <>
      {data?.map((product) => (
        <ArticleCard
          onClick={() =>
            window.location.replace(`/store/articles/${product.id}`)
          }
          picture={product.photo}
          title={product.title}
          price={product.price}
          icon={product.icon}
          suggestion={product.suggestion}
          type={product.type}
        ></ArticleCard>
      ))}
    </>
  );
};
const AddButton = () => {
  return (
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
  );
};

const ArticleList = () => {
  const [currentUser] = useAtom(userAtom);

  const { data, error, loading } = useQuery(STORE_DATA, {
    variables: { storeID: currentUser?.storeID },
  });

  const articles = data?.store_by_pk?.articles;
  const Shopitems = articles?.map((article) => {
    return {
      title: article.name,
      category: article.category,
      price: article.price,
      photo: article.articlePictures?.[0],
      id: article.id,
      status: article.status,
    };
  });

  if (loading) return <div>Chargement ...</div>;

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
            onClick={() => {
              window.location.href = "/store/articles/add";
            }}
            icon={"🎨"}
            title={"Ajouter un nouvel article à ma boutique"}
          />
          <BigButton
            disabled
            icon={"👕"}
            title={"Créer une nouvelle collection"}
          />
        </Box>

        <Grid
          lg={12}
          sx={{
            mt: 10,
          }}
        >
          <Typography
            fontWeight="700"
            sx={{
              fontSize: 26,
              mb: 4,
            }}
          >
            ⏳ En cours de modération
          </Typography>

          <Grid
            sx={{
              width: "100%",
            }}
            lg={12}
            container
          >
            <List data={Shopitems.filter((e) => e.status === "draft")} />
            <ArticleCard
              onClick={() => {
                window.location.href = "/store/articles/add";
              }}
              icon={<AddButton />}
              title={"Ajouter un article"}
            ></ArticleCard>
          </Grid>

          <Typography
            fontWeight="700"
            sx={{
              fontSize: 26,
              mb: 4,
            }}
          >
            ✅ Articles en ligne
          </Typography>

          <Grid
            sx={{
              width: "100%",
            }}
            lg={12}
            container
          >
            <List data={Shopitems.filter((e) => e.status === "published")} />
            <ArticleCard
              onClick={() => {
                window.location.href = "/store/articles/add";
              }}
              icon={<AddButton />}
              title={"Ajouter un article"}
            ></ArticleCard>
          </Grid>

          <Typography
            fontWeight="700"
            sx={{
              fontSize: 26,
              mb: 4,
            }}
          >
            ✏️ Brouillons
          </Typography>

          <Grid
            sx={{
              width: "100%",
            }}
            lg={12}
            container
          >
            <List data={Shopitems.filter((e) => e.status === "in progress")} />
            <ArticleCard
              onClick={() => {
                window.location.href = "/store/articles/add";
              }}
              icon={<AddButton />}
              title={"Ajouter un article"}
            ></ArticleCard>
          </Grid>
        </Grid>
      </Grid>
    </PageContainer>
  );
};

export default ArticleList;
