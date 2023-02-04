import React, { lazy } from "react";
import { Navigate } from "react-router-dom";
import Loadable from "../layouts/full-layout/loadable/Loadable";

const FullLayout = Loadable(
  lazy(() => import("../layouts/full-layout/FullLayout"))
);
const BlankLayout = Loadable(
  lazy(() => import("../layouts/blank-layout/BlankLayout"))
);

const Error = Loadable(lazy(() => import("../pages/authentication/Error")));

const Dashboard = Loadable(lazy(() => import("../pages/dashboard/Dashboard")));
const Settings = Loadable(lazy(() => import("../pages/store/StoreSettings")));
const ArticleManagement = Loadable(
  lazy(() => import("../pages/store/article/ArticleManagement"))
);
const Unavailable = Loadable(
  lazy(() => import("../pages/unavailable/Unavailable"))
);
const ArticleList = Loadable(
  lazy(() => import("../pages/store/article/ArticleList"))
);

const FirstOpening = Loadable(
  lazy(() => import("../pages/firstOpening/DefaultStore"))
);

const Router = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/home" /> },
      { path: "/home", exact: true, element: <Dashboard /> },
      { path: "/store/orders", exact: true, element: <Unavailable /> },
      { path: "/store/clients", exact: true, element: <Unavailable /> },
      { path: "/store/settings", exact: true, element: <Settings /> },
      { path: "/store/articles", exact: true, element: <ArticleList /> },
      {
        path: "/store/articles/add",
        exact: true,
        element: <ArticleManagement />,
      },
      {
        path: "/store/articles/:id",
        exact: true,
        element: <ArticleManagement />,
      },
      {
        path: "/store/articles/:id",
        exact: true,
        element: <ArticleManagement />,
      },
      { path: "/messages", exact: true, element: <Unavailable /> },
      { path: "/calendar", exact: true, element: <Unavailable /> },
      { path: "/settings", exact: true, element: <Unavailable /> },
      { path: "/help", exact: true, element: <Unavailable /> },
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
    path: "/firstOpening",
    element: <FullLayout hideSidebar={true} />,
    children: [{ path: "/firstOpening/", element: <FirstOpening /> }],
  },
];

export default Router;
