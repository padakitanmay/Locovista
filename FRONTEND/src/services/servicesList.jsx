import React from "react";
import ServiceCard from "./serviceCard";
import { Col } from "reactstrap";
import weatherImg from "../assets/images/weather.png";
import guideImg from "../assets/images/guide.png";
import customizationImg from "../assets/images/customization.png";

const servicesData = [
    {
        imgUrl: weatherImg,
        title: "Calculate Weather",
        desc: "Loremwfervev rw eyf7wfwxmu",
    },
    {
        imgUrl: guideImg,
        title: "Best Tour Guide",
        desc: "Loremwfervev rw eyf7wfwxmu",
    },
    {
        imgUrl: customizationImg,
        title: "Customization",
        desc: "Loremwfervev rw eeyf7wfwxmu",
    },
];

const ServicesList = () => {
    return (
        <>
            {servicesData.map((item, index) => (
                <Col lg='3' key={index}>
                    <ServiceCard item={item} />
                </Col>
            ))}
        </>
    );
};

export default ServicesList;
