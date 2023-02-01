import React from "react";
import { Grid, Typography, Box, Breadcrumbs, Link } from "@mui/material";
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const Breadcrumb = ({ subtitle, username, items, title, children }) => (
  <Grid
    container
    sx={{
      py: "15px",
    }}
  >
    <Grid item xs={12} sm={12} lg={12}>
      <Box
        style={{
          flexDirection: "row",
          display: "flex",
          marginBottom: 3,
        }}
      >
        {subtitle ? (
          <Typography
            style={{
              marginRight: "3px",
            }}
            color="black"
            fontWeight="300"
            variant="h5"
          >
            {subtitle}
          </Typography>
        ) : null}
        {username ? (
          <Typography color="black" fontWeight="700" variant="h5">
            {username?.charAt(0).toUpperCase() + username?.slice(1)},
          </Typography>
        ) : null}
      </Box>

      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {items
          ? items.map((item) => (
              <div key={item.title}>
                {item.to ? (
                  <Link
                    underline="none"
                    color="inherit"
                    component={NavLink}
                    to={item.to}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <Typography color="textPrimary">{item.title}</Typography>
                )}
              </div>
            ))
          : ""}
      </Breadcrumbs>
      <Typography
        fontWeight="700"
        variant="h1"
        sx={{
          lineHeight: "1.235",
          marginTop: 1,
        }}
      >
        {title}
      </Typography>
    </Grid>
    <Grid item xs={12} sm={6} lg={4} display="flex" alignItems="flex-end">
      <Box
        sx={{
          display: { xs: "none", md: "block", lg: "flex" },
          alignItems: "center",
          justifyContent: "flex-end",
          width: "100%",
        }}
      >
        {children}
      </Box>
    </Grid>
  </Grid>
);

Breadcrumb.propTypes = {
  subtitle: PropTypes.string,
  items: PropTypes.array,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Breadcrumb;
