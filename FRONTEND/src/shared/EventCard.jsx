import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";

const EventCard = ({ tour }) => {
    const { _id, title, city, photo, date, desc } = tour;

    return (
        <div className="relative border border-gray-200 rounded-lg shadow-lg">
            <Card className="border-none">
                <div className="touImg relative w-full h-44">
                    <img
                        src={photo}
                        alt={title}
                        className="w-full h-full object-cover rounded-t-lg"
                    />
                </div>
                <CardBody className="p-4">
                    <div className="cardTop flex items-center justify-between mb-2">
                        <span className="tourLocation flex items-center gap-2 text-sm text-heading font-medium">
                            <i className="ri-map-pin-line"></i>
                            {city}
                        </span>
                        {date && (
                            <span className="text-sm text-gray-500">
                                {new Date(date).toLocaleDateString()}
                            </span>
                        )}
                    </div>

                    <h5 className="tourTitle mt-2 text-lg font-semibold cursor-pointer text-heading hover:text-secondary">
                        <div>{title}</div>
                    </h5>

                    <p className="text-sm text-gray-700 mt-2 line-clamp-2">
                        {desc}
                    </p>

                    <div className="mt-4 text-right">
                        <Link
                            to={`/tours/${_id}`}
                            className="inline-block bg-teal-600 text-white py-1 px-3 rounded text-sm hover:bg-gray-600 transition"
                        >
                            View Details
                        </Link>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default EventCard;
