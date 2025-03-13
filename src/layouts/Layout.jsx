// src/layouts/Layout.jsx
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useSelector } from "react-redux";

const Layout = () => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/" replace />; // Redirect if not logged in

  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet /> {/* Renders the current route inside the layout */}
      </div>
    </div>
  );
};

export default Layout;
