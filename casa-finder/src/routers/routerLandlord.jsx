// routerLandlord.jsx
import { Route } from "react-router-dom";
import Dashboard from "../components/shared/Dashboard.jsx";
import ErrorPage from "./ErrorPage.jsx";

import Home from "../pages/Landlord/Home.jsx";
import Properties from "../pages/Landlord/Properties.jsx";
import Contracts from "../pages/Landlord/Contracts/Contracts.jsx";
import Transfers from "../pages/Landlord/Transfers.jsx";
import Profile from "../pages/Landlord/ProfileLandlord.jsx";

const landlordRoutes = [
  {
    path: "/landlord",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <Home /> },
      { path: "propiedades", element: <Properties /> },
      { path: "contratos", element: <Contracts /> },
      { path: "transferencias", element: <Transfers /> },
      { path: "perfil", element: <Profile /> },
    ],
  },
];

export default landlordRoutes;
