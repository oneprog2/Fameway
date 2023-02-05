import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Fab,
  Button,
  Stepper,
  Step,
  StepLabel,
  StepButton,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import imgsvg from "../../assets/images/backgrounds/welcome-bg-2x-svg.svg";

const OnboardingCard = ({ steps }) => (
  <Card
    elevation={0}
    sx={{
      position: "relative",
      backgroundColor: (theme) =>
        `${theme.palette.mode === "dark" ? "#32363e" : ""}`,
      minHeight: 400,
    }}
  >
    <Stepper activeStep={1}>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{label}</StepLabel>
        </Step>
      ))}
    </Stepper>
  </Card>
);

export default OnboardingCard;
