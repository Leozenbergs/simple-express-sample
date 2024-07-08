import express from "express";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js"

const conn = await dbConnect()

conn.on("error", err => {
  console.error("MongoDB connection error:", err);
  process.exit(1);
})

conn.once("open", () => {
  console.log("Database connected");
})

const app = express();
routes(app)

export default app;
