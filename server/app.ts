import { Request, Response, NextFunction } from "express"
require("dotenv").config();
import express from "express";
import morgan from "morgan";
// const fileUpload = require("express-fileupload");
import cors from "cors";

import fileUpload from "express-fileupload";
import authRoutes from "./routes/authRoutes"
import userRoutes from "./routes/userRoutes"

const app = express();
// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);
app.use(morgan("tiny"));

// import routes here
// const editProfileRoute = require("./routes/editProfileRoute");
// const chatRoute = require("./routes/chatRoute");
// const messageRoute = require("./routes/messageRoute");

// route middleware
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
// app.use("/api/v1", editProfileRoute);
// app.use("/api/v1/chat", chatRoute);
// app.use("/api/v1/message", messageRoute);
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack, 'error occured');
    res.status(200).json({
        message: err.message,
        code: err.code,
        name: err.name,
        stack: err.stack,
    });
});

export default app