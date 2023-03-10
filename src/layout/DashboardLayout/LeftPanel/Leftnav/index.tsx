import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Analytics } from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const links = [
  {
    name: "Dashboard",
    link: "/dashboard/home",
    icon: Analytics,
  },
];

export default function BasicList() {
  return (
    <Box sx={{ width: "100%" }}>
      <nav aria-label="main mailbox folders">
        <List>
          {links.map((item) => (
            <NavLink to="/dashboard/home" key={item.link} >
              <ListItem disablePadding sx={{ height: "48px" }}>
                <ListItemButton
                  sx={{ px: "0", height: "48px", mr: 2, borderRadius: "5px" }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: "56px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <SvgIcon component={Analytics} sx={{ fontSize: "30px" }} />
                  </ListItemIcon>
                  <Typography className="navlink-item">{item.name}</Typography>
                </ListItemButton>
              </ListItem>
            </NavLink>
          ))}
        </List>
      </nav>
    </Box>
  );
}
