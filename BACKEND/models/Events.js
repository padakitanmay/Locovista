import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            unique: true,
        },
        city: {
            type: String,
            required: true,
        },
        photo: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
        },
        desc: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("Events", eventSchema);
