import Login from "../components/Login";
import { useAuth } from "../context/AuthContext";
import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Login />;
};

export default PrivateRoute;
