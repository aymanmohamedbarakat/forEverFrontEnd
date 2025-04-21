import React, { useEffect, useState } from "react";
import { useAuthStore } from "../Hooks/authStore";
import { Navigate, useLocation } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const { isAuthenticated } = useAuthStore();
  const location = useLocation();
  if (!isAuthenticated) {
    sessionStorage.setItem("redirect", location.pathname);
    localStorage.setItem("redirect", location.pathname);
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default AuthGuard;
