import React from "react";
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
                    <Col lg='4' className='flex flex-col items-center border border-secondary-color shadow-lg rounded-lg p-6 mb-28'>
                        <div className='flex flex-col items-center'>
                            <img src={police} alt='Police' className='w-full h-20 object-cover mb-4' />
                            <Button
                                className='bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700'
                                onClick={handleClick}
                            >
                                Police
                            </Button>
                        </div>
                    </Col>
                    <Col lg='4' className='flex flex-col items-center border border-secondary-color shadow-lg rounded-lg p-6 mb-28'>
                        <div className='flex flex-col items-center'>
                            <img src={ambulance} alt='Ambulance' className='w-full h-20 object-cover mb-4' />
                            <Button
                                className='bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700'
                                onClick={handleClick}
                            >
                                Ambulance
                            </Button>
                        </div>
                    </Col>
                    <Col lg='4' className='flex flex-col items-center border border-secondary-color shadow-lg rounded-lg p-6 mb-28'>
                        <div className='flex flex-col items-center'>
                            <img src={fire} alt='Fire Extinguisher' className='w-full h-20 object-cover mb-4' />
                            <Button
                                className='bg-indigo-600 text-white w-full py-2 rounded-md hover:bg-indigo-700'
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
