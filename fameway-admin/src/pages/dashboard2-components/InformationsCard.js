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
  centerAll,
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

      borderColor: borderColor,
      borderWidth: 3,
      borderStyle: "solid",

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
            textAlign: alignTitle,
            fontSize: 40,
            mb: -2,
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
