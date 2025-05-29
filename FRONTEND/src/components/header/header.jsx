import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext";

const Header = () => {
    const headerRef = useRef(null);
    const dropdownRef = useRef(null); // Reference for outside click
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openDropdownIndex, setOpenDropdownIndex] = useState(null);

    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    // Toggle dropdowns on click
    const toggleDropdownClick = (index) => {
        setOpenDropdownIndex((prev) => (prev === index ? null : index));
    };

    // Logout logic
    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    // Handle outside click to close dropdown
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setOpenDropdownIndex(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Sticky header on scroll
    useEffect(() => {
        const stickyHeaderFunc = () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current?.classList?.add("sticky_header");
            } else {
                headerRef.current?.classList?.remove("sticky_header");
            }
        };

        window.addEventListener("scroll", stickyHeaderFunc);
        return () => window.removeEventListener("scroll", stickyHeaderFunc);
    }, []);

    // Links based on role
    let nav_links;
    if (user?.role === "admin") {
        nav_links = [
            { path: "/admin/dashboard", display: "Admin Dashboard" },
            { path: "/tours", display: "Tours" },
            { path: "/about", display: "About" },
            {
                display: "Contribute",
                dropdown: [
                    { path: "/contribute", display: "Add Places" },
                    { path: "/events", display: "Events" },
                ],
            },
            {
                display: "Helpline",
                dropdown: [
                    { path: "/railwayInfo", display: "Railways" },
                    { path: "/hotels", display: "Hotels" },
                    { path: "/hospitals", display: "Hospitals" },
                ],
            },
        ];
    } else {
        nav_links = [
            { path: "/home", display: "Home" },
            { path: "/tours", display: "Tours" },
            {
                display: "Helpline",
                dropdown: [
                    { path: "/railwayInfo", display: "Railways" },
                    { path: "/hotels", display: "Hotels" },
                    { path: "/hospitals", display: "Hospitals" },
                    { path: "/police", display: "Police Stations" },
                ],
            },
            { path: "/about", display: "About" },
            {
                display: "Contribute",
                dropdown: [
                    { path: "/contribute", display: "Add Places" },
                    { path: "/events", display: "Events" },
                ],
            },
        ];
    }

    return (
        <header
            className="w-full flex items-center justify-between bg-transparent transition-all duration-300 ease-in-out shadow-lg"
            ref={headerRef}
        >
            <Container>
                <Row className="h-full items-center">
                    <div className="flex flex-col md:flex-row items-center justify-between w-full h-full">
                        {/* Logo and Menu Icon */}
                        <div className="flex items-center justify-between w-full md:w-auto">
                            <div className="w-[100px] h-[100px]">
                                <img
                                    src={logo}
                                    alt="Logo"
                                    className="w-full h-full object-contain"
                                />
                            </div>
                            <div
                                className="md:hidden flex items-center cursor-pointer"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                            >
                                <i className="ri-menu-line text-2xl text-gray-800"></i>
                            </div>
                        </div>

                        {/* Navigation Menu */}
                        <div
                            className={`md:flex md:items-center md:justify-center flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 ${
                                isMenuOpen ? "block" : "hidden"
                            }`}
                            ref={dropdownRef}
                        >
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-0">
                                {nav_links.map((item, index) => {
                                    const isDropdown = !!item.dropdown;

                                    return (
                                        <li key={index} className="relative">
                                            {isDropdown ? (
                                                <div className="relative">
                                                    <button
                                                        onClick={() =>
                                                            toggleDropdownClick(
                                                                index
                                                            )
                                                        }
                                                        className="text-gray-800 font-medium text-lg focus:outline-none hover:text-teal-500 flex items-center gap-1"
                                                    >
                                                        {item.display}
                                                        <i className="ri-arrow-down-s-line text-xl"></i>
                                                    </button>

                                                    {openDropdownIndex ===
                                                        index && (
                                                        <ul className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg border w-44 z-50">
                                                            {item.dropdown.map(
                                                                (
                                                                    subItem,
                                                                    subIndex
                                                                ) => (
                                                                    <li
                                                                        key={
                                                                            subIndex
                                                                        }
                                                                    >
                                                                        <NavLink
                                                                            to={
                                                                                subItem.path
                                                                            }
                                                                            className={({
                                                                                isActive,
                                                                            }) =>
                                                                                `block px-4 py-2 text-sm font-medium text-gray-800 no-underline transition-colors duration-200 ${
                                                                                    isActive
                                                                                        ? "bg-teal-100 text-teal-600"
                                                                                        : "hover:bg-teal-50 hover:text-teal-500"
                                                                                }`
                                                                            }
                                                                            onClick={() =>
                                                                                setOpenDropdownIndex(
                                                                                    null
                                                                                )
                                                                            } // Close dropdown on item click
                                                                        >
                                                                            {
                                                                                subItem.display
                                                                            }
                                                                        </NavLink>
                                                                    </li>
                                                                )
                                                            )}
                                                        </ul>
                                                    )}
                                                </div>
                                            ) : (
                                                <NavLink
                                                    to={item.path}
                                                    className={({ isActive }) =>
                                                        `text-gray-800 font-medium text-lg no-underline transition-colors duration-200 ${
                                                            isActive
                                                                ? "text-teal-500"
                                                                : "hover:text-red-500"
                                                        }`
                                                    }
                                                    onClick={() =>
                                                        setOpenDropdownIndex(
                                                            null
                                                        )
                                                    } // Close any open dropdown on regular nav click
                                                >
                                                    {item.display}
                                                </NavLink>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>

                        {/* Login / User Info */}
                        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-5 mt-4 md:mt-0">
                            {user ? (
                                <div className="flex items-center space-x-4">
                                    <h5 className="text-lg font-semibold text-gray-800">
                                        {user.username}
                                    </h5>
                                    <button
                                        className="bg-red-500 text-white py-2 px-4 rounded"
                                        onClick={logout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="flex items-center space-x-4">
                                    <Link
                                        to="/login"
                                        className="text-white no-underline"
                                    >
                                        <button className="bg-teal-400 text-white py-2 px-4 rounded">
                                            Login
                                        </button>
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="text-white no-underline"
                                    >
                                        <button className="bg-teal-400 text-white py-2 px-4 rounded">
                                            Sign Up
                                        </button>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
