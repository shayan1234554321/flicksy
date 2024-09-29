import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const mongoDBUrl = process.env.MONGO_URL;

mongoose.connect(mongoDBUrl, {});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB Connection Successful");
});

db.on("error", (error) => {
  console.log("MongoDB has an error:", error);
});

export default mongoose;
