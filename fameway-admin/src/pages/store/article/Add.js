import React, { useState } from "react";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../../components/container/PageContainer";
import {
  DescriptionCardForm,
  PriceCardForm,
  CategoryForm,
} from "../../../components/forms/fb-elements/index";
import imageIcon from "../../../assets/images/logos/Icons.png";

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

  const [pictures, setPictures] = useState([]);

  const handleProfileInput = ({ index, file }) => {
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
            <Box>
              <Card
                sx={{
                  borderRadius: 3,
                  mt: 2,
                  backgroundColor: "#222222",
                  p: 0,
                  display: "flex",
                  aspectRatio: "1/1.2",
                  cursor: "pointer",
                }}
              >
                <label
                  key={"mainPic"}
                  onChange={(e) =>
                    handleProfileInput({
                      file: e,
                      index: 0,
                    })
                  }
                  style={{
                    cursor: "pointer",
                    height: "100%",
                    width: "100%",
                    objectFit: "contain",
                    alignItems: "center",
                    justifyContent: "center",
                    display: "flex",
                  }}
                  htmlFor="mainPicture"
                >
                  <input
                    alt={"Photo principale"}
                    accept="image/*"
                    name="mainPicture"
                    type="file"
                    id="mainPicture"
                    hidden
                  />
                  <img
                    alt="banners"
                    style={{
                      height: pictures?.length > 0 ? "100%" : "30%",
                      width: pictures?.length > 0 ? "100%" : "30%",
                      objectFit: pictures?.length > 0 ? "cover" : "contain",
                    }}
                    src={
                      pictures?.find((o) => o.index === 0)
                        ? pictures?.find((o) => o.index === 0)?.preview
                        : imageIcon
                    }
                  />
                </label>
              </Card>

              <Box
                sx={{
                  display: "flex",
                  flex: 1,
                  px: 2,
                  mt: 0,
                  justifyContent: "space-between",
                  spacing: {
                    sm: 0,
                    lg: 40,
                  },
                  gap: 1,
                }}
              >
                {new Array(4).fill(0).map((item, index) => (
                  <label
                    key={index + "pic"}
                    onChange={(e) =>
                      handleProfileInput({
                        file: e,
                        index: index + 1,
                      })
                    }
                    style={{
                      cursor: "pointer",
                      height: "100%",
                      width: "100%",
                      objectFit: "contain",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                    htmlFor={`pictures-${index}`}
                  >
                    <input
                      accept="image/*"
                      alt={`Photo ${index + 1}`}
                      name={`pictures-${index}`}
                      type="file"
                      id={`pictures-${index}`}
                      hidden
                    />
                    <Card
                      key={index + "pic"}
                      sx={{
                        flex: 1,
                        m: 0,
                        borderRadius: 2,
                        aspectRatio: "1/1.2",
                        backgroundColor: "#FFCE00",
                        justifyContent: "center",
                        alignItems: "center",
                        display: "flex",
                      }}
                    >
                      <img
                        alt="banners"
                        style={{
                          height: "50%",
                          width: "50%",
                          objectFit: "contain",
                        }}
                        src={
                          pictures?.find((o) => o.index === index + 1)
                            ? pictures?.find((o) => o.index === index + 1)
                                ?.preview
                            : imageIcon
                        }
                      />
                    </Card>
                  </label>
                ))}
              </Box>
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
            <DescriptionCardForm />
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
            <PriceCardForm />

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
          >
            Créer l'article
          </Button>
        </Box>
      </Grid>
    </PageContainer>
  );
};

export default UserProfile;
