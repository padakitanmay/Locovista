import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import defaultAvatar from "../../assets/images/ava1.jpg"; // fallback image
import { BASE_URL } from "../../utils/config";

const Reviews = ({ tourId }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const res = await fetch(`${BASE_URL}/reviews/${tourId}`);
                const data = await res.json();
                setReviews(data);
            } catch (err) {
                console.error("Failed to load reviews", err);
            }
        };

        fetchReviews();
    }, [tourId]);

    const settings = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 300,
        swipeToSlide: true,
        autoplaySpeed: 5000,
        slidesToShow: 2,
        slidesToScroll: 1,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    return (
        <div className="my-8">
            {reviews.length > 0 ? (
                <Slider {...settings}>
                    {reviews.map((review) => (
                        <div key={review._id} className="reviews py-4 px-3">
                            <p>{review.reviewText}</p>
                            <div className="d-flex align-items-center gap-4 mt-3">
                                <img
                                    src={defaultAvatar}
                                    alt="avatar"
                                    className="w-16 h-16 rounded-full"
                                />
                                <div>
                                    <h5 className="mb-0 mt-1">
                                        {review.user?.username || "Anonymous"}
                                    </h5>
                                    <p>{review.rating} ★</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </Slider>
            ) : (
                <p className="text-gray-500 text-center">No reviews yet.</p>
            )}
        </div>
    );
};

export default Reviews;
