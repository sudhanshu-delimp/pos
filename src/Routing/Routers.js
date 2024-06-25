import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "../Layout";
import PrivateRoute from './PrivateRoute';

const Home = lazy(() => import('../Pages/Home'));
const Login = lazy(() => import('../Pages/Auth/Login'));




function RootRouters() {
    return (
        <Suspense fallback={<div className='text-center flex-auto text-lg font-semibold text-slate-900'></div>}>
            <Routes>
                <Route exact path="/login" element={<Login />} />
                <Route
                    path="/"
                    element={
                        <PrivateRoute >
                            <Home />
                        </PrivateRoute>
                    }
                />
            </Routes>
        </Suspense>
    );
}

export default RootRouters;
