import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from "../Layout";
const Home = lazy(() => import('../Pages/Home'));



function RootRouters() {
    return (
        <Routes>
            <Route path="/" element={<Layout><Home /></Layout>} />

        </Routes>
    );
}

export default RootRouters;
