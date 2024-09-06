import dotenv from "dotenv";
import connectDB from "./db/dbConnection.js";
import { app } from "./app.js";

dotenv.config({
  path: "./env",
});

//database connection function call and server setup
connectDB()
  .then(() => {
    // app.on("error", (error) => {
    //   console.log("ERROR : ", error);
    //   throw error
    // });

    app.listen(process.env.PORT, () => {
      console.log(`Server started at port http://localhost:${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("Database Connection Failed :", error);
  });
