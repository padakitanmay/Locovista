import express from "express";
import {
    AdminLogin,
    getAllPendingTours,
    AcceptTour,
    RejectTour,
} from "../controller/adminController.js";
import { verifyAdmin } from "../utils/verify.js";

const router = express.Router();

router.post("/login", verifyAdmin, AdminLogin);
router.get("/getAllPendingReq", verifyAdmin, getAllPendingTours);
router.get("/accept/:id", verifyAdmin, AcceptTour);
router.get("/reject/:id", verifyAdmin, RejectTour);

export default router;
