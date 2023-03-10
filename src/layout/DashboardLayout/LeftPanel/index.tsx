import { Box, Typography } from "@mui/material";
import React from "react";
import LogoIcon from "../../../assets/logoIcon.png";
import { Link } from "react-router-dom";
import { AccountCircleRounded } from "@mui/icons-material";
import Leftnav from "./Leftnav";

const index = ({ isDrawer=false }: { isDrawer: boolean }) => {
  return (
    <Box
      sx={{
        minWidth: "278px",
        height: "100%",
        borderRight: "2px dashed rgba(145, 158, 171, 0.12)",
        display: { xs: isDrawer ? "block" : "none", lg: "block" },
      }}
    >
      <Link to="/dashboard/home">
        <Box sx={{ px: "20px", py: 3, height: "88px" }}>
          <img style={{ width: "40px", height: "40px" }} src={LogoIcon} />
        </Box>
      </Link>
      <Box sx={{ mx: "20px", mb: 5 }}>
        <Box
          sx={{
            borderRadius: "8px",
            padding: "16px 20px",
            backgroundColor: "#EDEFF2",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <AccountCircleRounded sx={{ fontSize: "40px" }} />
          <Typography sx={{ textAlign: "center", my: "auto", ml: 3 }}>
            John Doe
          </Typography>
        </Box>
      </Box>
      <Leftnav />
    </Box>
  );
};

export default index;
