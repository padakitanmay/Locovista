import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        tour: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Tours", // Ensure this matches your Tour model name
        },
        ajency: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Ajency",
        },

        reviewText: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            min: 1,
            max: 5,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Review", reviewSchema);
