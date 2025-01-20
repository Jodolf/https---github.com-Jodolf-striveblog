import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    // Se il token non è presente, reindirizza a /login
    return <Navigate to="/login" replace />;
  }

  // Se il token è presente, mostra la pagina
  return children;
}

export default ProtectedRoute;
