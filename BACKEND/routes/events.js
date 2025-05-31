import express from "express";
import { createEvent, getAllEvents } from "../controller/eventController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

// Create a new review
router.post("/createEvent", upload.single("photo"), createEvent);
router.get("/getAllEvents", getAllEvents);

export default router;
