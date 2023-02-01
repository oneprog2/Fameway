import React from "react";
import { Card, CardContent, Typography, Box, Fab, Button } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import imgsvg from "../../assets/images/backgrounds/welcome-bg-2x-svg.svg";

const OnboardingCard = () => (
  <Card
    elevation={0}
    sx={{
      position: "relative",
      backgroundColor: (theme) =>
        `${theme.palette.mode === "dark" ? "#32363e" : ""}`,
      minHeight: 400,
    }}
  >
    <CardContent></CardContent>
  </Card>
);

export default OnboardingCard;
