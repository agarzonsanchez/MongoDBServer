import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import { useAuth } from "../../context/AuthContext.js";

export default function PrivateRoutes({ children }) {
  const user = useSelector((state) => state.counter.user);

  console.log(user);
  // const { currentUser } = useAuth();
  return user.email ? children : <Navigate to="/login" />;
}
