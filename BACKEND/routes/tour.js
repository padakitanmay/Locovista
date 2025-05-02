import express from "express";
import {
  createTour,
  updateTour,
  deleteTour,
  getSingleTour,
  getAllTour,
  getTourBySearch,
  getFeaturedTour,
  getTourCount,
  getCoordinates,
  unlockTours
} from "../controller/tourController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/createTour",upload.single("photo"), createTour);

router.post("/getCoordinates", getCoordinates);
router.get("/search/getTourBySearch", getTourBySearch);

router.get("/search/getFeaturedTours", getFeaturedTour);

router.get("/search/getTourCount", getTourCount);
router.get("/unlock-nearby", unlockTours);

router.put("/:id", verifyAdmin, updateTour);

router.delete("/:id", verifyAdmin, deleteTour);

router.get("/:id", getSingleTour);

router.get("/", getAllTour);

export default router;
