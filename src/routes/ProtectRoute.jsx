import { Navigate } from "react-router-dom";
import React, { useMemo } from "react";
import { jwtDecode } from "jwt-decode";

function ProtectRoute({ children }) {
  const token = useMemo(() => localStorage.getItem("authToken"), []);

  if (!token) {
    return <Navigate to="/healthsy-partnered-doctors-network-programme/doctor-registration" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTimeInSeconds = Math.floor(Date.now() / 1000);
    if (decodedToken.exp < currentTimeInSeconds) {
      localStorage.removeItem("authToken");
      return <Navigate to="/healthsy-partnered-doctors-network-programme/doctor-registration" />;
    }
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return <Navigate to="/healthsy-partnered-doctors-network-programme/doctor-registration" />;
  }

  return children;
}

export default ProtectRoute;
