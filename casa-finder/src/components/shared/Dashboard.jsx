import React from "react";
import Sidebar from "./Sidebar";
import NavBar from "./Navbar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex h-screen">

      <Sidebar />

      <div className="flex-1 flex flex-col">
        <NavBar />
        <main className="p-6 flex-1 bg-white">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
