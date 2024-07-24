import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/home";
import Tours from "../pages/tours";
import PlaceDetails from "../pages/placeDetails";
import TourDetails from "../pages/tourDetails";
import Login from "../pages/login";
import Register from "../pages/register";
import SerchResultList from "../pages/searchResultList";
import Thankyou from "../pages/thankyou";
import About from "../pages/about";
import Emergency from "../pages/emergency";
import Urgent from "../pages/urgent";
import Contribute from "../pages/contribute";
import Contri from "../pages/contri";
import Customize from "../pages/customize";

const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Navigate to='/home' />} />
            <Route path='/home' element={<Home />} />
            <Route path='/customize' element={<Customize />} />
            <Route path='/urgent' element={<Urgent />} />
            <Route path='/contri' element={<Contri />} />
            <Route path='/about' element={<About />} />
            <Route path='/emergency' element={<Emergency />} />
            <Route path='/contribute' element={<Contribute />} />
            <Route path='/tours' element={<Tours />} />
            <Route path='/tours/:id' element={<PlaceDetails />} />
            <Route path='/ajencys/:id' element={<TourDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/tours/search' element={<SerchResultList />} />
            {/* <Route path='/search' element={<SerchResultList/>}/> */}
            <Route path='/thank-you' element={<Thankyou />} />
        </Routes>
    );
};

export default Router;
