import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Box, Typography } from "@mui/material";
import { AccountCircleRounded } from "@mui/icons-material";
import { useCustomDispatch } from "../../../../hooks/redux";
import { IsActual } from "../../../../redux/slices/visualizations";
import { onLogout } from "../../../../redux/slices/auth";

export default function Index() {
    const dispatch = useCustomDispatch();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutFunction = ()=>{

    dispatch(IsActual());
    dispatch(onLogout());

    setAnchorEl(null);
  }

  return (
    <>
      <Box
        id="demo-positioned-button"
        aria-controls={open ? "demo-positioned-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        sx={{cursor:"pointer"}}
      >
        <Box
          sx={{
            borderRadius: "8px",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <AccountCircleRounded sx={{ fontSize: "40px" }} />
          <Typography sx={{ textAlign: "center", my: "auto", ml: 2 }}>
            John Doe
          </Typography>
        </Box>
      </Box>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={logoutFunction}>Logout</MenuItem>
      </Menu>
    </>
  );
}
