import Review from "../models/Review.js";
import Tour from "../models/Tour.js";
import Ajency from "../models/Ajency.js"
import { login } from "./authController.js";



export const createReview = async (req, res) => {
 // const itemId = req.params.tourId; // ID for either Tour or Ajency
  const { tourId,review, rating, userId, type } = req.body;

  const newReview = new Review({
    user: userId,
    reviewText: review,
    rating,
      ...(type === "ajency" ? { ajency: tourId } : { tour: tourId }),
  });

  try {
    const savedReview = await newReview.save();

    const model = type === "ajency" ? Ajency : Tour;
      const updated = await model.findByIdAndUpdate(tourId, {
      $push: { reviews: savedReview._id },
    });

    if (!updated) {
      return res.status(404).json({ success: false, message: `${type} not found` });
    }

    res.status(200).json({
      success: true,
      message: "Review submitted",
      data: savedReview,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Failed to submit review",
      error: err.message,
    });
  }
};



// Get all reviews for a specific tour
export const getTourReviews = async (req, res) => {
    try {
        const { tourId } = req.params;
        console.log(tourId);
        
        const reviews = await Review.find({ tour: tourId }).populate("user", "username");
        console.log(reviews);

        res.status(200).json(reviews);
    } catch (err) {
        res.status(500).json({ message: "Failed to fetch reviews", error: err.message });
    }
};
