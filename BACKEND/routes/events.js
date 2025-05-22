import express from "express";
import { createEvent } from "../controller/eventController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Create a new review
router.post("/", upload.single("photo"), createEvent);

export default router;
