import Dashboard from "../components/shared/Dashboard.jsx";
import ErrorPage from "./ErrorPage.jsx";
import Profile from "../pages/Landlord/ProfileLandlord.jsx";
import Home from "../pages/Landlord/Home";
import Contracts from "../pages/Landlord/Contracts.jsx";
import Properties from "../pages/Landlord/Properties";
import Transfers from "../pages/Landlord/Transfers";
import NotificationDetails from "../components/shared/Notifications/NotificationDetails";
import LandlordPropertyDetails from "../components/Tenant/Home/PropertyDetails.jsx"; // Importamos el nuevo componente de detalles de propiedad
import Contract from "../pages/Contract.jsx";

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
      { path: "property/:id", element: <LandlordPropertyDetails /> }, // Nueva ruta para detalles de propiedad
      { path: "notifications/:id", element: <NotificationDetails /> },
      { path: "contratos/:id", element: <Contract /> },
    ],
  },
];

export default landlordRoutes;
