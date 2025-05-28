import express from "express";
import {
    createReview,
    getTourReviews,
} from "../controller/reviewController.js";
import { verifyAdmin, verifyUser } from "../utils/verify.js";

const router = express.Router();

// Create a new review
router.post("/", createReview);

// Get all reviews for a specific tour
router.get("/:tourId", getTourReviews);

export default router;
