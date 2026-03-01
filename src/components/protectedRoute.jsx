import React from "react";
import { useUser } from "../context/userContext";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { user } = useUser();
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}

export default ProtectedRoute;
