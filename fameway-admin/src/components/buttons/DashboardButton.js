import React from "react";
import { Card, CardContent, Typography, Fab, Box, Link } from "@mui/material";

import FeatherIcon from "feather-icons-react";

const DashboardButton = ({ title, icon, onClick, bgColor, textColor }) => (
  <Card
    onClick={onClick}
    sx={{
      cursor: "pointer",
      backgroundColor: bgColor,
      flex: 0.5,
      position: "relative",
      "&:before": {
        content: `""`,
        position: "absolute",
        left: (theme) => `${theme.direction === "rtl" ? "unset" : "0"}`,
        right: (theme) => `${theme.direction === "rtl" ? "0" : "unset"}`,
        width: "100%",
        height: "100%",
        transform: (theme) =>
          `${theme.direction === "rtl" ? "scaleX(-1)" : "unset"}`,
      },
    }}
  >
    <CardContent>
      <Box
        sx={{
          p: 1,
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Typography
            color="white"
            sx={{
              fontSize: 50,
            }}
            fontWeight="700"
          >
            {icon}
          </Typography>
        </Box>
        <Box>
          <Typography
            color={textColor}
            variant="h4"
            fontWeight="700"
            sx={{
              fontSize: 25,
            }}
          >
            {title}
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default DashboardButton;
