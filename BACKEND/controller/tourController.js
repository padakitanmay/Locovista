import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
    try {
        const newTour = new Tour(req.body);
        const savedTour = await newTour.save();

        res.status(200).json({
            success: true,
            message: "Tour successfully created",
            data: savedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to create tour",
            error: err.message,
        });
    }
};

//update tour
export const updateTour = async (req, res) => {
    const { id } = req.params;
    try {
        const updatedTour = await Tour.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        if (!updatedTour) {
            return res
                .status(404)
                .json({ success: false, message: "Tour not found" });
        }
        res.status(200).json({
            success: true,
            message: "Tour successfully updated",
            data: updatedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to update tour",
            error: err.message,
        });
    }
};

//delete tour
export const deleteTour = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTour = await Tour.findByIdAndDelete(id);
        if (!deletedTour) {
            return res
                .status(404)
                .json({ success: false, message: "Tour not found" });
        }
        res.status(200).json({
            success: true,
            message: "Tour successfully deleted",
            data: deletedTour,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to delete tour",
            error: err.message,
        });
    }
};

//getSingle tour
export const getSingleTour = async (req, res) => {
    const { id } = req.params;
    try {
        const tour = await Tour.findById(id);
        if (!tour) {
            return res
                .status(404)
                .json({ success: false, message: "Tour not found" });
        }
        res.status(200).json({ success: true, data: tour });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tour",
            error: err.message,
        });
    }
};

//getALL tour
export const getAllTour = async (req, res) => {
    //for pagination
    const page = parseInt(req.query.page);
    try {
        const tours = await Tour.find({})
            .skip(page * 8)
            .limit(8);
        res.status(200).json({
            success: true,
            count: tours.length,
            data: tours,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tours",
            error: err.message,
        });
    }
};

//get by search
export const getTourBySearch = async (req, res) => {
    // Assuming you pass the search criteria in the request query parameters
    const { city, distance, maxGroupSize } = req.query;

    // Construct a filter object based on the provided search criteria
    const filter = {};
    if (city) {
        filter.city = city;
    }
    if (distance) {
        filter.distance = { $lte: parseInt(distance) };
    }
    if (maxGroupSize) {
        filter.maxGroupSize = { $lte: parseInt(maxGroupSize) };
    }

    try {
        // Use the filter object to find tours that match the search criteria
        const tours = await Tour.find(filter);

        res.status(200).json({ success: true, data: tours });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tours based on search",
            error: err.message,
        });
    }
};

//get featured tour
export const getFeaturedTour = async (req, res) => {
    try {
        const tours = await Tour.find({ featured: true }).limit(8);
        res.status(200).json({ success: true, data: tours });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tours",
            error: err.message,
        });
    }
};

//get tour conut
export const getTourCount = async (req, res) => {
    try {
        const tourCount = await Tour.estimatedDocumentCount();
        res.status(200).json({ success: true, data: tourCount });
    } catch (err) {
        res.status(500).json({ success: false, message: "Failed to fetch" });
    }
};

export const getCoordinates = async (req, res) => {
    const { address } = req.body;
    const apiKey = process.env.OPENCAGE_API_KEY;
    return await fetch(
        `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
            address
        )}&key=${apiKey}`
    )
        .then((response) => {
            if (!response.ok) {
                throw new Error("Something went wrong!");
            }
            return response.json();
        })
        .then((data) => {
            if (data.results.length === 0) {
                throw new Error("No valid address");
            }
            const { lat, lng } = data.results[0].geometry;
            res.status(200).json({ lat: lat, lng: lng });
        });
};
