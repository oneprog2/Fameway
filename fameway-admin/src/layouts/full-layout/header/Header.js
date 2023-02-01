import React, { useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  Toolbar,
  Menu,
  Typography,
  Chip,
  Avatar,
  Button,
  Drawer,
} from "@mui/material";
import PropTypes from "prop-types";
// Dropdown Component
import CartDropdown from "./CartDropdown";
import MessageDropdown from "./MessageDropdown";
import NotificationDropdown from "./NotificationDropdown";
import ProfileDropdown from "./ProfileDropdown";
import CustomTextField from "../../../components/forms/custom-elements/CustomTextField";
import userimg from "../../../assets/images/users/user2.jpg";
import { useAuth0 } from "@auth0/auth0-react";
import { useGetUser, userAtom } from "../../../atoms/Atoms";
import { useAtom } from "jotai";
import LogoIcon from "../logo/LogoIcon";

const Header = ({
  sx,
  customClass,
  toggleSidebar,
  toggleMobileSidebar,
  hideSidebar,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  // 2
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  // drawer
  const [showDrawer, setShowDrawer] = useState(false);

  const handleDrawerClose = () => {
    setShowDrawer(false);
  };

  // drawer top
  const [showDrawer2, setShowDrawer2] = useState(false);

  const handleDrawerClose2 = () => {
    setShowDrawer2(false);
  };

  return (
    <AppBar sx={sx} elevation={0} className={customClass}>
      <Toolbar>
        {hideSidebar ? null : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleSidebar}
            size="large"
            sx={{
              display: {
                lg: "flex",
                xs: "none",
              },
            }}
          >
            <FeatherIcon icon="menu" />
          </IconButton>
        )}
        {!hideSidebar ? null : (
          <Box
            sx={{
              alignSelf: "flex-start",
              width: "200px",
            }}
          >
            <LogoIcon />
          </Box>
        )}
        {hideSidebar ? null : (
          <IconButton
            size="large"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileSidebar}
            sx={{
              display: {
                lg: "none",
                xs: "flex",
              },
            }}
          >
            <FeatherIcon icon="menu" width="20" height="20" />
          </IconButton>
        )}

        <Drawer
          anchor="top"
          open={showDrawer2}
          onClose={() => setShowDrawer2(false)}
          sx={{
            "& .MuiDrawer-paper": {
              padding: "15px 30px",
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <CustomTextField
              id="tb-search"
              size="small"
              placeholder="Search here"
              fullWidth
              inputProps={{ "aria-label": "Search here" }}
            />
            <Box
              sx={{
                ml: "auto",
              }}
            >
              <IconButton
                color="inherit"
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                }}
                onClick={handleDrawerClose2}
              >
                <FeatherIcon icon="x-circle" />
              </IconButton>
            </Box>
          </Box>
        </Drawer>
        {/* ------------ End Menu icon ------------- */}
        <Box flexGrow={1} />
        <Drawer
          anchor="right"
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          sx={{
            "& .MuiDrawer-paper": {
              width: {
                xs: "100%",
                sm: "395px",
              },
              padding: "30px",
            },
          }}
        >
          <Box display="flex" alignItems="center">
            <Typography variant="h4" fontWeight="500">
              Shopping Cart
            </Typography>
            <Box
              sx={{
                ml: "auto",
              }}
            >
              <IconButton
                color="inherit"
                sx={{
                  color: (theme) => theme.palette.grey.A200,
                }}
                onClick={handleDrawerClose}
              >
                <FeatherIcon icon="x-circle" />
              </IconButton>
            </Box>
          </Box>

          {/* component */}
          <CartDropdown />
        </Drawer>
        {/* ------------------------------------------- */}
        {/* End Ecommerce Dropdown */}
        {/* ------------------------------------------- */}
        {/* ------------------------------------------- */}
        {/* Messages Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl2}
          keepMounted
          open={Boolean(anchorEl2)}
          onClose={handleClose2}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          sx={{
            "& .MuiMenu-paper": {
              width: "385px",
              right: 0,
              top: "70px !important",
            },
            "& .MuiList-padding": {
              p: "30px",
            },
          }}
        >
          <Box
            sx={{
              mb: 1,
            }}
          >
            <Box display="flex" alignItems="center">
              <Typography variant="h4" fontWeight="500">
                Messages
              </Typography>
              <Box
                sx={{
                  ml: 2,
                }}
              >
                <Chip
                  size="small"
                  label="5 new"
                  sx={{
                    borderRadius: "6px",
                    pl: "5px",
                    pr: "5px",
                    backgroundColor: (theme) => theme.palette.secondary.main,
                    color: "#fff",
                  }}
                />
              </Box>
            </Box>
          </Box>
          <MessageDropdown />

          <Button
            sx={{
              mt: 2,
              display: "block",
              width: "100%",
            }}
            variant="contained"
            color="primary"
            onClick={handleClose2}
          >
            <Link
              to="/email"
              style={{
                color: "#fff",
                width: "100%",
                display: "block",
                textDecoration: "none",
              }}
            >
              See all messages
            </Link>
          </Button>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
  customClass: PropTypes.string,
  toggleSidebar: PropTypes.func,
  toggleMobileSidebar: PropTypes.func,
};

export default Header;
