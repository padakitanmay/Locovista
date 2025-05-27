import express from "express";
import {
    AdminLogin,
    getAllPendingTours,
    AcceptTour,
    RejectTour,
} from "../controller/adminController.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

router.use(verifyAdmin);
router.post("/login", verifyAdmin, AdminLogin);
router.get("/getAllPendingReq", getAllPendingTours);
router.get("/accept/:id", AcceptTour);
router.get("/reject/:id", RejectTour);

export default router;
