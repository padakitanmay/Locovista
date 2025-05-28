import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//user register
export const register = async (req, res) => {
    try {
        //hashing passwords
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            role: req.body.role,
        });

        await newUser.save();

        res.status(200).json({
            success: true,
            message: "Successfully registered!",
        });
    } catch (err) {
        res.status(200).json({ success: false, message: "Failed to create!" });
    }
};

// user login
export const login = async (req, res) => {
    const email = req.body.email;
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found!" });
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

        const { password, ...rest } = user._doc;

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
            role: user?._doc?.role,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Failed to login" });
    }
};
