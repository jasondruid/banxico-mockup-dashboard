import { Button, Menu, MenuItem, IconButton } from "@mui/material";
import * as React from "react";
import MxFlag from "../../assets/mx-flag.png";
import EnFlag from '../../assets/en-flag.svg';

interface LanguageMenu{
    isEnglish:boolean;
    changeLanguage:Function;
}

export default function PositionedMenu({isEnglish,changeLanguage}:LanguageMenu) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton onClick={handleClick}>
        <img src={isEnglish ? EnFlag : MxFlag} style={{ height: "30px", width: "30px" }} />
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={()=>{changeLanguage(false); handleClose()}}>
          <img src={MxFlag} style={{ height: "30px", width: "30px",margin:"0px 5px 0 0" }} />
          Español
        </MenuItem>
        <MenuItem  onClick={()=>{changeLanguage(true); handleClose()}}> <img src={EnFlag} style={{ height: "30px", width: "30px",margin:"0px 5px 0 0" }} />
          English</MenuItem>
      </Menu>
    </div>
  );
}
