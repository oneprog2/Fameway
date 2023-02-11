import React from "react";
import { Grid, Box, Card, CardContent, Typography } from "@mui/material";
import profilecover from "../../assets/images/users/user.png";
import imageIcon from "../../assets/images/logos/Icons-black.png";
import { EditButton } from "../buttons/EditButton";
import { DeleteButton } from "../buttons/DeleteButton";
import ReactHtmlParser from "react-html-parser";

const CoverCard = ({
  username,
  storeName,
  storeDescription,
  bannerFile,
  setBannerFile,
  profileFile,
  setProfileFile,
}) => {
  const [previewProfile, setPreviewProfile] = React.useState(profileFile);
  const [previewBanner, setPreviewBanner] = React.useState(bannerFile);

  const handleBannerInput = (e) => {
    var file = e.target.files[0];
    setBannerFile(file);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setPreviewBanner(reader.result);
    };
  };

  const handleProfileInput = (e) => {
    var file = e.target.files[0];
    setProfileFile(file);
    var reader = new FileReader();
    var url = reader.readAsDataURL(file);

    reader.onloadend = function (e) {
      setPreviewProfile(reader.result);
    };
  };

  return (
    <div
      sx={{
        padding: 0,
        marginTop: 5,
      }}
    >
      <label onChange={handleBannerInput} htmlFor="formId">
        <input name="" type="file" id="formId" hidden />
        <Box
          sx={{
            cursor: "pointer",
            zIndex: 200,
            height: "300px",
            backgroundColor: previewBanner ? "transparent" : "#f0f0f0",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 0,
            overflow: "hidden",

            margin: 0,
            borderRadius: "20px",
          }}
        >
          <Box
            sx={{
              height: "100%",
              alignContent: "center",
              alignItems: "center",
              justifyContent: "center",
              backgroundPosition: "center",
              backgroundSize: previewBanner ? 0 : "100px",
              backgroundRepeat: "no-repeat",
              backgroundImage: `url(${imageIcon})`,
              margin: 0,
              padding: 0,
            }}
          >
            {previewBanner ? (
              <img
                alt="banner"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
                src={previewBanner ? previewBanner : `url(${imageIcon})`}
              />
            ) : null}
          </Box>

          {previewBanner ? (
            <Box
              onClick={(e) => {
                e.preventDefault();
                setPreviewBanner(null);
                setBannerFile(null);
              }}
              style={{
                zIndex: 200,
                position: "absolute",
                top: 15,
                right: 20,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <DeleteButton></DeleteButton>
            </Box>
          ) : (
            <Box
              style={{
                position: "absolute",
                bottom: 15,
                right: 20,
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "center",
              }}
            >
              <EditButton></EditButton>
            </Box>
          )}
        </Box>
      </label>

      <CardContent
        sx={{
          pt: "24px",
          pb: "28px",
        }}
      >
        <Grid container spacing={0}>
          <Grid
            item
            lg={12}
            sm={12}
            xs={12}
            sx={{
              zIndex: 200,
              order: {
                xs: "1",
                sm: "1",
                lg: "2",
              },
            }}
          >
            <Box
              display="flex"
              alignItems="flex-start"
              justifyContent="flex-start"
              sx={{
                ml: "20px",
              }}
            >
              <Box
                sx={{
                  mt: "-90px",
                }}
              >
                <label onChange={handleProfileInput} htmlFor="profile">
                  <input name="profile" type="file" id="profile" hidden />
                  <Box
                    sx={{
                      cursor: "pointer",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundImage: previewProfile
                        ? null
                        : `url(${profilecover})`,
                      width: "162px",
                      height: "162px",
                      borderRadius: "100%",
                      border: previewProfile
                        ? "5px solid #fff"
                        : "2px solid #fff",
                      overflow: previewProfile ? "hidden" : "visible",
                      position: "relative",
                    }}
                  >
                    {previewProfile ? (
                      <img
                        alt="profile"
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover",
                          backgroundColor: "#FFF",
                        }}
                        src={previewProfile}
                      />
                    ) : null}
                    {!previewProfile ? (
                      <Box
                        style={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          alignItems: "center",
                          justifyContent: "center",
                          alignSelf: "center",
                          zIndex: 200,
                        }}
                      >
                        <EditButton></EditButton>
                      </Box>
                    ) : null}
                  </Box>
                </label>
              </Box>

              <Box
                sx={{
                  ml: "20px",
                  mt: "-20px",
                  flex: 1,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: {
                      xs: "start",
                      sm: "start",
                      md: "center",
                    },
                    alignContent: "center",
                    flexDirection: {
                      xs: "column",
                      sm: "column",
                      md: "row",
                    },
                  }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      sx={{
                        fontWeight: "900",
                        fontSize: "30px",
                        color: "#222222",
                        margin: 0,
                        padding: 0,
                      }}
                    >
                      {storeName?.length > 0 ? storeName : "Nom de la boutique"}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      borderLeft: {
                        md: "1px solid #B2B2B2",
                      },
                      pl: {
                        md: 2,
                      },
                      height: "100%",
                      display: "flex",
                      alignItems: "start",
                      justifyContent: "start",
                      ml: {
                        xs: 0,
                        sm: 0,
                        md: "14px",
                      },
                      // mt: 1,
                    }}
                  >
                    <Typography>@{username}</Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: {
                      xs: "none",
                      sm: "none",
                      md: "flex",
                    },
                    mt: -1,
                    flex: 1,
                    alignItems: "center",
                  }}
                >
                  <Typography>{ReactHtmlParser(storeDescription)}</Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: {
                  xs: "flex",
                  sm: "flex",
                  md: "none",
                },
                px: 3,
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography>{ReactHtmlParser(storeDescription)}</Typography>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
};
export default CoverCard;
