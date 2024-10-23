import React from "react";
import Sidebar from "./Sidebar";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";
import { getUserRoleFromCache } from "../../utils/authUtils";

const Dashboard = () => {
  const userRole = getUserRoleFromCache();

  return (
    <div className="flex h-screen">
      <Sidebar userRole={userRole} />

      <div className="flex-1 flex flex-col overflow-y-auto">
        <NavBar />
        <main className="p-6 flex-1 bg-white overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
