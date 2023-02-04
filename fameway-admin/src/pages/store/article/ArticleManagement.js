import React, { useEffect, useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../../components/container/PageContainer";
import {
  DescriptionCardForm,
  PriceCardForm,
  CategoryForm,
} from "../../../components/forms/fb-elements/index";
import { PicturesInput } from "../../../components/inputs/PicturesInput";
import FeatherIcon from "feather-icons-react";
import { handleUpload } from "../../../components/aws/UploadToS3";
import { useAtom } from "jotai";
import { userAtom } from "../../../atoms/Atoms";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_ARTICLE,
  UPDATE_ARTICLE,
  UPSERT_ARTICLE,
} from "../../../api/mutations";
import { useParams } from "react-router";
import { ARTICLE_DATA } from "../../../api/queries";

const ArticleManagement = () => {
  const BCrumb = [
    {
      to: "/store/articles",
      title: "Articles",
    },
    {
      title: "Ajouter un article",
    },
  ];

  const [currentUser] = useAtom(userAtom);

  const [pictures, setPictures] = useState([]);

  const [changedPictures, setChangedPictures] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [articleID, setArticleID] = useState(null);
  const [mutationLoading, setMutationLoading] = useState(false);

  const [upsertArticle, { storeError }] = useMutation(
    articleID ? UPDATE_ARTICLE : ADD_ARTICLE
  );

  const { id } = useParams();

  const { data, error, loading } = useQuery(ARTICLE_DATA, {
    variables: { articleID: id },
  });

  useEffect(() => {
    if (data?.article_by_pk) {
      setArticleID(data?.article_by_pk?.id);
      setName(data?.article_by_pk?.name);
      setDescription(data?.article_by_pk?.description);
      setPrice(data?.article_by_pk?.price);
      setPictures(
        data?.article_by_pk?.articlePictures?.map((p, index) => {
          return {
            index: index,
            preview: p,
            url: p,
          };
        })
      );
    }
    return () => {};
  }, [data]);

  useEffect(() => {
    setChangedPictures(false);
  }, []);

  const handleSetPictures = ({ index, file }) => {
    setChangedPictures(true);
    var tmpFile = file.target.files[0];

    var reader = new FileReader();
    var url = reader.readAsDataURL(tmpFile);
    reader.onloadend = function (e) {
      let indexExist = pictures?.findIndex((p) => p.index === index);
      if (indexExist !== -1) {
        setPictures(
          pictures?.map((p) => {
            if (p.index === indexExist) {
              let tmp = p;
              tmp.preview = reader.result;
              tmp.url = tmpFile;
              tmp.index = index;
              return tmp;
            } else return p;
          })
        );
      } else
        setPictures([
          ...pictures,
          {
            index: index,
            preview: reader.result,
            url: tmpFile,
          },
        ]);
    };
  };

  const handleUploadArticle = async () => {
    setMutationLoading(true);
    console.log(data);

    if (pictures?.length > 0 && changedPictures) {
      await Promise.all(
        pictures.map(async (p) => {
          let tmp = p;
          await handleUpload(p.url, currentUser?.username).then((res) => {
            tmp.uploadUrl = res?.location;
          });
          return tmp;
        })
      ).then(async (res) => {
        let uploadedUrls = res.map((item) => {
          return item["uploadUrl"];
        });
        await upsertArticle({
          variables: {
            articleID: articleID || undefined,
            storeID: currentUser?.storeID,
            name: name,
            description: description,
            price: price,
            articlePictures: `{${uploadedUrls.join(",")}}`,
          },
        }).then(() => {
          window.location.href = "/store/articles";
        });
      });
    } else if (pictures?.length > 0 && !changedPictures) {
      console.log("ddzedz");
      await upsertArticle({
        variables: {
          articleID: articleID || undefined,
          storeID: currentUser?.storeID,
          name: name,
          description: description,
          price: price,
          articlePictures: `{${data?.article_by_pk?.articlePictures.join(
            ","
          )}}`,
        },
      }).then(() => {
        window.location.href = "/store/articles";
      });
    }
    setMutationLoading(false);
  };

  if (mutationLoading || loading) return <div>loading...</div>;

  return (
    <PageContainer title="User Profile" description="this is User Profile page">
      <Grid lg={12}>
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
              goBack
              title={
                articleID
                  ? "Modifies les caractéristiques de l'article"
                  : `Ajoute un article à ta boutique.`
              }
              items={BCrumb}
            ></Breadcrumb>
          </Box>
        </Box>

        <Grid
          lg={12}
          md={12}
          sm={12}
          xs={12}
          container
          sx={{
            display: "flex",
          }}
        >
          <Grid item lg={3} md={4} sm={5} spacing={0} sx={{ mt: 2 }}>
            <Typography
              fontWeight="700"
              sx={{
                mt: {
                  xs: 2,
                  sm: 0,
                },
                pl: {
                  xs: 2,
                  sm: 2,
                  md: 2,
                },
                fontSize: 26,
              }}
            >
              📷 Photos
            </Typography>

            <PicturesInput
              handleSetPictures={handleSetPictures}
              pictures={pictures}
            />
            <Box
              sx={{
                justifyContent: "center",
                display: "flex",
                mt: 3,
                textAlign: "center",
                fontSize: 12,
              }}
            >
              <Typography
                sx={{
                  fontSize: 14,
                }}
              >
                Ajoute au moins 2 photos au format JPG/PNG.
              </Typography>
            </Box>
            <Box
              sx={{
                justifyContent: "center",
                display: "flex",
              }}
            >
              <Button
                color="primary"
                variant="contained"
                sx={{
                  marginTop: 2,
                  marginBottom: 10,
                  height: "40px",
                  fontWeight: "700",
                  borderRadius: "100px",
                  mx: 3,
                  alignContent: "center",
                  justifyContent: "center",
                }}
              >
                <Typography>Aperçu dans la boutique</Typography>
                <Box
                  sx={{
                    ml: 1,
                    justifyContent: "center",
                    alignContent: "center",
                    display: "flex",
                  }}
                >
                  <FeatherIcon icon="eye" width="20" />
                </Box>
              </Button>
            </Box>
          </Grid>

          <Box sx={{ flex: 1 }}></Box>

          <Grid
            item
            lg={8.5}
            sm={7}
            sx={{
              marginTop: 2,
            }}
          >
            <Typography
              fontWeight="700"
              sx={{
                mt: {
                  xs: 2,
                  sm: 0,
                },
                pl: {
                  xs: 2,
                  sm: 2,
                  md: 4,
                },
                fontSize: 26,
              }}
            >
              ✏️ Description
            </Typography>
            <DescriptionCardForm
              name={name}
              setName={setName}
              description={description}
              setDescription={setDescription}
            />
            <Typography
              fontWeight="700"
              sx={{
                pl: {
                  xs: 2,
                  sm: 2,
                  md: 4,
                },
                mt: 4,
                fontSize: 26,
              }}
            >
              💰 Prix
            </Typography>
            <PriceCardForm setPrice={setPrice} price={price} />

            <Typography
              fontWeight="700"
              sx={{
                pl: {
                  xs: 2,
                  sm: 2,
                  md: 4,
                },
                mt: 4,
                fontSize: 26,
              }}
            >
              *️⃣ Catégorie
            </Typography>
            <CategoryForm />

            {/* <Typography
              fontWeight="700"
              sx={{
                pl: {
                  xs: 2,
                  sm: 2,
                  md: 4,
                },
                mt: 4,
                fontSize: 26,
              }}
            >
              🧵 Taille
            </Typography>
            <SizeForm /> */}
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
            onClick={handleUploadArticle}
          >
            {articleID ? "Modifier l'article" : "Créer l'article"}
          </Button>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default ArticleManagement;
