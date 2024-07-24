import React from "react";
import "./thankyou.css";
import { Container, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";
const Thankyou = () => {
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='12' className='pt-5 text-center'>
                        <div className='thankyou'>
                            <span>
                                <i class='ri-checkbox-circle-line'></i>
                            </span>
                            <h1 className='mb-3 fw-semibold'>Thank You</h1>
                            <h3 className='mb-4'>
                                Your Tour is Booked Successfully.
                            </h3>
                        </div>
                    </Col>
                    <Col
                        lg='12'
                        className='d-flex align-items-center justify-content-center gap-5'
                    >
                        <Button className='btn primary_btn w-25 '>
                            <Link to='/home'>Back to Home</Link>
                        </Button>
                        <Button className='btn primary_btn w-25 '>
                            <Link to='/tours'>Sudden Change in plan.</Link>
                        </Button>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Thankyou;
