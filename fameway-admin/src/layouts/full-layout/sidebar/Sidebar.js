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
import Scrollbar from "../../../components/custom-scroll/Scrollbar";
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
              width: "40px",
              height: "40px",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              backgroundColor: "#000000",
            }}
          >
            <FeatherIcon icon="user" width="20" height="20" color="white" />
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
                      disableTouchRipple
                      button
                      component="li"
                      onClick={() => handleClick(index)}
                      selected={pathWithoutLastPart === item.href}
                      sx={{
                        backgroundColor: "white !important",
                        ...(pathWithoutLastPart === item.href && {
                          color: "red",
                          backgroundColor: "white !important",
                        }),
                      }}
                    >
                      <Box
                        sx={{
                          flex: 1,
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            mt: "6.5px",
                            backgroundColor: "white",
                            ...(pathWithoutLastPart === item.href && {
                              color: "white",
                            }),
                          }}
                        >
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon>
                        <ListItemText
                          sx={{
                            mb: 1,
                          }}
                        >
                          {item.title}
                        </ListItemText>
                        <Box
                          sx={{
                            mt: "7.5px",
                            justifyContent: "end",
                            width: "100%",
                            flex: 1,
                            display: "flex",
                          }}
                        >
                          {index === open ||
                          pathWithoutLastPart === item.href ? (
                            <FeatherIcon icon="chevron-down" size="16" />
                          ) : (
                            <FeatherIcon icon="chevron-right" size="16" />
                          )}
                        </Box>
                      </Box>
                    </ListItem>

                    <Collapse in={index === open} timeout="auto" unmountOnExit>
                      <List
                        component="li"
                        sx={{
                          mb: 1,
                          mt: -2,
                        }}
                      >
                        {item.children.map((child) => {
                          return (
                            <ListItem
                              disableTouchRipple
                              key={child.title}
                              button
                              component={NavLink}
                              to={child.href}
                              onClick={onSidebarClose}
                              selected={pathDirect === child.href}
                              sx={{
                                marginLeft: 2,
                                backgroundColor: "white !important",
                                ...(pathDirect === child.href && {
                                  color: "#222222",
                                  backgroundColor: "white !important",
                                }),
                              }}
                            >
                              <Box
                                sx={{
                                  flexDirection: "row",
                                  display: "flex",
                                  justifyContent: "center",
                                }}
                              >
                                <ListItemIcon
                                  sx={{
                                    svg: { width: "14px", marginLeft: "3px" },
                                    mt: "6.5px",
                                    p: 0,
                                    mr: 1,
                                    minWidth: "auto",
                                    ...(pathDirect === child.href && {
                                      color: "#222222",
                                    }),
                                  }}
                                >
                                  <FeatherIcon
                                    icon={child.icon}
                                    width="20"
                                    height="20"
                                  />
                                </ListItemIcon>

                                <ListItemText>
                                  {child.title}
                                  <Box
                                    sx={{
                                      borderBottomWidth: "3px",
                                      borderBottomStyle: "solid",
                                      borderBottomColor: "transparent",
                                      ...(pathDirect === child.href && {
                                        borderBottomColor: "#ffd028",
                                        mt: 0,
                                      }),
                                    }}
                                  ></Box>
                                </ListItemText>
                              </Box>
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
                      disableTouchRipple
                      onClick={() => handleClick(index)}
                      button
                      // component={NavLink}
                      to={item.href}
                      selected={pathDirect === item.href}
                      sx={{
                        pb: 0,
                        backgroundColor: "white !important",
                        ...(pathDirect === item.href && {
                          color: "#222222",
                          backgroundColor: "white !important",
                        }),
                      }}
                    >
                      <Box
                        sx={{
                          flexDirection: "row",
                          display: "flex",
                          justifyContent: "center",
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            mt: "6.5px",
                            ...(pathDirect === item.href && {
                              color: "#222222",
                            }),
                          }}
                        >
                          <FeatherIcon
                            icon={item.icon}
                            width="20"
                            height="20"
                          />
                        </ListItemIcon>
                        <ListItemText
                          onClick={onSidebarClose}
                          primaryTypographyProps={{
                            ...(pathDirect === item.href && {
                              fontWeight: "800",
                            }),
                          }}
                          sx={{
                            flex: 1,
                            ...(pathDirect === item.href && {
                              color: "#222222",
                              fontWeight: "bold",
                            }),
                          }}
                        >
                          {item.title}
                          <Box
                            sx={{
                              borderBottomWidth: "3px",
                              borderBottomStyle: "solid",
                              borderBottomColor: "transparent",
                              mt: 1,
                              ...(pathDirect === item.href && {
                                borderBottomColor: "#ffd028",
                                mt: 1,
                              }),
                            }}
                          ></Box>
                        </ListItemText>
                      </Box>
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

export default Sidebar;
