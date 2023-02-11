import { Grid, MenuItem, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CustomTextField from "../forms/custom-elements/CustomTextField";
import CoverCard from "../profile/CoverCard";
import QuillEditor from "./QuillEditor";
import FormControl from "@mui/material/FormControl";
import Autocomplete from "@mui/material/Autocomplete";

const InputRow = ({ inputName, inputSubName, input }: any) => {
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
    domainSelected,
    setDomainSelected,
    domains,
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
            borderBottom: "0.5px solid #EFEFEF",
            mb: 3,
          }}
        >
          <InputRow
            inputName={"Nom de créateur"}
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
            mt: 4,
            pb: 3,
            borderBottom: "0.5px solid #EFEFEF",
            mb: 3,
          }}
        >
          <InputRow
            inputName="Nom de ta boutique"
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

        <Box
          sx={{
            mt: 4,
            pb: 3,
            borderBottom: "0.5px solid #EFEFEF",
            mb: 3,
          }}
        >
          <InputRow
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

        <Box
          sx={{
            mt: 4,
            pb: 3,
            borderBottom: "0.5px solid #EFEFEF",
            mb: 3,
          }}
        >
          <InputRow
            inputName={"Ma catégorie"}
            input={
              <FormControl
                size="small"
                sx={{
                  width: "100%",
                  borderRadius: "16px",
                  border: 0,
                }}
              >
                <Autocomplete
                  size="small"
                  id="combo-box-demo"
                  options={domains.map((item) => (item.label = item.name))}
                  onChange={(event, newValue) => {
                    setDomainSelected(newValue);
                  }}
                  value={domainSelected}
                  renderInput={(params) => (
                    <CustomTextField fullWidth size={"small"} {...params} />
                  )}
                  renderOption={(props, option, state) => {
                    const icon = domains?.find(
                      (item) => item.name === option
                    )?.icon;

                    return (
                      <MenuItem
                        sx={{
                          width: "100%",
                        }}
                        {...props}
                      >
                        <img
                          alt={option}
                          style={{
                            height: 20,
                            width: 20,
                            objectFit: "cover",
                            marginRight: 10,
                          }}
                          src={icon ? icon : "https://via.placeholder.com/150"}
                        />
                        <Typography
                          variant="h6"
                          sx={{
                            fontSize: 16,
                            color: "#222222",
                            margin: 0,
                            padding: 0,
                          }}
                        >
                          {option}
                        </Typography>
                      </MenuItem>
                    );
                  }}
                />
              </FormControl>
            }
          />
        </Box>
      </Box>
    </>
  );
};
