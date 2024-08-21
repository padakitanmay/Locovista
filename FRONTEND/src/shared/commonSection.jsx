import React from "react";
import { Container, Row, Col } from "reactstrap";
import imageUrl from "../assets/images/tour.jpg"

const CommonSection = ({ title }) => {
    return (
        <section
            className="flex items-center justify-center text-center bg-cover bg-center h-[300px] mt-[50px] relative"
            style={{
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.45), rgba(0, 0, 0, 0.45)), url(${imageUrl})`
            }}
            
        >
            <Container>
                <Row>
                    <Col lg='12'>
                        <h1 className="text-white text-[2.5rem]">{title}</h1>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default CommonSection;
