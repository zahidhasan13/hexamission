import React from "react";
import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuthContext();
  console.log(user);

  if (loading) {
    return <h3>Loading....</h3>;
  }
  if (user) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
