import React, { useRef, useEffect, useContext } from "react";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext";

const nav_links = [
    { path: "/home", display: "Home" },
    { path: "/tours", display: "Tours" },
    { path: "/contribute", display: "Contribute" },
    { path: "/about", display: "About" },
];

const Header = () => {
    const headerRef = useRef();
    const navigate = useNavigate();
    const { user, dispatch } = useContext(AuthContext);

    const logout = () => {
        dispatch({ type: "LOGOUT" });
        navigate("/");
    };

    const stickyHeaderFunc = () => {
        window.addEventListener("scroll", () => {
            if (
                document.body.scrollTop > 80 ||
                document.documentElement.scrollTop > 80
            ) {
                headerRef.current.classList.add("sticky_header");
            } else {
                headerRef.current.classList.remove("sticky_header");
            }
        });
    };

    useEffect(() => {
        stickyHeaderFunc();
    }, []);

    return (
        <header
            className="w-full h-[80px] flex items-center justify-between bg-transparent transition-all duration-300 ease-in-out"
            ref={headerRef}
        >
            <Container>
                <Row className="h-full items-center">
                    <div className="flex items-center justify-between w-full h-full">
                        {/* Logo */}
                        <div className="w-[100px] h-[100px]">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Menu */}
                        <div className="flex flex-grow justify-center">
                            <ul className="flex space-x-4 mb-0">
                                {nav_links.map((item, index) => (
                                    <li key={index}>
                                        <NavLink
                                            to={item.path}
                                            className={({ isActive }) =>
                                                `text-gray-800 font-medium text-lg ${isActive ? 'text-blue-500' : 'hover:text-blue-300'}`
                                            }
                                        >
                                            {item.display}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Login/Register */}
                        <div className="flex items-center space-x-5">
                            <div className="flex space-x-3">
                                {user ? (
                                    <>
                                        <h5 className="mb-0 text-lg font-semibold text-gray-800">
                                            {user.username}
                                        </h5>
                                        <Button
                                            className="bg-gray-800 text-white py-2 px-4 rounded"
                                            onClick={logout}
                                        >
                                            Logout
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Button className="py-2 px-4 rounded">
                                            <Link to="/login" className="text-white no-underline">Login</Link>
                                        </Button>
                                        <Button className="py-2 px-4 rounded">
                                            <Link to="/register" className="text-white no-underline">Register</Link>
                                        </Button>
                                    </>
                                )}
                                <Button className=" bg-blue-700 py-2 px-4 rounded">
                                    <Link to="/emergency" className="text-white no-underline">Emergency</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </Row>
            </Container>
        </header>
    );
};

export default Header;
