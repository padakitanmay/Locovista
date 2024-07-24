import React from "react";
import "./serviceCard.css";

import { useNavigate } from "react-router-dom";
const ServiceCard = ({ item }) => {
    const { imgUrl, title, desc } = item;
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/customize");
    };
    return (
        <div className='service_item ' onClick={handleClick}>
            <div className='service_img'>
                <img src={imgUrl} alt='' />
            </div>
            <h5>{title}</h5>
            <p>{desc}</p>
        </div>
    );
};

export default ServiceCard;
