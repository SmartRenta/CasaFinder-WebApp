import React from "react";
import ReactDOM from "react-dom/client";
import tenantRouter from "./routers/routerTenant";
import landlordRouter from "./routers/routerLandlord";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { getUserRoleFromCache, setUserRoleInCache } from "./utils/authUtils";

setUserRoleInCache("landlord");
const userRole = getUserRoleFromCache();

const router = userRole === "tenant" ? tenantRouter : landlordRouter;

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
