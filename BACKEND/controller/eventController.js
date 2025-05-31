import Event from "../models/Events.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const createEvent = async (req, res) => {
    try {
        const { Title, City, Date, Description } = req.body;

        const cloudPath = await uploadOnCloudinary(req.file.path);

        const event = await Event.create({
            title: Title,
            city: City,
            desc: Description,
            date: Date,
            photo: cloudPath.url,
        });

        res.status(200).json({
            success: true,
            message: "Event successfully created",
            data: event,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create event",
            error: err.message,
        });
    }
};

export const getAllEvents = async (req, res) => {
    try {
        const events = await Event.find();
        res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            data: events,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch events",
            error: err.message,
        });
    }
};
