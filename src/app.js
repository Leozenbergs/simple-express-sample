import express from "express";
import errorHandler from "./middlewares/errorHandler.js";
import dbConnect from "./config/dbConnect.js";
import routes from "./routes/index.js"
import notFoundHandler from "./middlewares/notFoundHandler.js";

const conn = await dbConnect()

conn.on("error", err => {
  console.log.bind(console, "MongoDB connection error:", err);
})

conn.once("open", () => {
  console.log("Database connected");
})

const app = express();
routes(app)

// middlewares
app.use(notFoundHandler);
app.use(errorHandler)

export default app;
