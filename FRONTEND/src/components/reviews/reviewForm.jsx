import React, { useState, useRef } from "react";

const ReviewForm = ({ onSubmit }) => {
    const [rating, setRating] = useState(null);
    const reviewMsgRef = useRef("");

    const submitHandler = (e) => {
        e.preventDefault();

        if (!rating || reviewMsgRef.current.value === "") {
            alert("Please provide a rating and a review!");
            return;
        }

        onSubmit(rating, reviewMsgRef.current.value);
    };

    return (
        <form onSubmit={submitHandler} className="mt-4">
            <div className="flex items-center gap-3 mt-4">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => setRating(star)}
                        className={`flex items-center cursor-pointer ${
                            rating >= star ? "text-yellow-500" : "text-gray-400"
                        }`}
                    >
                        {star} <i className="ri-star-fill"></i>
                    </span>
                ))}
            </div>
            <div className="w-full flex items-center justify-center mt-4 mb-4 p-2 border border-gray-400 rounded-full">
                <input
                    type="text"
                    ref={reviewMsgRef}
                    placeholder="Share your thoughts:"
                    required
                    className="w-full p-2 text-lg border-none focus:outline-none"
                />
                <button className="btn bg-primary text-white ml-2">
                    Submit
                </button>
            </div>
        </form>
    );
};

export default ReviewForm;
