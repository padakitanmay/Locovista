import React from "react";
import "./footer.css";
import { Container, Row, Col, ListGroup, ListGroupItem } from "reactstrap";
import { Link } from "react-router-dom";
import logo1 from "../../assets/images/logo1.png";

const quick_links = [
    {
        path: "/home",
        display: "Home",
    },
    {
        path: "/about",
        display: "About",
    },
    {
        path: "/tours",
        display: "Tours",
    },
];
const quick_links2 = [
    {
        path: "/login",
        display: "Login",
    },
    {
        path: "/register",
        display: "Register",
    },
];
const Footer = () => {
    const year = new Date().getFullYear();
    return (
        <footer classname='footer'>
            <Container>
                <Row>
                    <Col lg='3'>
                        <div className='logo1'>
                            <img src={logo1} alt='' />
                            <p>
                                Hope you like our website and it helped you in
                                plannig your trip successfully.
                            </p>
                            <div className='social_links d-flex align-items-center gap-4'>
                                <span>
                                    <Link to='#'>
                                        <i class='ri-youtube-line'></i>
                                    </Link>
                                </span>
                                <span>
                                    <Link to='#'>
                                        <i class='ri-instagram-line'></i>
                                    </Link>
                                </span>
                                <span>
                                    <Link to='#'>
                                        <i class='ri-github-fill'></i>
                                    </Link>
                                </span>
                                <span>
                                    <Link to='#'>
                                        <i class='ri-facebook-line'></i>
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </Col>
                    <Col lg='3'>
                        <h5 className='footerTitle'>Discover</h5>
                        <ListGroup className='footer_quickLinks'>
                            {quick_links.map((item, index) => (
                                <ListGroupItem
                                    key={index}
                                    className='ps-0 border-0'
                                >
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col lg='3'>
                        <h5 className='footerTitle'>Quick Links</h5>
                        <ListGroup className='footer_quickLinks'>
                            {quick_links2.map((item, index) => (
                                <ListGroupItem
                                    key={index}
                                    className='ps-0 border-0'
                                >
                                    <Link to={item.path}>{item.display}</Link>
                                </ListGroupItem>
                            ))}
                        </ListGroup>
                    </Col>
                    <Col lg='3'>
                        <h5 className='footerTitle'>Contact</h5>
                        <ListGroup className='footer_quickLinks2'>
                            <ListGroupItem className='ps-0 border-0 d-flex align-itmes-center gap-3'>
                                <h6 className='mb-0 d-flex align-items-center gap-2'>
                                    <span>
                                        <i class='ri-map-pin-line'></i>
                                    </span>
                                    Address:
                                </h6>
                                <p className='mb-0'>Maharashtra, India</p>
                            </ListGroupItem>
                            <ListGroupItem className='ps-0 border-0 d-flex align-itmes-center gap-3'>
                                <h6 className='mb-0 d-flex align-items-center gap-2'>
                                    <span>
                                        <i class='ri-mail-line'></i>
                                    </span>
                                    Email:
                                </h6>
                                <p className='mb-0'>locovista@gmail.com</p>
                            </ListGroupItem>
                            <ListGroupItem className='ps-0 border-0 d-flex align-itmes-center gap-3'>
                                <h6 className='mb-0 d-flex align-items-center gap-2'>
                                    <span>
                                        <i class='ri-phone-line'></i>
                                    </span>
                                    Phone:
                                </h6>
                                <p className='mb-0'>+91 7709029352</p>
                            </ListGroupItem>
                        </ListGroup>
                    </Col>
                    <Col lg='12' className='text-center pt-5'>
                        <p className='copyright'>
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
