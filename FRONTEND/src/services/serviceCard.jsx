import React from "react";
import { useNavigate } from "react-router-dom";

const ServiceCard = ({ item }) => {
    const { imgUrl, title, desc } = item;
    const navigate = useNavigate();

    const handleClick = (e) => {
        e.preventDefault();
        navigate("/customize");
    };

    return (
        <div
            className="p-4 border-b border-black rounded-lg border-r border-black cursor-pointer"
            onClick={handleClick}
        >
            <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-color p-2 mb-4">
                <img 
                    src={imgUrl} 
                    alt={title || 'Service Image'} 
                    className="w-full h-full object-cover" 
                    onError={(e) => {
                        e.target.onerror = null; // Prevents infinite loop in case of broken URL
                        e.target.src = '/path/to/default/image.jpg'; // Fallback image
                    }} 
                />
            </div>
            <h5 className="text-lg font-medium">{title}</h5>
            <p className="text-sm text-text-color">{desc}</p>
        </div>
    );
};

export default ServiceCard;
