import { lazy } from "react";

// project import
import MinimalLayout from "../layout/MinimalLayout";
import Loadable from "../components/Loadable";

// render - login
const AuthLogin = Loadable(lazy(() => import("../pages/Login")));
// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />,
    },
  ],
};

export default LoginRoutes;
