import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { AccountCircleRounded, Menu } from "@mui/icons-material";
import TemporaryDrawer from "../Drawer";
import MenuUser from './MenuUser';

export default function ButtonAppBar() {
  const [openDrawer, setOpenDrawer] = React.useState(false);

  return (
    <Box>
      <TemporaryDrawer isOpen={openDrawer} closeHandler={()=>{setOpenDrawer(false)}} />
      <AppBar
        position="fixed"
        sx={{
          width: { xs: "100%", lg: "calc(100% - 278px)" },
          backgroundColor: "rgba(249, 250, 251, 0.8)",
        }}
      >
        <Toolbar sx={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2, display: { xs: "flex", lg: "none" } }}
            onClick={()=>{setOpenDrawer(true)}}
          >
            <Menu />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
<MenuUser/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
