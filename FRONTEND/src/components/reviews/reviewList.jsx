import React from 'react';
import avatar from '../../assets/images/avatar.jpg'; // Use default avatar
import { ListGroup } from 'reactstrap'; // Add this import


const ReviewList = ({ reviews }) => {
    return (
        <div className="mt-4">
            <h4 className="text-xl font-semibold">
                Reviews ({reviews?.length} reviews)
            </h4>
            {reviews?.length === 0 ? (
                <p>No reviews yet. Be the first to leave a review!</p>
            ) : (
                <ListGroup className="mt-4">
                        {reviews.map((review) => (
                            <div key={review._id} className="flex items-center gap-4 mb-6">
                                <img
                                    src={review.user?.avatar || avatar}
                                    alt="User Avatar"
                                    className="w-14 h-14 rounded-full object-cover"
                                />
                                <div className="w-full">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h5 className="text-lg font-semibold">
                                                {review.user?.username || 'Anonymous'}
                                            </h5>
                                            <p className="text-gray-500">
                                                {new Date(review.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <span className="flex items-center text-yellow-500">
                                            {review.rating} <i className="ri-star-fill"></i>
                                        </span>
                                    </div>
                                    <h6 className="text-gray-700">{review.reviewText}</h6>
                                </div>
                            </div>
                        ))}

                </ListGroup>
            )}
        </div>
    );
};

export default ReviewList;
