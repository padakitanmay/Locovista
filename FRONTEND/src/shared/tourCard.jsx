import React from "react";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utills/avgRating";

const TourCard = ({ tour }) => {
    const { _id, title, city, photo, price, featured, reviews } = tour;
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    return (
        <div className='relative border border-gray-200 rounded-lg shadow-lg'>
            <Card className='border-none'>
                <div className='touImg relative w-full h-44'>
                    <img src={photo} alt='tourImg' className='w-full h-full object-cover rounded-t-lg' />
                    {featured && (
                        <span className='absolute top-0 right-0 bg-primary text-white px-2 py-1 rounded-bl-lg text-xs'>
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
                        <Link to={`/ajencys/${_id}`}>{title}</Link>
                    </h5>
                    <div className='cardBottom flex items-center justify-between mt-3'>
                        <h5 className='text-xl font-semibold'>
                            ₹{price} <span className='text-sm font-normal'>/person</span>
                        </h5>
                        <button className='bg-teal-600 py-1 px-2 rounded hover:bg-gray-600'>
                            <Link to={`/ajencys/${_id}`} className='no-underline text-white '>Book Now</Link>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default TourCard;
