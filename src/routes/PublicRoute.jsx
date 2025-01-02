import { Navigate } from "react-router-dom";

import React from "react";

function PublicRoute(props) {
  if (localStorage.getItem("authToken")) {
    console.log("dddd");

    return <Navigate to="/user-list" />;
  } else {
    console.log("oeooe");

    <Navigate to="/healthsy-partnered-doctors-network-programme/doctor-registration" />;
    return props.children;
  }
}

export default PublicRoute;
