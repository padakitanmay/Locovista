import React from "react";
import { useParams } from "react-router-dom";

const Map = () => {
    const { lng, lat } = useParams();
    return (
        <div className="w-screen h-screen mx-2 my-2">
            <iframe
                src={`https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d152!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1717675413021!5m2!1sen!2sin`}
                className="w-full h-full"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Maps"
            />
        </div>
    );
};

export default Map;
