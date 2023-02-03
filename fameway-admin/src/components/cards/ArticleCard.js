import { Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const ArticleCard = ({
  title,
  price,
  picture,
  icon,
  onClick = undefined,
  suggestion = false,
  type,
}) => {
  return (
    <Grid
      item
      xs={12}
      lg={3}
      sm={4}
      display="flex"
      sx={{ flexDirection: "column", px: 1 }}
      key={title}
    >
      <Box
        onClick={onClick}
        sx={{
          cursor: "pointer",
          p: 0,
          m: 0,
          mb: 1,
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            borderRadius: "6px",
            aspectRatio: "1/1.2",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
            backgroundColor: "#F5F5F5",
            height: "100%",
          }}
        >
          {suggestion ? (
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{
                position: "absolute",
                pt: "13px",
                pl: "17px",
              }}
            >
              Suggestion
            </Typography>
          ) : null}
          {picture ? (
            <img
              src={picture}
              srtl
              alt="img"
              height="100%"
              width="100%"
              style={{
                objectFit: "cover",
              }}
            />
          ) : icon ? (
            icon
          ) : null}
        </Box>
      </Box>
      <CardContent sx={{ px: 1, pt: 0, w: "100%" }}>
        <Typography textAlign={"center"} fontWeight={700} variant="h5">
          {title}
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          sx={{
            justifyContent: "center",
            mt: "10px",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#717171",
            }}
            textAlign={"center"}
          >
            {price} €
          </Typography>
        </Box>
      </CardContent>
    </Grid>
  );
};
