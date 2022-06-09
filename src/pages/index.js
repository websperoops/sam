import React, { lazy, Suspense, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  CircularProgress,
  Box,
} from "@mui/material";
import { checkToken } from '../store/actions/auth'
import { getUser } from "../store/services";

const PublicRoute = lazy(() => import("./PublicRoute"));
const PrivateRoute = lazy(() => import("./PrivateRoute"));
const Register = lazy(() => import("./Register"));
const Login = lazy(() => import("./Login"));
const NotFound = lazy(() => import("./NotFound"));
const Dashboard = lazy(() => import("./Dashboard"));
const Event = lazy(() => import("./Event"));
const Eventform = lazy(() => import("./Eventform"));
const Eventview = lazy(() => import("./Eventview"));
const Openhouseattendees = lazy(() => import("./Openhouseattendees"));
const Openhouseform = lazy(() => import("./Openhouseform"));
const User = lazy(() => import("./User"));
const Barcode = lazy(() => import("../Component/Barcode"));


const getRoutes = () => {
  const routes = [
    {
      id: 1,
      path: "/",
      component: <Dashboard />,
    },
    {
      id: 2,
      path: "/event",
      component: <Event />,
    },
    {
      id: 3,
      path: "/eventform",
      component: <Eventform />,
    },
    {
      id: 4,
      path: "/eventview/:id",
      component: <Eventview />,
    },
    {
      id: 5,
      path: "/openhouseattendees",
      component: <Openhouseattendees />,
    },
    {
      id: 6,
      path: "/openhouseform:event_id",
      component: <Openhouseform />,
    },
    {
      id: 7,
      path: "/user",
      component: <User />,
    },
  ];
  return routes;
};

const Pages = () => {
  const routes = getRoutes();
  const dispatch = useDispatch();

  useEffect(() => {
    const userData = getUser();
    if (userData && userData.email) {
      dispatch(checkToken());
    }
  });

  return (
    <Suspense fallback={<Box sx={{ display: "flex", justifyContent: 'center', alignItems: 'center', height: "100vh" }}>
      <CircularProgress />
    </Box>}>
      <Router>
        <Routes>
          <Route
            exact
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />
          <Route
            exact
            path="/eventview/:id"
            element={
                <Eventview />
            }
          />
          <Route
            exact
            path="/barcode/:id"
            element={
                <Barcode />
            }
          />
          {/* PrivateRoute */}
          {routes &&
            routes.map((ele, idx) => (
              <Route
                exact
                key={idx}
                path={ele.path}
                element={<PrivateRoute>{ele.component}</PrivateRoute>}
              ></Route>
            ))}
          <Route
            path="*"
            element={
              <PublicRoute>
                <NotFound />
              </PublicRoute>
            }
          />
        </Routes>
      </Router>
    </Suspense>
  );
};

export default Pages;
