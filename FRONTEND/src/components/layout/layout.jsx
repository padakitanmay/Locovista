import React from "react";
import Header from "../header/header";
import Router from "../../router/router";
import Footer from "../footer/footer";
const Layout = () => {
    return (
        <>
            <Header />
            <Router />
            <Footer />
        </>
    );
};

export default Layout;
