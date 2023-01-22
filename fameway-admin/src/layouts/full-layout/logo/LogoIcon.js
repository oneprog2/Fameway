import { Box } from "@mui/system";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ReactComponent as LogoDark } from "../../../assets/images/logos/logo-dark.svg";
import { ReactComponent as LogoLight } from "../../../assets/images/logos/logo-white.svg";

const LogoIcon = () => {
  const customizer = useSelector((state) => state.CustomizerReducer);
  return (
    <Link underline="none" to="/">
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          width: "80%",
          height: "80%",
        }}
      >
        {customizer.activeMode !== "dark" ? <LogoLight /> : <LogoDark />}
      </Box>
    </Link>
  );
};

export default LogoIcon;
