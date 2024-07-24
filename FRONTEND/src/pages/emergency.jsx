import React from "react";
import "./emergency.css";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Button } from "reactstrap";
import police from "../assets/images/police.jpg";
import ambulance from "../assets/images/ambulance.jpeg";
import fire from "../assets/images/fire.jpeg";
const Emergency = () => {
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        alert(`Are you sure ?`);
        navigate("/urgent");
    };
    return (
        <section>
            <Container>
                <Row>
                    <Col lg='4' className='emergency'>
                        <div>
                            <img src={police} alt='' />
                            <Button
                                className='btn primary_btn w-100 mt-4'
                                onClick={handleClick}
                            >
                                Police
                            </Button>
                        </div>
                    </Col>
                    <Col lg='4' className='emergency  '>
                        <div>
                            <img src={ambulance} alt='' />
                            <Button
                                className='btn primary_btn w-100 mt-4'
                                onClick={handleClick}
                            >
                                Ambulance
                            </Button>
                        </div>
                    </Col>
                    <Col lg='4' className='emergency '>
                        <div>
                            <img src={fire} alt='' />
                            <Button
                                className='btn primary_btn w-100 mt-4'
                                onClick={handleClick}
                            >
                                Fire Extinguisher
                            </Button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default Emergency;
