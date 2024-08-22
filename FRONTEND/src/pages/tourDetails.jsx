import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState } from "react";
import avatar from "../assets/images/avatar.jpg";
import calculateAvgRating from "../utills/avgRating";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, ListGroup, Card } from "reactstrap";
import Booking from "../components/booking/booking";
import useFetch from "../hooks/useFetch";
import { BASE_URL } from "../utills/config";


const TourDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef("");
    const [tourRating, setTourRating] = useState(null);

    const { data } = useFetch(`${BASE_URL}/ajencys/${id}`);
    const {
        photo,
        title,
        address,
        desc,
        price,
        reviews,
        city,
        distance,
        maxGroupSize,
    } = data;
    const { totalRating, avgRating } = calculateAvgRating(reviews);

    const submitHandler = (e) => {
        e.preventDefault();
        const reviewText = reviewMsgRef.current.value;
        alert(`${reviewText}, ${tourRating}`);
    };

    return (
        <section>
            <Container>
                <Row>
                    <Col lg='8'>
                        <div className='w-full mt-4 mb-10'>
                            {photo && photo.length > 0 && (
                                <img
                                src={`http://localhost:4000${photo[0]}`}
                                    alt=''
                                    className='w-full rounded-md mb-10'
                                />
                            )}
                        </div>
                        <h2 className='text-2xl font-bold'>{title}</h2>
                        <div className='flex items-center gap-5'>
                            <span className='flex items-center gap-1 text-base text-gray-700'>
                                <i className='ri-star-line text-yellow-500'></i>
                                {avgRating === 0 ? null : avgRating}
                                {reviews && totalRating !== undefined ? (
                                    <span>({reviews.length})</span>
                                ) : (
                                    "Not Rated"
                                )}
                            </span>
                            <span className='flex items-center text-gray-700'>
                                <i className='ri-map-pin-line'></i>
                                {address}
                            </span>
                        </div>
                        <div className='flex items-center gap-10 mt-4 mb-8'>
                            <span className='flex items-center text-gray-700'>
                                <i className='ri-map-pin-line'></i>
                                {city}
                            </span>
                            <span className='flex items-center text-gray-700'>
                                <i className='ri-pin-distance-line'></i>
                                {distance} km
                            </span>
                            <span className='flex items-center text-gray-700'>
                                <i className='ri-money-dollar-box-line'></i>₹
                                {price} /person
                            </span>
                            <span className='flex items-center text-gray-700'>
                                <i className='ri-group-line'></i>
                                {maxGroupSize} people
                            </span>
                        </div>
                        <h5 className='text-xl font-semibold'>Description</h5>
                        <p className='text-gray-700'>{desc}</p>
                        <Row className='mt-6'>
                            {Array.isArray(data.photo) &&
                                data.photo.length > 1 && (
                                    <Col xs='12'>
                                        <Slider>
                                            {data.photo
                                                .slice(1)
                                                .map((photo, index) => (
                                                    <Card
                                                        key={index}
                                                        className='border-none'
                                                    >
                                                        <img
                                                            src={`http://localhost:4000${photo}`}
                                                            alt=''
                                                            className='w-full rounded-md h-36'
                                                        />
                                                    </Card>
                                                ))}
                                        </Slider>
                                    </Col>
                                )}
                        </Row>
                        <div className='mt-8'>
                            <h4 className='text-xl font-semibold'>
                                Reviews ({reviews?.length} reviews)
                            </h4>
                            <Form onSubmit={submitHandler} className='mt-4'>
                                <div className='flex items-center gap-3 mt-4'>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <span
                                            key={rating}
                                            onClick={() =>
                                                setTourRating(rating)
                                            }
                                            className='flex items-center text-yellow-500 cursor-pointer'
                                        >
                                            {rating}{" "}
                                            <i className='ri-star-fill'></i>
                                        </span>
                                    ))}
                                </div>
                                <div className='w-full flex items-center justify-center mt-4 mb-4 p-2 border border-gray-400 rounded-full'>
                                    <input
                                        type='text'
                                        ref={reviewMsgRef}
                                        placeholder=' Share your thoughts :'
                                        required
                                        className='w-full p-2 text-lg border-none focus:outline-none'
                                    />
                                    <button className='btn bg-primary text-white ml-2'>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                            <ListGroup className='mt-4'>
                                {reviews?.map((review) => (
                                    <div
                                        key={review.id}
                                        className='flex items-center gap-4 mb-6'
                                    >
                                        <img
                                            src={avatar}
                                            alt=''
                                            className='w-14 h-14 rounded-full object-cover'
                                        />
                                        <div className='w-full'>
                                            <div className='flex items-center justify-between'>
                                                <div>
                                                    <h5 className='text-lg font-semibold'>
                                                        {review.user}
                                                    </h5>
                                                    <p className='text-gray-500'>
                                                        {review.date}
                                                    </p>
                                                </div>
                                                <span className='flex items-center text-yellow-500'>
                                                    {review.rating}{" "}
                                                    <i className='ri-star-fill'></i>
                                                </span>
                                            </div>
                                            <h6 className='text-gray-700'>
                                                {review.comment}
                                            </h6>
                                        </div>
                                    </div>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='4'>
                        <Booking tour={data} avgRating={avgRating} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TourDetails;
