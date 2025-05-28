import Tour from "../models/Tour.js";

export const createTour = async (req, res) => {
    try {
        const { Title, City, Address, Distance, Description, isHidden } =
            req.body;

        const { lat, lng } = await getCoordinatesFromAddress(Address);

        const tour = await Tour.create({
            title: Title,
            city: City,
            address: Address,
            distance: Distance,
            desc: Description,
            photo: `/uploads/${req.file.filename}`,
            isHidden,
            location: {
                type: "Point",
                coordinates: [lat, lng],
            },
        });

        res.status(200).json({
            success: true,
            message: "Tour successfully created",
            data: tour,
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
    console.log(page);
    
    try {
        const tours = await Tour.find({isApproved : true})
            .skip(page * 8)
            .limit(8);

        console.log(tours.length)
       return res.status(200).json({
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
        filter.isApproved = true;
    }
    // if (distance) {
    //     filter.distance = { $lte: parseInt(distance) };
    // }
    // if (maxGroupSize) {
    //     filter.maxGroupSize = { $lte: parseInt(maxGroupSize) };
    // }

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
        const tours = await Tour.find({ featured: true, isApproved : true }).limit(8);
        res.status(200).json({ success: true, data: tours });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch tours based on featured",
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

    try {
        const { lat, lng } = await getCoordinatesFromAddress(address);
        res.status(200).json({ lat: lat, lng: lng });
    } catch (error) {
        // Handle any errors (network, validation, etc.)
        res.status(400).json({ message: error.message });
    }
};

export const unlockTours = async (req, res) => {
    const { lat, lng } = req.query;

    // Parse and construct user location
    const userLocation = [parseFloat(lng), parseFloat(lat)];

    // MongoDB geospatial query
    const nearbyTours = await Tour.find({
        location: {
            $near: {
                $geometry: {
                    type: "Point",
                    coordinates: userLocation,
                },
                $maxDistance: 400000, // within 400 km
            },
        },
    });

    res.json(nearbyTours);
};

async function getCoordinatesFromAddress(address) {
    const apiKey = process.env.OPENCAGE_API_KEY;
    try {
        const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(
                address
            )}&key=${apiKey}`
        );

        if (!response.ok) {
            throw new Error("Something went wrong!");
        }

        const data = await response.json();

        // Check if any results are returned
        if (data.results.length === 0) {
            throw new Error("No valid address");
        }

        // Extract the first result from OpenCage response
        const result = data.results[0];
        const confidence = result.confidence;
        const category = result.components._type || result.components.category;

        // Validate based on confidence score and category
        // if (
        //     confidence < 6 ||
        //     !["attraction", "tourism", "place", "building", "city"].includes(
        //         category
        //     )
        // ) {
        //     throw new Error("Suspicious or invalid location.");
        // }

        // If everything is fine, return the coordinates
        const { lat, lng } = result.geometry;
        return { lat, lng };
    } catch (error) {
        console.log(error.message);
    }
}
