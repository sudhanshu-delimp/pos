import React, { Fragment } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
    return (
        <Fragment>
            <Sidebar />
            <Header />
            {children}
        </Fragment>
    );
};

export default Layout;
