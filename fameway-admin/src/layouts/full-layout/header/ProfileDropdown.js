import React from "react";
import {
  Box,
  MenuItem,
  Typography,
  Avatar,
  Button,
  Divider,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";

import userimg from "../../../assets/images/users/user2.jpg";
import { useAuth0 } from "@auth0/auth0-react";

const ProfileDropdown = () => {
  const { user, isLoading, logout } = useAuth0();

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
              variant="h4"
              sx={{
                lineHeight: "1.235",
              }}
            >
              {user?.name}
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
