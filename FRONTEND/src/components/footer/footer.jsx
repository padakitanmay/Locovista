import React from "react";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/logo1.png";

const quick_links = [
    { path: "/home", display: "Home" },
    { path: "/about", display: "About" },
    { path: "/tours", display: "Tours" },
];

const quick_links2 = [
    { path: "/login", display: "Login" },
    { path: "/register", display: "Register" },
];

const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer className="pt-16 pb-8">
            <Container>
                <Row>
                    <Col lg="3">
                        <div className="logo1 mb-4">
                            <img src={logo1} alt="" className="w-3/4 h-3/4 ml-6" />
                            <p className="text-gray-600">
                                Hope you like our website and it helped you in
                                planning your trip successfully.
                            </p>
                            <div className="social_links flex items-center gap-4 mt-4">
                                <span>
                                    <Link to="#">
                                        <i className="ri-youtube-line text-gray-800 text-xl"></i>
                                    </Link>
                                </span>
                                <span>
                                    <Link to="#">
                                        <i className="ri-instagram-line text-gray-800 text-xl"></i>
                                    </Link>
                                </span>
                                <span>
                                    <Link to="#">
                                        <i className="ri-github-fill text-gray-800 text-xl"></i>
                                    </Link>
                                </span>
                                <span>
                                    <Link to="#">
                                        <i className="ri-facebook-line text-gray-800 text-xl"></i>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col lg="3">
                        <h5 className="footerTitle text-gray-800 mb-4">Discover</h5>
                        <ListGroup className="footer_quickLinks">
                            {quick_links.map((item, index) => (
                                <ListGroupItem
                                    key={index}
                                    className="p-0 border-0"
                                >
                                    <Link
                                        to={item.path}
                                        className="text-gray-600 text-lg no-underline hover:underline"
                                    >
                                        {item.display}
                                    </Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col lg="3">
                        <h5 className="footerTitle text-gray-800 mb-4">Quick Links</h5>
                        <ListGroup className="footer_quickLinks">
                            {quick_links2.map((item, index) => (
                                <ListGroupItem
                                    key={index}
                                    className="p-0 border-0"
                                >
                                    <Link
                                        to={item.path}
                                        className="text-gray-600 text-lg no-underline hover:underline"
                                    >
                                        {item.display}
                                    </Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col lg="3">
                        <h5 className="footerTitle text-gray-800 mb-4">Contact</h5>
                        <ListGroup className="footer_quickLinks2">
                            <ListGroupItem className="p-0 border-0 flex items-center gap-3">
                                <h6 className="mb-0 flex items-center gap-2 text-lg">
                                    <span>
                                        <i className="ri-map-pin-line text-xl"></i>
                                    </span>
                                    Address:
                                </h6>
                                <p className="mb-0 text-gray-600">Maharashtra, India</p>
                            </ListGroupItem>
                            <ListGroupItem className="p-0 border-0 flex items-center gap-3">
                                <h6 className="mb-0 flex items-center gap-2 text-lg">
                                    <span>
                                        <i className="ri-mail-line text-xl"></i>
                                    </span>
                                    Email:
                                </h6>
                                <p className="mb-0 text-gray-600">locovista@gmail.com</p>
                            </ListGroupItem>
                            <ListGroupItem className="p-0 border-0 flex items-center gap-3">
                                <h6 className="mb-0 flex items-center gap-2 text-lg">
                                    <span>
                                        <i className="ri-phone-line text-xl"></i>
                                    </span>
                                    Phone:
                                </h6>
                                <p className="mb-0 text-gray-600">+91 7709029352</p>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col lg="12" className="text-center pt-5">
                        <p className="copyright text-gray-600 text-base">
                            Copyright <span>&copy;</span> {year}, design and
                            develop. All rights are reserved.
                        </p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
};

export default Footer;
