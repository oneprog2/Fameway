import { Box, Typography } from "@mui/material";

export const CategoryButton = ({ title, active, onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: "pointer",
      borderRadius: "0",
      textTransform: "capitalize",
      fontWeight: active ? "700" : "500",
      fontSize: "14px",
      color: "#000",
      paddingBottom: "10px",
      borderBottom: active ? "2px solid #000" : "none",
      textDecoration: "none",
      backgroundColor: "transparent",
      "&:hover": {
        backgroundColor: "transparent",
      },
    }}
  >
    <Typography variant="h5">{title}</Typography>
  </Box>
);
