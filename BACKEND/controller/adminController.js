import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Tour from "../models/Tour.js";

export const AdminLogin = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.role != "admin") {
            return res.status(401).json({ message: "User is not Admin" });
        }

        const checkCorrectPassword = await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!checkCorrectPassword) {
            return res
                .status(401)
                .json({ success: false, message: "Wrong password!" });
        }

        const { password, role, ...rest } = user._doc;

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECERET_KEY,
            { expiresIn: "15d" }
        );

        // ✅ Set token as cookie
        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false, // Set to true in production
            sameSite: "Lax", // or 'None' if cross-domain with HTTPS
            maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
        });

        return res.status(200).json({
            token,
            success: true,
            message: "successfully login",
            data: { ...rest },
            role,
        });
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ success: false, message: "Failed to login" });
    }
};

export const getAllPendingTours = async (req, res) => {
    try {
        const pendingTours = await Tour.find({
            isApproved: false,
            isRejected: false,
        });

        if (!pendingTours) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        return res.status(200).json({
            success: true,
            message: "Tours fetched successfully",
            pendingTours,
        });
    } catch (err) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to Fetch" });
    }
};

export const AcceptTour = async (req, res) => {
    try {
        const { id } = req.params;

        const tour = await Tour.findById(id);
        if (!tour) {
            return res
                .status(404)
                .json({ success: false, message: "Tour not Found" });
        }
        tour.isApproved = true;
        tour.save();
        return res
            .status(200)
            .json({ success: true, message: "Tour Approved Successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to Accept" });
    }
};

export const RejectTour = async (req, res) => {
    try {
        const { id } = req.params;
        const tour = await Tour.findById(id);
        if (!tour) {
            return res
                .status(404)
                .json({ success: false, message: "Tour not Found" });
        }
        tour.isRejected = true;
        tour.save();
        return res
            .status(200)
            .json({ success: true, message: "Tour Approved Successfully" });
    } catch (error) {
        return res
            .status(500)
            .json({ success: false, message: "Failed to Accept" });
    }
};
