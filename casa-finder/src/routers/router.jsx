import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Auth/login";
import Register from "../pages/Auth/Register";
import ErrorPage from "./ErrorPage";
import landlordRoutes from "./routerLandlord";
import tenantRoutes from "./routerTenant";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  ...landlordRoutes,
  ...tenantRoutes,
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

export default appRouter;
