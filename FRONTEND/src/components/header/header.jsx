import React, { useRef, useEffect, useContext, useState } from "react";
import { Container, Row } from "reactstrap";
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
  const headerRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to manage menu visibility
  const navigate = useNavigate();
  const { user, dispatch } = useContext(AuthContext);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
  };

  useEffect(() => {
    const stickyHeaderFunc = () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        if (headerRef.current) {
          headerRef.current.classList?.add("sticky_header");
        }
      } else {
        if (headerRef.current) {
          headerRef.current.classList?.remove("sticky_header");
        }
      }
    };

    window.addEventListener("scroll", stickyHeaderFunc);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", stickyHeaderFunc);
    };
  }, []);

  return (
    <header
      className="w-full flex items-center justify-between bg-transparent transition-all duration-300 ease-in-out shadow-lg"
      ref={headerRef}
    >
      <Container>
        <Row className="h-full items-center">
          <div className="flex flex-col md:flex-row items-center justify-between w-full h-full">
            <div className="flex items-center justify-between w-full md:w-auto">
              {/* Logo */}
              <div className="w-[100px] h-[100px]">
                <img
                  src={logo}
                  alt="Logo"
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Hamburger Icon */}
              <div
                className="md:hidden flex items-center cursor-pointer"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <i className="ri-menu-line text-2xl text-gray-800"></i>
              </div>
            </div>

            {/* Menu */}
            <div
              className={`md:flex md:items-center md:justify-center flex-col md:flex-row w-full md:w-auto mt-4 md:mt-0 ${isMenuOpen ? "block" : "hidden"}`}
            >
              <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mb-0">
                {nav_links.map((item, index) => (
                  <li key={index}>
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `text-gray-800 font-medium text-lg no-underline ${
                          isActive ? "text-teal-500" : "hover:text-red-500"
                        }`
                      }
                    >
                      {item.display}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>

            {/* Login/Register */}
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-5 mt-4 md:mt-0">
              {user ? (
                <div className="flex items-center space-x-4">
                  <h5 className="text-lg font-semibold text-gray-800">{user.username}</h5>
                  <button
                    className="bg-red-500 text-white py-2 px-4 rounded"
                    onClick={logout}
                  >
                    Logout
                  </button>
                  <button className="bg-red-500 text-white py-2 px-4 rounded">
                    <Link to="/emergency" className="text-white no-underline">
                      Emergency
                    </Link>
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-4">
                  <button className="bg-teal-400 text-white py-2 px-4 rounded">
                    <Link to="/login" className="text-white no-underline">Login</Link>
                  </button>
                  <button className="bg-teal-400 text-white py-2 px-4 rounded">
                    <Link to="/register" className="text-white no-underline">Register</Link>
                  </button>
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
