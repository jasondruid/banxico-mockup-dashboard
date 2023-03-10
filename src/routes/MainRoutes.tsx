import { lazy } from "react";

// project import
import DashboardLayout from "../layout/DashboardLayout";
import Loadable from "../components/Loadable";

// render - login
const DashboardMain = Loadable(lazy(() => import("../pages/Home")));
// ==============================|| AUTH ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: <DashboardLayout/>,
  children: [
    {
      path: "/dashboard/home",
      element: <DashboardMain />,
    },
  ],
};

export default MainRoutes;
