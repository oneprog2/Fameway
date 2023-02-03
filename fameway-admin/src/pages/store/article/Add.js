import React, { useState } from "react";
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
import { useMutation } from "@apollo/client";
import { UPSERT_ARTICLE } from "../../../api/mutations";

const UserProfile = () => {
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
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [articleID, setArticleID] = useState(null);
  const [mutationLoading, setMutationLoading] = useState(false);
  const [upsertArticle, { storeError }] = useMutation(UPSERT_ARTICLE);

  const handleSetPictures = ({ index, file }) => {
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

    if (pictures?.length > 0) {
      let test = await Promise.all(
        pictures.map(async (p) => {
          let tmp = p;
          await handleUpload(p.url, currentUser?.username).then((res) => {
            tmp.uploadUrl = res?.location;
          });
          return tmp;
        })
      ).then(async (res) => {
        // console.log(res.);
        let uploadedUrls = res.map((item) => {
          return item["uploadUrl"];
        });
        await upsertArticle({
          variables: {
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
    }

    // await updateStore({
    //   variables: {
    //     storeID: currentUser?.storeID,
    //     status: "draft",
    //     name: storeName,
    //     bannerPicture: bannerUrl,
    //     profilePicture: profileUrl,
    //     description: storeDescription,
    //   },
    // });
    // await updateUser({
    //   variables: {
    //     userID: currentUser?.id,
    //     firstOpening: false,
    //   },
    // }).then(() => {
    //   window.location.href = "/home";
    // });

    setMutationLoading(false);
  };

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
              title={`Ajoute un article à ta boutique.`}
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
            Créer l'article
          </Button>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
