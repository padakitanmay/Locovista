import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import tourRoute from "./routes/tour.js";
import userRoute from "./routes/users.js";
import ajencyRoute from './routes/ajency.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 8000;
const corsOptions = {
    origin: true,
    credentials: true,
};

// app.get("/",(res,req)=>{
//     res.send("api is working");
// })

//connect mongodb
mongoose.set("strictQuery", false);
const connect = async () => {
    const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.szxx1ij.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;
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

//middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/tours", tourRoute);
app.use('/api/v1/ajencys', ajencyRoute);
app.use("/api/v1/users", userRoute);

app.listen(port, () => {
    connect();
    console.log("server is listening on port", port);
});
