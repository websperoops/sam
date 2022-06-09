import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
import {
  CircularProgress,
  Box,
} from "@mui/material";

//components
import DashboardLayout from '../layouts/Dashboard';

const PrivateRoute = ({ children }) => {
  const { loading, isAuth } = useSelector((state) => state.authReducer);
  const location = useLocation();

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} />;
  }
  
  return (
    <DashboardLayout>
      {loading && <Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
        <CircularProgress />
      </Box>}
      {!loading && children}
    </DashboardLayout>
  );
};

export default PrivateRoute;
