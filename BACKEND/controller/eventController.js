import Event from "../models/Events.js";

export const createEvent = async (req, res) => {
    try {
        const { Title, City, Date, Description } = req.body;

        const event = await Event.create({
            title: Title,
            city: City,
            desc: Description,
            date: Date,
            photo: `/uploads/${req.file.filename}`,
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
