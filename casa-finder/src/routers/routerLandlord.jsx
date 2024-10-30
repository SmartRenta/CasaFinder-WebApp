import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../components/shared/Dashboard";
import ErrorPage from "./ErrorPage"; 

import Home from "../pages/Landlord/Home";
import Properties from "../pages/Landlord/Properties";
import Contracts from "../pages/Landlord/Contracts/Contracts";
import Transfers from "../pages/Landlord/Transfers";
import Profile from "../pages/Landlord/Profile";
import NotificationDetails from "../components/shared/Notifications/NotificationDetails";

const landlordRouter = createBrowserRouter([
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
      { path: "notifications/:id", element: <NotificationDetails /> },
    ],
  },
]);

export default landlordRouter;