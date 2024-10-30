// routerTenant.jsx
import Dashboard from "../components/shared/Dashboard.jsx";
import ErrorPage from "./ErrorPage.jsx";

import Home from "../pages/Tenant/Home.jsx";
import Profile from "../pages/Tenant/ProfileTenant.jsx";
import Contracts from "../pages/Tenant/Contracts.jsx";
import Transfers from "../pages/Tenant/Transfers.jsx";

const tenantRoutes = [
  {
    path: "/tenant",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <Home /> },
      { path: "contratos", element: <Contracts /> },
      { path: "transferencias", element: <Transfers /> },
      { path: "perfil", element: <Profile /> },
    ],
  },
];

export default tenantRoutes;
