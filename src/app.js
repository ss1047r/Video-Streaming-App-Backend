import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//cors configuration
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

//express file configuration
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(express.cookieParser());

//routes
import userRouter from "./routes/user.route.js";

//http://localhost:3000/api/v1/users/register

//routes declaration
app.use("/api/v1/users", userRouter);

export { app };
