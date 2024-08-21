import React, { useState, useEffect } from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utills/avgRating";
import { BASE_URL } from "../utills/config";

const TourCard = ({ tour }) => {
    const { _id, title, city, photo, featured, reviews, address } = tour;
    const [coords, setCoords] = useState({ lat: null, lng: null });

    const getCoords = async (address) => {
        try {
            const response = await fetch(`${BASE_URL}/tours/getCoordinates`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ address }),
            });
            const data = await response.json();
            console.log(data);
            setCoords({ lat: data.lat, lng: data.lng });
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        getCoords(address);
    }, [address]); // Fetch coordinates whenever the address changes

    const { totalRating, avgRating } = calculateAvgRating(reviews);

    return (
        <div className='relative border border-gray-200 rounded-lg shadow-lg'>
            <Card className='border-none'>
                <div className='touImg relative w-full h-44'>
                    <img
                        src={photo}
                        alt='tourImg'
                        className='w-full h-full object-cover rounded-t-lg'
                    />
                    {featured && (
                        <span className='absolute top-0 right-0 bg-primary text-white px-2 py-1 rounded-bl-lg text-sm'>
                            Featured
                        </span>
                    )}
                </div>
                <CardBody className='p-4'>
                    <div className='cardTop flex items-center justify-between'>
                        <span className='tourLocation flex items-center gap-2 text-sm text-heading font-medium'>
                            <i className='ri-map-pin-line'></i>
                            {city}
                        </span>
                        <span className='tourRating flex items-center gap-1 text-sm text-text'>
                            <i className='ri-star-line'></i>
                            {avgRating === 0 ? null : avgRating}
                            {totalRating === 0 ? (
                                "Not Rated"
                            ) : (
                                <span>({reviews.length})</span>
                            )}
                        </span>
                    </div>

                    <h5 className='tourTitle mt-4 text-lg cursor-pointer text-heading hover:text-secondary'>
                        <Link to={`/tours/${_id}`}>{title}</Link>
                    </h5>
                    <div className='cardBottom flex items-center justify-between mt-3'>
                        <button className='bg-secondary bg-teal-600 text-white py-1 px-2 rounded'>
                            <Link
                                to={`/tours/${_id}`}
                                className='no-underline text-white'
                            >
                                Details
                            </Link>
                        </button>
                        {/* Render Map button only if lat and lng are available */}
                        {coords.lat && coords.lng && (
                            <button className='bg-secondary bg-teal-600 text-white py-1 px-2 rounded'>
                                <Link
                                    to={`/tours/map/${coords.lat}/${coords.lng}`}
                                    className='no-underline text-white'
                                >
                                    Map
                                </Link>
                            </button>
                        )}
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default TourCard;
