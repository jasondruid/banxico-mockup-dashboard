import * as React from "react";
import Drawer from "@mui/material/Drawer";
import LeftPanel from '../LeftPanel'


export default function TemporaryDrawer({
  isOpen,
  closeHandler,
}: {
  isOpen: boolean;
  closeHandler: Function;
}) {
  const [state, setState] = React.useState({
    left: false,
  });

  return (

        <React.Fragment>
          <Drawer
            anchor="left"
            open={isOpen}
            onClose={()=>{closeHandler()}}
          >
            <LeftPanel isDrawer={true}/>
          </Drawer>
        </React.Fragment>
  );
}
