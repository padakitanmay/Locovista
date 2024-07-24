import React, { useRef, useEffect, useContext } from "react";
import "./header.css";
import { Container, Row, Button } from "reactstrap";
import { NavLink, Link, useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../context/AuthContext";

const nav_links = [
    {
        path: "/home",
        display: "Home",
    },
    {
        path: "/tours",
        display: "Tours",
    },
    {
        path: "/contribute",
        display: "Contribute",
    },

    {
        path: "/about",
        display: "About",
    },
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
                headerRef.current.classList.add("sticky_heade");
            } else {
                headerRef.current.classList.remove("sticky_heade");
            }
        });
    };

    useEffect(() => {
        stickyHeaderFunc();
    });
    return (
        <>
            <header className='header' ref={headerRef}>
                <Container>
                    <Row>
                        <div className='nav_wrapper d-flex align-items-center justify-content-between'>
                            {/*logo*/}
                            <div className='logo w-5 h-50'>
                                <img src={logo} alt='' />
                            </div>

                            {/* menu */}
                            <div className='navigation'>
                                <ul className='menu d-flex align-items-center gap-4'>
                                    {nav_links.map((item, index) => (
                                        <li className='nav_item' key={index}>
                                            <NavLink
                                                to={item.path}
                                                className={(navClass) =>
                                                    navClass.isActive
                                                        ? "active_link"
                                                        : ""
                                                }
                                            >
                                                {item.display}
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            {/*Login/Register */}
                            <div className='nav_right d-flex align-items-center gap-5 '>
                                <div className='nav_btns d-flex align-items-center gap-3'>
                                    {user ? (
                                        <>
                                            <h5 className='mb-0'>
                                                {user.username}
                                            </h5>
                                            {/* {console.log(user.username)} */}
                                            <Button
                                                className='btn btn-dark'
                                                onClick={logout}
                                            >
                                                Logout
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Button className='btn secondary_btn'>
                                                <Link to='/login'>Login</Link>
                                            </Button>
                                            <Button className='btn primary_btn'>
                                                <Link to='/register'>
                                                    Register
                                                </Link>
                                            </Button>
                                        </>
                                    )}
                                    <Button className='btn emergency_btn'>
                                        <Link to='/emergency'>Emergency</Link>
                                    </Button>
                                </div>
                                <span className='mobile_menu'>
                                    <i class='ri-menu-line'></i>
                                </span>
                            </div>
                        </div>
                    </Row>
                </Container>
            </header>
        </>
    );
};

export default Header;
