import { Box } from "@mui/material";
import FeatherIcon from "feather-icons-react";

export const DeleteButton = ({ onClick, size }) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: "pointer",
      backgroundColor: "#f21400",
      height: size === "small" ? 20 : 25,
      width: size === "small" ? 20 : 25,
      borderRadius: "6px",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      paddingLeft: "1px",
    }}
  >
    <FeatherIcon color="white" size={size === "small" ? 12 : 18} icon={"x"} />
  </Box>
);
