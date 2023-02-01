import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Fab,
  Box,
  Link,
  Button,
} from "@mui/material";

import FeatherIcon from "feather-icons-react";

const InformationsCard = ({
  title,
  alignTitle,
  description,
  onClick,
  borderColor,
  textColor,
  buttonTitle,
  withoutButton,
}) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: "pointer",
      position: "relative",
      "&:before": {
        content: `""`,
        position: "absolute",
        width: "100%",
        height: "100%",
      },

      textAlign: "left",

      flex: 1,
      minHeight: 195,
    }}
  >
    <CardContent
      sx={{
        p: 0,
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box>
        <Typography
          color={textColor}
          variant="h4"
          fontWeight="700"
          textAlign={"left"}
          sx={{
            textAlign: "left",
            fontSize: 40,
            mb: -3,
            ml: description ? 2 : 0,
          }}
        >
          {title}
        </Typography>
      </Box>

      <Box
        sx={{
          flex: 1,
          px: 2,
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography
          color={textColor}
          variant="h4"
          fontWeight="300"
          textAlign={"left"}
          sx={{
            textAlign: "left",
            fontSize: 18,
            mt: {
              xs: 4,
              sm: 4,
              md: 4,
              lg: withoutButton ? 4 : 0,
              xl: withoutButton ? 4 : 0,
            },
            mb: {
              xs: withoutButton ? 0 : 4,
              sm: withoutButton ? 0 : 4,
              md: withoutButton ? 0 : 4,
              lg: 0,
              xl: 0,
            },
          }}
        >
          {description}
        </Typography>
      </Box>

      <Box
        sx={{
          ml: 1,
        }}
      >
        {buttonTitle ? (
          <Button
            color="primary"
            variant="contained"
            sx={{
              fontWeight: "700",
              borderRadius: "100px",
            }}
          >
            <FeatherIcon icon="plus" width="20" />
            <Typography
              variant="button"
              color="white"
              fontWeight={600}
              sx={{
                marginLeft: 1,
              }}
            >
              {buttonTitle}
            </Typography>
          </Button>
        ) : null}
      </Box>
    </CardContent>
  </Card>
);

export default InformationsCard;
