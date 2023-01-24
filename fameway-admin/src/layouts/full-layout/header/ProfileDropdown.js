import React from "react";
import { Box, Typography } from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { userAtom } from "../../../atoms/Atoms";
import { useAtom } from "jotai";

const ProfileDropdown = () => {
  const [currentUser] = useAtom(userAtom);

  return (
    <Box>
      <Box>
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              width: "90px",
              height: "90px",
              borderRadius: "100%",
              backgroundColor: "#000000",
            }}
            style={{
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <FeatherIcon icon="user" width="40" height="40" color="white" />
          </Box>
          <Box
            sx={{
              ml: 2,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                lineHeight: "1.235",
              }}
            >
              {currentUser?.username}
            </Typography>
            <Typography color="textSecondary" variant="h6" fontWeight="400">
              Créateur
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileDropdown;
