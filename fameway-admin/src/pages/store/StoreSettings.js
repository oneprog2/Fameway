import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Typography } from "@mui/material";
import Breadcrumb from "../../layouts/full-layout/breadcrumb/Breadcrumb";
import PageContainer from "../../components/container/PageContainer";
import CoverCard from "../../components/profile/CoverCard";
import { userAtom } from "../../atoms/Atoms";
import { useAtom } from "jotai";
import { useMutation, useQuery } from "@apollo/client";
import { STORE_DATA } from "../../api/queries";
import { handleUpload } from "../../components/aws/UploadToS3";
import { UPDATE_STORE } from "../../api/mutations";
import { CategoryButton } from "../../components/buttons/CategoryButton";
import QuillEditor from "../../components/inputs/QuillEditor";
import CustomTextField from "../../components/forms/custom-elements/CustomTextField";

const DescriptionInput = ({ storeDescription, setStoreDescription }) => {
  return (
    <Grid lg={12}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
            }}
          >
            <Typography
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
              variant="h5"
            >
              Ma description
            </Typography>
            <Typography fontWeight={"regular"} variant="h6">
              Seul le texte qui apparaît en gras sera visible dans son
              intégralité. Le reste sera visible sur votre compte en cliquant
              sur “lire plus”.
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <QuillEditor
            value={storeDescription}
            onChange={setStoreDescription}
            placeholder="Description de l'article..."
          />
        </Box>
      </Box>
    </Grid>
  );
};

const UsernameInput = ({ username, setUsername }) => {
  return (
    <Grid
      sx={{
        width: "100%",
      }}
      lg={12}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
            }}
          >
            <Typography
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
              variant="h5"
            >
              Nom de créateur
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <CustomTextField
            id="default-value"
            variant="outlined"
            defaultValue=""
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Nom de créateur..."
            fullWidth
            size="small"
          />
        </Box>
      </Box>
    </Grid>
  );
};

const StoreNameInput = ({ storeName, setStoreName }) => {
  return (
    <Grid
      sx={{
        width: "100%",
      }}
      lg={12}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              width: "40%",
            }}
          >
            <Typography
              sx={{
                mb: 1,
                fontWeight: "bold",
              }}
              variant="h5"
            >
              Nom de ma boutique
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          <CustomTextField
            id="default-value"
            variant="outlined"
            defaultValue=""
            value={storeName}
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Nom de ma boutique..."
            fullWidth
            size="small"
          />
        </Box>
      </Box>
    </Grid>
  );
};

const StoreSettings = () => {
  const [currentUser] = useAtom(userAtom);

  const { data, error, loading } = useQuery(STORE_DATA, {
    variables: { storeID: currentUser?.storeID },
    fetchPolicy: "network-only",
  });

  const [storeName, setStoreName] = React.useState(undefined);

  const [category, setCategory] = useState("Personnalisation");

  const [username, setUsername] = React.useState(currentUser?.username);
  const [storeDescription, setStoreDescription] = React.useState("");
  const [mutationLoading, setMutationLoading] = React.useState(false);
  const [loadData, setLoadData] = React.useState(false);

  useEffect(() => {
    setLoadData(true);
    if (data?.store_by_pk) {
      setStoreName(data?.store_by_pk?.name);
      setStoreDescription(data?.store_by_pk?.description);
      setProfileFile(data?.store_by_pk?.profilePicture);
      setBannerFile(data?.store_by_pk?.bannerPicture);
      setLoadData(false);
    }
  }, [data, loading]);
  const [bannerFile, setBannerFile] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  const [updateStore, { storeError }] = useMutation(UPDATE_STORE);

  if (loading || loadData) return <div>Chargement ...</div>;
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
    }).then(() => {
      window.location.href = "/store/settings";
    });

    setMutationLoading(false);
  };

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
                title: "Boutique",
              },
              {
                title: "Apparence",
              },
            ]}
            title={`Depuis cette page, modifie l'apparence de ta boutique.`}
          ></Breadcrumb>
        </Box>
      </Box>
      <Grid lg={12}>
        <Grid
          sx={{
            px: 1,
            mb: 6,
            width: "100%",
          }}
          container
          lg={12}
        >
          <CategoryButton
            onClick={() => setCategory("Personnalisation")}
            title="Personnalisation"
            active={category === "Personnalisation" ? true : false}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              marginLeft: 4,
            }}
          >
            <CategoryButton
              onClick={() => setCategory("Paramètres")}
              title="Paramètres"
              active={category === "Paramètres" ? true : false}
            />
          </Box>
        </Grid>

        <CoverCard
          username={username}
          storeName={storeName}
          storeDescription={storeDescription}
          bannerFile={bannerFile}
          setBannerFile={setBannerFile}
          profileFile={profileFile}
          setProfileFile={setProfileFile}
        />

        <Box
          sx={{
            mt: 4,
            pb: 3,
            borderBottom: "1px solid #E5E5E5",
            mb: 3,
          }}
        >
          <UsernameInput username={username} setUsername={setUsername} />
        </Box>
        <Box
          sx={{
            pb: 3,
            borderBottom: "1px solid #E5E5E5",
            mb: 3,
          }}
        >
          <StoreNameInput storeName={storeName} setStoreName={setStoreName} />
        </Box>

        <DescriptionInput
          description={storeDescription}
          setStoreDescription={setStoreDescription}
        />

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
            onClick={handleStoreUpdate}
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

export default StoreSettings;
