import React from "react";
import { useLocation } from "react-router";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Box,
  Drawer,
  useMediaQuery,
  List,
  Typography,
  ListItem,
  Collapse,
  ListItemIcon,
  ListItemText,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import FeatherIcon from "feather-icons-react";
import { SidebarWidth } from "../../../assets/global/Theme-variable";
import LogoIcon from "../logo/LogoIcon";
import Menuitems from "./Menuitems";
import Buynow from "./Buynow";
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
import ProfileDropdown from "../header/ProfileDropdown";
import { useAuth0 } from "@auth0/auth0-react";
import { userAtom } from "../../../atoms/Atoms";
import { useAtom } from "jotai";

const Profile = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);
  const { user, isLoading, logout } = useAuth0();
  const [currentUser] = useAtom(userAtom);

  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  return (
    <Box
      sx={{
        marginBottom: 5,
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        display: "flex",
      }}
    >
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Box
            sx={{
              borderRadius: "100%",
              width: "30px",
              height: "30px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              backgroundColor: "#000000",
            }}
          >
            <FeatherIcon icon="user" width="15" height="15" color="white" />
          </Box>
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              variant="h4"
              fontWeight="400"
              sx={{ ml: 1.5 }}
              color={"black"}
            >
              Hello,
            </Typography>
            <Typography
              variant="h4"
              fontWeight="700"
              color="black"
              sx={{
                ml: 0.5,
                mr: 1,
              }}
            >
              {currentUser?.username?.charAt(0).toUpperCase() +
                currentUser?.username?.slice(1)}
            </Typography>
            <FeatherIcon
              color="black"
              icon="chevron-down"
              width="20"
              height="20"
            />
          </Box>
        </Box>
      </Button>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={
          {
            // "& .MuiMenu-paper": {
            //   bottom: "40px",
            // },
            // "& .MuiList-padding": {
            //   bottom: "30px",
            // },
            // bottom: 300,
          }
        }
      >
        <MenuItem
          onClick={() => {
            logout();
          }}
        >
          Déconnexion
        </MenuItem>
      </Menu>
    </Box>
  );
};

const Sidebar = ({ isMobileSidebarOpen, onSidebarClose, isSidebarOpen }) => {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  const pathDirect = pathname;
  const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf("/"));
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up("lg"));

  const handleClick = (index) => {
    if (open === index) {
      setOpen((prevopen) => !prevopen);
    } else {
      setOpen(index);
    }
  };

  const SidebarContent = (
    <Scrollbar style={{ height: "calc(100vh - 5px)" }}>
      <Box sx={{ p: 2 }}>
        <LogoIcon />
        <Box
          sx={{
            mt: 5,
          }}
        >
          <List>
            {Menuitems.map((item, index) => {
              // {/********SubHeader**********/}
              if (item.subheader) {
                return (
                  <li key={item.subheader}>
                    <Typography
                      variant="subtitle2"
                      fontWeight="500"
                      sx={{ my: 2, mt: 4, opacity: "0.4" }}
                    >
                      {item.subheader}
                    </Typography>
                  </li>
                );
                // {/********If Sub Menu**********/}
                /* eslint no-else-return: "off" */
              } else if (item.children) {
                return (
                  <React.Fragment key={item.title}>
                    <ListItem
                      button
                      component="li"
                      onClick={() => handleClick(index)}
                      selected={pathWithoutLastPart === item.href}
                      sx={{
                        mb: 1,
                        ...(pathWithoutLastPart === item.href && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(pathWithoutLastPart === item.href && {
                            color: "white",
                          }),
                        }}
                      >
                        <FeatherIcon icon={item.icon} width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText>{item.title}</ListItemText>
                      {index === open || pathWithoutLastPart === item.href ? (
                        <FeatherIcon icon="chevron-down" size="16" />
                      ) : (
                        <FeatherIcon icon="chevron-right" size="16" />
                      )}
                    </ListItem>
                    <Collapse in={index === open} timeout="auto" unmountOnExit>
                      <List component="li" disablePadding>
                        {item.children.map((child) => {
                          return (
                            <ListItem
                              key={child.title}
                              button
                              component={NavLink}
                              to={child.href}
                              onClick={onSidebarClose}
                              selected={pathDirect === child.href}
                              sx={{
                                mb: 1,
                                ...(pathDirect === child.href && {
                                  color: "primary.main",
                                  backgroundColor: "transparent!important",
                                }),
                              }}
                            >
                              <ListItemIcon
                                sx={{
                                  svg: { width: "14px", marginLeft: "3px" },
                                  ...(pathDirect === child.href && {
                                    color: "primary.main",
                                  }),
                                }}
                              >
                                <FeatherIcon
                                  icon={child.icon}
                                  width="20"
                                  height="20"
                                />
                              </ListItemIcon>
                              <ListItemText>{child.title}</ListItemText>
                            </ListItem>
                          );
                        })}
                      </List>
                    </Collapse>
                  </React.Fragment>
                );
                // {/********If Sub No Menu**********/}
              } else {
                return (
                  <List component="li" disablePadding key={item.title}>
                    <ListItem
                      onClick={() => handleClick(index)}
                      button
                      component={NavLink}
                      to={item.href}
                      selected={pathDirect === item.href}
                      sx={{
                        mb: 1,
                        ...(pathDirect === item.href && {
                          color: "white",
                          backgroundColor: (theme) =>
                            `${theme.palette.primary.main}!important`,
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          ...(pathDirect === item.href && { color: "white" }),
                        }}
                      >
                        <FeatherIcon icon={item.icon} width="20" height="20" />
                      </ListItemIcon>
                      <ListItemText onClick={onSidebarClose}>
                        {item.title}
                      </ListItemText>
                    </ListItem>
                  </List>
                );
              }
            })}
          </List>
        </Box>
      </Box>
    </Scrollbar>
  );
  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open={isSidebarOpen}
        variant="persistent"
        PaperProps={{
          sx: {
            width: SidebarWidth,
            border: "0 !important",
            boxShadow: "0px 7px 30px 0px rgb(113 122 131 / 11%)",
          },
        }}
      >
        {SidebarContent}
        <Profile />
      </Drawer>
    );
  }
  return (
    <Drawer
      anchor="left"
      open={isMobileSidebarOpen}
      onClose={onSidebarClose}
      PaperProps={{
        sx: {
          width: SidebarWidth,
          border: "0 !important",
        },
      }}
      variant="temporary"
    >
      {/* {SidebarContent} */}
      {/* <Profile /> */}
    </Drawer>
  );
};

Sidebar.propTypes = {
  isMobileSidebarOpen: PropTypes.bool,
  onSidebarClose: PropTypes.func,
  isSidebarOpen: PropTypes.bool,
};

export default Sidebar;
