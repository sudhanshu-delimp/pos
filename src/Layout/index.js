import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
    return (
        <div className="flex">
            <Sidebar />
            <div>
                <Header />
                {children}
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
