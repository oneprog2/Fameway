import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full-layout/loadable/Loadable";

/* ***Layouts**** */
const FullLayout = Loadable(
  lazy(() => import("../layouts/full-layout/FullLayout"))
);
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank-layout/BlankLayout"))
);
/* ***End Layouts**** */

// const Register = Loadable(
//   lazy(() => import("../pages/authentication/Register"))
// );

const Error = Loadable(lazy(() => import("../pages/authentication/Error")));

const Dashboard = Loadable(lazy(() => import("../pages/dashboard/Dashboard")));

const FirstOpening = Loadable(
  lazy(() => import("../pages/firstOpening/DefaultStore"))
);

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/dashboard/starter" /> },
      { path: "/dashboard/starter", exact: true, element: <Dashboard /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/auth",
    element: <BlankLayout />,
    children: [
      { path: "404", element: <Error /> },
      { path: "*", element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: "/setup",
    element: <FullLayout hideSidebar={true} />,
    children: [{ path: "store", element: <FirstOpening /> }],
  },
];

export default Router;
