import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";
import express from "express";

const app = express()
const port = process.env.PORT

dotenv.config({
  path: "./env",
});

//database connection function call and server setup
connectDB()
  .then(() => {
    app.on("error", (error) => {
      console.log("ERROR : ", error);
      throw error
    });

    app.listen(port, () => {
      console.log(`Server started at port http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.log("Database Connection Failed :", error);
  });
