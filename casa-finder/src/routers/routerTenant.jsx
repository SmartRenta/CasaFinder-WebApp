import Dashboard from "../components/shared/Dashboard.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Profile from "../pages/Tenant/ProfileTenant.jsx";
import Home from "../pages/Tenant/Home";
import Contracts from "../pages/Tenant/Contracts/Contracts.jsx";
import CreateContract from "../pages/Tenant/CreateContract/CreateContract.jsx";
import Transfers from "../pages/Tenant/Transfers";
import PropertyDetails from "../components/Tenant/Home/PropertyDetails";
import NotificationDetails from "../components/shared/Notifications/NotificationDetails";
import Contract from "../pages/Contract.jsx";
import Welcome from "../pages/Tenant/Welcome.jsx";

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
      { path: "property/:id", element: <PropertyDetails /> },
      { path: "contratos/:id", element: <Contract /> },
      { path: "welcome", element: <Welcome /> },
      { path: "createcontract/:propertyId/:landlordId", element: <CreateContract /> },
    ],
  },
];

export default tenantRoutes;
