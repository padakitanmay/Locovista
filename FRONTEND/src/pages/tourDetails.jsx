import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import React, { useRef, useState } from "react";
import "./tourDetails.css";
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

    const { data: t } = useFetch(`${BASE_URL}/ajencys/${id}`);

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
    } = t;
    console.log();
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
                        <div className='tourContent'>
                            {photo && photo.length > 0 && (
                                <img src={photo[0]} alt='' />
                            )}
                        </div>
                        <h2>{title}</h2>
                        <div className='d-flex align-items-center gap-5'>
                            <span className='tourRating d-flex align-items-center gap-1'>
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
                            <span>
                                <i className='ri-map-pin-line'></i>
                                {address}
                            </span>
                        </div>
                        <div className='extraDetails'>
                            <span>
                                <i className='ri-map-pin-line'></i>
                                {city}
                            </span>
                            <span>
                                <i className='ri-pin-distance-line'></i>
                                {distance} k/m
                            </span>
                            <span>
                                <i className='ri-money-dollar-box-line'></i>₹
                                {price} /person
                            </span>
                            <span>
                                <i className='ri-group-line'></i>
                                {maxGroupSize} people
                            </span>
                        </div>
                        <h5>Description</h5>
                        <p>{desc}</p>
                        {/* </div> */}
                        <Row className='mt-3'>
                            {Array.isArray(t.photo) && t.photo.length > 1 && (
                                <Col xs='12'>
                                    <Slider>
                                        {t.photo
                                            .slice(1)
                                            .map((photo, index) => (
                                                <Card key={index}>
                                                    <img
                                                        src={photo}
                                                        alt=''
                                                        className='card-img-top'
                                                    />
                                                </Card>
                                            ))}
                                    </Slider>
                                </Col>
                            )}
                        </Row>
                        <div className='tourReviews mt-4'>
                            <h4>Reviews ({reviews?.length} reviews)</h4>
                            <Form onSubmit={submitHandler}>
                                <div className='ratingGroup d-flex align-items-center gap-3 mt-4'>
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <span
                                            key={rating}
                                            onClick={() =>
                                                setTourRating(rating)
                                            }
                                        >
                                            {rating}{" "}
                                            <i className='ri-star-fill'></i>
                                        </span>
                                    ))}
                                </div>
                                <div className='reviewInput'>
                                    <input
                                        type='text'
                                        ref={reviewMsgRef}
                                        placeholder=' Share your thoughts :'
                                        required
                                    />
                                    <button className='btn primary_btn text-white'>
                                        Submit
                                    </button>
                                </div>
                            </Form>
                            <ListGroup className='userReview'>
                                {reviews?.map((review) => (
                                    <div key={review.id} className='reviewItem'>
                                        <img src={avatar} alt='' />
                                        <div className='w-100'>
                                            <div className='d-flex align-items-center justify-content-between'>
                                                <div>
                                                    <h5>{review.user}</h5>
                                                    <p>{review.date}</p>
                                                </div>
                                                <span className='d-flex align-items-center'>
                                                    {review.rating}{" "}
                                                    <i className='ri-star-fill'></i>
                                                </span>
                                            </div>
                                            <h6>{review.comment}</h6>
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
//faltu comment
//one more
export default TourDetails;
