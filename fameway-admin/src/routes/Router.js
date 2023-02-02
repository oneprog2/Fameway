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
const Settings = Loadable(lazy(() => import("../pages/store/Settings")));
const AddArticle = Loadable(lazy(() => import("../pages/store/article/Add")));
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
      { path: "/store/settings", exact: true, element: <Settings /> },
      { path: "/store/articles", exact: true, element: <ArticleList /> },
      { path: "/store/articles/add", exact: true, element: <AddArticle /> },
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
