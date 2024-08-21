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

const PlaceDetails = () => {
    const { id } = useParams();
    const reviewMsgRef = useRef("");
    const [tourRating, setTourRating] = useState(null);

    const { data: t } = useFetch(`${BASE_URL}/tours/${id}`);

    const { photo, title, address, desc, reviews, city, distance } = t;
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
                        <div className='mb-10'>
                            {photo && photo.length > 0 && (
                                <img
                                src={`${BASE_URL.replace("/api/v1", "")}${photo}`}
                                    alt=''
                                    className='w-full mt-4 rounded-lg'
                                />
                            )}
                        </div>
                        <h2 className='text-2xl font-bold mb-4'>{title}</h2>
                        <div className='flex items-center gap-5 mb-4'>
                            <span className='flex items-center gap-1 text-lg'>
                                <i
                                    className='ri-star-line'
                                    style={{ color: "var(--secondary-color)" }}
                                ></i>
                                {avgRating === 0 ? null : avgRating}
                                {reviews && totalRating !== undefined ? (
                                    <span>({reviews.length})</span>
                                ) : (
                                    "Not Rated"
                                )}
                            </span>
                            <span className='flex items-center gap-1 text-lg'>
                                <i className='ri-map-pin-line'></i>
                                {address}
                            </span>
                        </div>
                        <div className='flex items-center gap-10 mb-8'>
                            <span className='flex items-center gap-1 text-lg'>
                                <i className='ri-map-pin-line'></i>
                                {city}
                            </span>
                            <span className='flex items-center gap-1 text-lg'>
                                <i className='ri-pin-distance-line'></i>
                                {distance} km
                            </span>
                        </div>
                        <h5 className='text-xl font-semibold mb-2'>Description</h5>
                        <p className='text-base text-gray-700'>{desc}</p>
                        <Row className='mt-6'>
                            {Array.isArray(t.photo) && t.photo.length > 1 && (
                                <Col xs='12'>
                                    <Slider>
                                        {t.photo
                                            .slice(1)
                                            .map((photo, index) => (
                                                <Card key={index} className='shadow-lg'>
                                                    <img
                                                        src={photo}
                                                        className='card-img-top'
                                                        alt=''
                                                    />
                                                </Card>
                                            ))}
                                    </Slider>
                                </Col>
                            )}
                        </Row>
                        <div className='mt-6'>
                            <h4 className='text-xl font-semibold mb-4'>
                                Reviews ({reviews?.length} reviews)
                            </h4>
                            <Form onSubmit={submitHandler}>
                                <div className='flex items-center gap-3 mb-4'>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <span
                                            key={rating}
                                            onClick={() => setTourRating(rating)}
                                            className='text-xl cursor-pointer'
                                        >
                                            {rating}{" "}
                                            <i className='ri-star-fill'></i>
                                        </span>
                                    ))}
                                </div>
                                <div className='flex items-center gap-3 border border-gray-300 p-3 rounded-full mb-4'>
                                    <input
                                        type='text'
                                        ref={reviewMsgRef}
                                        placeholder='Share your thoughts:'
                                        required
                                        className='w-full px-3 py-2 text-base border-none rounded-l-md focus:outline-none'
                                    />
                                    <button className='bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700'>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                            <ListGroup className='mt-6'>
                                {reviews?.map((review) => (
                                    <div key={review.id} className='flex items-center gap-4 mb-6'>
                                        <img
                                            src={avatar}
                                            alt=''
                                            className='w-14 h-14 rounded-full object-cover'
                                        />
                                        <div className='w-full'>
                                            <div className='flex items-center justify-between mb-2'>
                                                <div>
                                                    <h5 className='text-lg font-semibold mb-1'>{review.user}</h5>
                                                    <p className='text-sm text-gray-600'>{review.date}</p>
                                                </div>
                                                <span className='flex items-center gap-1 text-yellow-500'>
                                                    {review.rating}{" "}
                                                    <i className='ri-star-fill'></i>
                                                </span>
                                            </div>
                                            <h6 className='text-base text-gray-800'>{review.comment}</h6>
                                        </div>
                                    </div>
                                ))}
                            </ListGroup>
                        </div>
                    </Col>
                    <Col lg='4'>
                        <Booking tour={t} avgRating={avgRating} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default PlaceDetails;
