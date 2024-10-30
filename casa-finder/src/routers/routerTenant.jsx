// routerTenant.jsx
import Dashboard from "../components/shared/Dashboard.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Profile from "../pages/Tenant/ProfileTenant.jsx";

import Home from "../pages/Tenant/Home";
import Contracts from "../pages/Tenant/Contracts";
import Transfers from "../pages/Tenant/Transfers";
{/* import Profile from "../pages/Tenant/Profile"; */}
import PropertyDetails from "../components/Tenant/Home/PropertyDetails"; // Importar la nueva página
import NotificationDetails from "../components/shared/Notifications/NotificationDetails";

const tenantRouter = createBrowserRouter([
  {
    path: "/tenant",
    element: <Dashboard />,
    errorElement: <ErrorPage />,
    children: [
      { path: "home", element: <Home /> },
      { path: "contratos", element: <Contracts /> },
      { path: "transferencias", element: <Transfers /> },
      { path: "perfil", element: <Profile /> },
      { path: "property/:id", element: <PropertyDetails /> }, // Nueva ruta
      { path: "notifications/:id", element: <NotificationDetails /> },
    ],
  },
];

export default tenantRoutes;
