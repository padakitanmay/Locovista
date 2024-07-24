import React from "react";
import "./urgent.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
const Urgent = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='pt-5 text-center'>
                        <div className='thankyou'>
                            <span>
                                <i class='ri-alert-line'></i>
                            </span>
                            <h1 className='mb-3 fw-semibold'>We're coming</h1>
                            <h3 className='mb-4'>
                                Your urgent emergency is recieved{" "}
                            </h3>
                            <Button className='btn primary_btn w-25'>
                                <Link to='/home'>Back to Home</Link>
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Urgent;
