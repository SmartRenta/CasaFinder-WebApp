// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/shared/Dashboard"; // Nuestro layout principal
import ErrorPage from "./ErrorPage"; // Página de error

import Home from "../pages/Home";
import Properties from "../pages/Properties";
import Contracts from "../pages/Contracts";
import Transfers from "../pages/Transfers";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, 
    errorElement: <ErrorPage />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "propiedades", element: <Properties /> },
      { path: "contratos", element: <Contracts /> },
      { path: "transferencias", element: <Transfers /> },
      { path: "perfil", element: <Profile /> },
    ],
  },
]);

export default router;
