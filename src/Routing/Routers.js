import React, { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "../Layout";
import PrivateRoute from "./PrivateRoute";

const Home = lazy(() => import("../Pages/Home"));
const Login = lazy(() => import("../Pages/Auth/Login"));
const Orders = lazy(() => import("../Pages/Order/OrderList"));
const Test = lazy(() => import("../Pages/Test/Test"));


function RootRouters() {
  return (
    <Suspense
      fallback={
        <div className="text-center flex-auto text-lg font-semibold text-slate-900"></div>
      }
    >
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route path="/orders" element={<Orders />} />

        <Route
          path="/test"
          element={
            <PrivateRoute>
              <Test />
            </PrivateRoute>
          }
        />



      </Routes>
    </Suspense>
  );
}

export default RootRouters;
