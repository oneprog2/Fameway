import React from "react";
import { Card, CardContent } from "@mui/material";
import onboardingVideo from "../../assets/images/backgrounds/onboardingVideo.png";

const OnboardingVideoCard = () => (
  <Card
    elevation={0}
    sx={{
      position: "relative",
      cursor: "pointer",
      backgroundColor: (theme) =>
        `${theme.palette.mode === "dark" ? "#32363e" : ""}`,
      "&:before": {
        content: `""`,
        position: "absolute",
        left: (theme) => `${theme.direction === "rtl" ? "unset" : "0"}`,
        right: (theme) => `${theme.direction === "rtl" ? "0" : "unset"}`,
        width: "100%",
        height: "100%",
      },
      background: `url(${onboardingVideo})`,

      backgroundSize: "cover",
      backgroundPosition: "center",

      minHeight: 227,
    }}
  >
    <CardContent></CardContent>
  </Card>
);

export default OnboardingVideoCard;
