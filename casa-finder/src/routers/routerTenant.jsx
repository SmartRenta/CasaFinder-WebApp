import { createBrowserRouter } from "react-router-dom";

import Dashboard from "../components/shared/Dashboard";
import ErrorPage from "./ErrorPage"; 

import Home from "../pages/Tenant/Home";
import Contracts from "../pages/Tenant/Contracts";
import Transfers from "../pages/Tenant/Transfers";
import Profile from "../pages/Tenant/Profile";
import PropertyDetails from "../components/Tenant/Home/PropertyDetails"; // Importar la nueva página


const tenantRouter = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />, 
    errorElement: <ErrorPage />, 
    children: [
      { path: "/", element: <Home /> },
      { path: "contratos", element: <Contracts /> },
      { path: "transferencias", element: <Transfers /> },
      { path: "perfil", element: <Profile /> },
      { path: "property/:id", element: <PropertyDetails /> }, // Nueva ruta
    ],
  },
]);

export default tenantRouter;