import { Box, Typography } from "@mui/material";

export const BigButton = ({
  icon,
  title,
  backgroundColor = "#222222",
  onClick,
}) => (
  <Box
    onClick={onClick}
    sx={{
      cursor: "pointer",
      backgroundColor: backgroundColor,
      flexDirection: "row",
      borderRadius: 6,
      height: 108,
      width: 300,
      display: "flex",
      alignItems: "center",
    }}
  >
    <Box
      sx={{
        display: "flex",
        pl: 3,
      }}
    >
      <Typography
        sx={{
          fontSize: 50,
        }}
      >
        {icon}
      </Typography>
    </Box>

    <Box
      sx={{
        display: "flex",
        flex: 1,
        p: 3,
      }}
    >
      <Typography
        sx={{
          color: "white",
          fontSize: 18,
          fontWeight: 800,
        }}
      >
        {title}
      </Typography>
    </Box>
  </Box>
);
