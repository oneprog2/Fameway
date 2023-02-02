import React from "react";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const CustomFormLabel = styled((props) => (
  <Typography
    variant="h5"
    {...props}
    sx={{
      fontWeight: "bold",
    }}
    component="label"
    htmlFor={props.htmlFor}
  />
))(() => ({
  marginBottom: "10px",
  marginTop: "15px",
  display: "block",
}));

export default CustomFormLabel;
