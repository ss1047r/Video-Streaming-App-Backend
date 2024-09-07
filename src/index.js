import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";
// import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

//database connection function call and server setup
connectDB()
  .then(() => {
    app.listen(process.env.PORT || 4000, () => {
      console.log(
        `Server started at port ${process.env.PORT}`
      );
    });
    app.on("error", (error) => {
      console.log("ERROR : ", error);
      throw error;
    });
  })
  .catch((error) => {
    console.log("Database Connection Failed :", error);
  });
