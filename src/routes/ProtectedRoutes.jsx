import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user } = useSelector((state) => state.auth);
  const fallBackRoute = user?.role === "admin"  ?"/admin/dashboard" : "/student/view-result"

  if (!user) {
    return <Navigate to="/" replace />; // Redirect to login if not authenticated
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={fallBackRoute} replace />; // Redirect if user has no access
  }

  return children; // Render the matched route
};

export default ProtectedRoute;