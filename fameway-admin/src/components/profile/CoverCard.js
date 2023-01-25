import React from "react";
import {
  Grid,
  Box,
  Card,
  CardContent,
  Typography,
  Link,
  Input,
} from "@mui/material";
import profilecover from "../../assets/images/users/user.png";
import imageIcon from "../../assets/images/logos/Icons.png";
import FeatherIcon from "feather-icons-react";
import CustomTextField from "../forms/custom-elements/CustomTextField";
import CustomTextEmpty from "../forms/custom-elements/CustomTextEmpty";

const EditButton = ({ onClick, size }) => (
  <Link
    onClick={onClick}
    sx={{
      cursor: "pointer",
      backgroundColor: "#ffce00",
      height: size === "small" ? 20 : 25,
      width: size === "small" ? 20 : 25,
      borderRadius: "6px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}
  >
    <FeatherIcon size={size === "small" ? 12 : 18} icon={"edit-2"} />
  </Link>
);

const CoverCard = ({
  storeName,
  setStoreName,
  storeDescription,
  setStoreDescription,
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
        padding: "0",
        marginTop: 5,
      }}
    >
      <label onChange={handleBannerInput} htmlFor="formId">
        <input name="" type="file" id="formId" hidden />
        <Card
          sx={{
            cursor: "pointer",
            zIndex: 200,
            height: "300px",
            backgroundColor: previewBanner ? "transparent" : "#D5D1FF",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            padding: 0,
            margin: 0,
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
        </Card>
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
            lg={4}
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
                      borderRadius: "100%",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundImage: previewProfile
                        ? null
                        : `url(${profilecover})`,
                      backgroundColor: previewProfile ? "#222222" : "#FFF",
                      width: "162px",
                      height: "162px",
                      border: "3px solid #fff",
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
                          borderRadius: "100%",
                        }}
                        src={previewProfile}
                      />
                    ) : null}
                    <Box
                      style={{
                        position: "absolute",
                        bottom: 10,
                        right: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <EditButton></EditButton>
                    </Box>
                  </Box>
                </label>
              </Box>

              <Box
                sx={{
                  ml: "20px",
                  mt: "-20px",
                  display: "block",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CustomTextEmpty
                    id="storeName"
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="@Nom"
                    fontSize={30}
                    inputProps={{
                      style: {
                        minWidth: 100,
                        height: 40,
                        fontSize: 30,
                        width: storeName.length * 15 + 50,
                        fontWeight: "900",
                        textAlign: "start",
                        margin: 0,
                        padding: 0,
                      },
                    }}
                  ></CustomTextEmpty>

                  <Box
                    sx={{
                      marginLeft: "10px",
                    }}
                  >
                    <EditButton
                      onClick={() =>
                        document.getElementById("storeName").focus()
                      }
                      size={"small"}
                    ></EditButton>
                  </Box>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <CustomTextEmpty
                    id="description"
                    value={storeDescription}
                    onChange={(e) => setStoreDescription(e.target.value)}
                    placeholder="Ecrivez une description"
                    inputProps={{
                      style: {
                        fontSize: 14,
                        fontWeight: "300",
                        marginTop: 0,
                        textAlign: "start",
                        minWidth: "160px",
                        width: storeDescription.length * 7,
                        height: 30,
                        padding: 0,
                        marginLeft: 2,
                      },
                    }}
                  ></CustomTextEmpty>
                  <Box
                    sx={{
                      marginLeft: "10px",
                    }}
                  >
                    <EditButton
                      onClick={() =>
                        document.getElementById("description").focus()
                      }
                      size={"small"}
                    ></EditButton>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </div>
  );
};
export default CoverCard;
