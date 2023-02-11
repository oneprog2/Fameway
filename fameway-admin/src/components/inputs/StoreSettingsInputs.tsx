import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTextField from "../forms/custom-elements/CustomTextField";
import CoverCard from "../profile/CoverCard";
import QuillEditor from "./QuillEditor";

const InputRow = ({ data, setData, inputName, inputSubName, input }: any) => {
  return (
    <Grid
      sx={{
        width: "100%",
        flexDirection: {
          xs: "column",
          sm: "column",
          md: "row",
        },
      }}
      lg={12}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: {
            xs: "column",
            sm: "column",
            md: "row",
          },
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
              width: {
                sm: "100%",
                md: "40%",
              },
            }}
          >
            <Typography
              sx={{
                mb: 2,
                fontWeight: "bold",
              }}
              variant="h4"
            >
              {inputName}
            </Typography>
            {inputSubName ? (
              <Typography
                sx={{
                  mb: 3,
                  fontWeight: "regular",
                }}
                variant="h6"
              >
                {inputSubName}
              </Typography>
            ) : null}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flex: 1,
          }}
        >
          {input}
        </Box>
      </Box>
    </Grid>
  );
};

export const StoreSettingsInputs = (props: any) => {
  const {
    username,
    setUsername,
    storeName,
    setStoreName,
    storeDescription,
    setStoreDescription,
    bannerFile,
    setBannerFile,
    profileFile,
    setProfileFile,
  } = props;

  return (
    <>
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
          px: {
            md: 3,
          },
        }}
      >
        <Box
          sx={{
            mt: 4,
            pb: 3,
            borderBottom: "1px solid #E5E5E5",
            mb: 3,
          }}
        >
          <InputRow
            data={username}
            setData={setUsername}
            inputName={"Nom de créateur*"}
            input={
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
            }
          />
        </Box>

        <Box
          sx={{
            pb: 3,
            borderBottom: "1px solid #E5E5E5",
            mb: 3,
          }}
        >
          <InputRow
            data={storeName}
            setData={setStoreName}
            inputName="Nom de ta boutique*"
            input={
              <CustomTextField
                id="default-value"
                variant="outlined"
                defaultValue=""
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                placeholder="Nom de créateur..."
                fullWidth
                size="small"
              />
            }
          />
        </Box>

        <InputRow
          data={storeDescription}
          setData={setStoreDescription}
          inputName={"Description de la boutique"}
          input={
            <QuillEditor
              value={storeDescription}
              onChange={setStoreDescription}
              placeholder="Description de l'article..."
            />
          }
        />
      </Box>
    </>
  );
};
