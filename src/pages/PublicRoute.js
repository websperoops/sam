import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Box,
} from "@mui/material";

const PublicRoutes = ({ children }) => {
  const { loading, isAuth } = useSelector((state) => state.authReducer);
  const location = useLocation();

  if (loading) {
    return <Box sx={{ display: "flex", justifyContent: 'center',alignItems:'center',height:"100vh" }}><CircularProgress /></Box>;
  }
  
  if (isAuth) {
    return <Navigate to="/" state={{ from: location }} />;
  }

  return (
   <div className="main-container">{children}</div>
  );
};

export default PublicRoutes;
