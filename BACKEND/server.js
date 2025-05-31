import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import fs from "fs";
import authRoute from "./routes/auth.js";
import tourRoute from "./routes/tour.js";
import userRoute from "./routes/users.js";
import ajencyRoute from "./routes/ajency.js";
import eventRoute from "./routes/events.js";
import { unlockTours } from "./controller/tourController.js";
import reviewRoutes from "./routes/review.js";
import path from "path";
import adminRouter from "./routes/admin.js";

dotenv.config();
const app = express();
// Use cookie-parser middleware
app.use(cookieParser());

// Other middlewares
app.use(express.json());
// ... your routes

const uploadDir = path.join(process.cwd(), "BACKEND/uploads");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const port = process.env.PORT || 8080;
const corsOptions = {
    origin: ["http://localhost:3000", "https://locovista.vercel.app"], // Added vercel frontend too
    methods: "GET,PATCH,POST,DELETE,PUT",
    allowedHeaders: "Origin,X-Requested-With,Content-Type,Accept,Authorization",
    credentials: true, // ✅ Allow cookies & credentials
};

app.get("/", (req, res) => {
    res.send("api is working");
});

//connect mongodb
mongoose.set("strictQuery", false);
const connect = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@locovista.ctcz6a2.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Locovista`;
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection fault");
    }
};

app.use(cors(corsOptions));
//middleware
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use("/uploads", express.static(path.resolve("./uploads")));
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/ajencys", ajencyRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/reviews", reviewRoutes);
app.use("/api/v1/events", eventRoute);
app.use("/api/v1/admin", adminRouter);

app.listen(port, () => {
    connect();
    console.log("server is listening on port", port);
});
