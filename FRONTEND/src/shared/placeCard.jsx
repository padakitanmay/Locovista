import React from "react";
import "./placeCard.css";
import { Card, CardBody } from "reactstrap";
import { Link } from "react-router-dom";
import calculateAvgRating from "../utills/avgRating";
const TourCard = ({ tour }) => {
    const { _id, title, city, photo, featured, reviews } = tour;
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    return (
        <div className='tourCard'>
            <Card>
                <div className='touImg'>
                    <img src={photo} alt='tourImg' />
                    {featured && <span>Featured</span>}
                </div>
                <CardBody>
                    <div className='cardTop d-flex align-itmes-center justify-content-between'>
                        <span className='tourLocation d-flex align-items-center gap-2'>
                            <i class='ri-map-pin-line'></i>
                            {city}
                        </span>
                        <span className='tourRating d-flex align-items-center gap-1'>
                            <i class='ri-star-line'></i>
                            {avgRating === 0 ? null : avgRating}
                            {totalRating === 0 ? (
                                "Not Rated"
                            ) : (
                                <span>({reviews.length})</span>
                            )}
                        </span>
                    </div>

                    <h5 className='tourTitle'>
                        <Link to={`/tours/${_id}`}>{title}</Link>
                    </h5>
                    <div className='cardBottom d-flex align-items-right justify-content-between mt-3'>
                        <button className='btn bookinBtn'>
                            <Link to={`/tours/${_id}`}>Details</Link>
                        </button>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
};

export default TourCard;
