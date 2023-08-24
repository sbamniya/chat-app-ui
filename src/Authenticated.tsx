import React from "react";
import { Navigate } from "react-router-dom";
import useIsLoggedIn from "./hooks/useLoggedIn";

const Authenticated: React.FC<React.PropsWithChildren> = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default Authenticated;
