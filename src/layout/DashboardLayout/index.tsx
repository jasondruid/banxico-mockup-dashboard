import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import isAuth from "../../hooks/isAuth";
import { Box } from "@mui/material";
import Appbar from "./Appbar";
import LeftPanel from "./LeftPanel";
import { FormPrompt } from "../../hooks/useUnsavedChangedWarning";
import { useCustomSelector } from "../../hooks/redux";

const DashboardLayout = () => {
  const authCheck = isAuth();
  const navigate = useNavigate();

  const { visualizations, initialVisualizations } = useCustomSelector(
    (state) => state.visualizations
  );
  const form = FormPrompt({
    hasUnsavedChanges: visualizations !== initialVisualizations,
  });

  useEffect(() => {
    if (!authCheck) navigate("/");
  }, [authCheck]);

  !authCheck && <></>;

  return (
    <Box sx={{ display: "flex", height: "100%", width: "100%" }}>
      <LeftPanel isDrawer={false} />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Appbar />
        <Box
          sx={{
            p: { xs: 1, sm: 4 },
            pt: { xs: "116px", sm: "116px" },
            width: "100%",
            height: "100%",
          }}
          role="containers"
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};
export default DashboardLayout;
