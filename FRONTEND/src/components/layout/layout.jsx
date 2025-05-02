import React from "react";
import Header from "../header/header";
import Router from "../../router/router";
import Footer from "../footer/footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Layout = () => {
    return (
        <>
            <Header />
            <Router />
            <Footer />
            <ToastContainer position="top-right" autoClose={5000} />
        </>
    );
};

export default Layout;
