import { Box } from "@mui/material";
import FeatherIcon from "feather-icons-react";

export const EditButton = ({ onClick, size }) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: "pointer",
      backgroundColor: "#ffce00",
      height: size === "small" ? 20 : 25,
      width: size === "small" ? 20 : 25,
      borderRadius: "6px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
    }}
  >
    <FeatherIcon size={size === "small" ? 12 : 18} icon={"edit-2"} />
  </Box>
);
