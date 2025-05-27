import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import Booking from "../components/booking/booking";
import ReviewForm from "../components/reviews/reviewForm";
import ReviewList from "../components/reviews/reviewList";
import useFetch from "../hooks/useFetch";
import { BASE_URL, PHOTO_URL } from "../utills/config";
import calculateAvgRating from "../utills/avgRating";

const TourDetails = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const { data: tour } = useFetch(`${BASE_URL}/ajencys/${id}`);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(
                    `${BASE_URL}/reviews/tour/${id}?type=ajency`
                );
                if (!res.ok) throw new Error("Failed to fetch reviews");
                const data = await res.json();
                setReviews(data);
            } catch (err) {
                console.error(err.message);
            }
        };

        if (id) {
            fetchReviews();
        }
    }, [id]);

    const submitReviewHandler = async (rating, reviewText) => {
        try {
            const token = localStorage.getItem("token");
            const user = JSON.parse(localStorage.getItem("user"));

            if (!token) {
                alert("Please log in to submit a review.");
                return;
            }

            const res = await fetch(`${BASE_URL}/reviews`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                credentials: "include",
                body: JSON.stringify({
                    tourId: id,
                    review: reviewText,
                    rating: rating,
                    userId: user?._id,
                    type: "ajency",
                }),
            });

            if (!res.ok) {
                throw new Error("Failed to submit review");
            }

            alert("Review submitted successfully!");

            // Fetch reviews again after new review
            const updated = await fetch(
                `${BASE_URL}/reviews/tour/${id}?type=ajency`
            );
            const updatedReviews = await updated.json();
            setReviews(updatedReviews);
        } catch (err) {
            alert("Error submitting review: " + err.message);
        }
    };

    if (!tour) return <p>Loading...</p>;

    const { title, photo, desc, price, city, distance, maxGroupSize, address } =
        tour || {};

    const { totalRating, avgRating } = calculateAvgRating(reviews);

    return (
        <section>
            <Container>
                <Row>
                    <Col lg="8">
                        <div className="w-full mt-4 mb-10">
                            {photo && photo.length > 0 && (
                                <img
                                    src={`${PHOTO_URL}${photo[0]}`}
                                    alt=""
                                    className="w-full rounded-md mb-10"
                                />
                            )}
                        </div>
                        <h2 className="text-2xl font-bold">{title}</h2>

                        <div className="flex items-center gap-5 mb-3">
                            <span className="text-gray-700">
                                <i className="ri-star-line text-yellow-500"></i>{" "}
                                {avgRating || "Not Rated"} ({reviews.length})
                            </span>
                            <span className="text-gray-700">
                                <i className="ri-map-pin-line"></i> {address}
                            </span>
                        </div>

                        <div className="flex items-center gap-10 mb-4">
                            <span className="text-gray-700">
                                <i className="ri-map-pin-line"></i> {city}
                            </span>
                            <span className="text-gray-700">
                                <i className="ri-pin-distance-line"></i>{" "}
                                {distance} km
                            </span>
                            <span className="text-gray-700">
                                <i className="ri-money-dollar-box-line"></i> ₹
                                {price} /person
                            </span>
                            <span className="text-gray-700">
                                <i className="ri-group-line"></i> {maxGroupSize}{" "}
                                people
                            </span>
                        </div>

                        <div className="mb-8">
                            <h5 className="text-xl font-semibold">
                                Description
                            </h5>
                            <p className="text-gray-700">{desc}</p>
                        </div>

                        {photo && photo.length > 1 && (
                            <Slider>
                                {photo.slice(1).map((img, index) => (
                                    <div key={index}>
                                        <img
                                            src={`${PHOTO_URL}${img}`}
                                            alt={`Tour ${index}`}
                                            className="w-full rounded-md h-55"
                                        />
                                    </div>
                                ))}
                            </Slider>
                        )}

                        <div className="mt-8">
                            <h4 className="text-xl font-semibold">
                                Reviews ({reviews.length})
                            </h4>
                            <ReviewForm onSubmit={submitReviewHandler} />
                            <ReviewList reviews={reviews} />
                        </div>
                    </Col>

                    <Col lg="4">
                        <Booking tour={tour} avgRating={avgRating} />
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default TourDetails;
