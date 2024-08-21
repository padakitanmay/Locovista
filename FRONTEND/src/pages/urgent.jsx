import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

const Urgent = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='pt-5 text-center'>
                        <div className='text-center'>
                            <span>
                                <i className="text-green-500 text-4xl ri-alert-line"></i>
                            </span>
                            <h1 className='text-3.6xl font-subtitle mb-3 font-semibold'>
                                We're coming
                            </h1>
                            <h3 className='text-xl mb-4'>
                                Your urgent emergency is received
                            </h3>
                            <Button className='bg-primary text-white w-1/4'>
                                <Link to='/home' className='text-white no-underline'>
                                    Back to Home
                                </Link>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Urgent;
