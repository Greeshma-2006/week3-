import express from "express";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import { userRouter } from "./API/UserAPI.js";
import { productRouter } from "./API/ProductApi.js";

const app = express();

/* ---------- MIDDLEWARE ---------- */
app.use(express.json());          // parse JSON body
app.use(cookieParser());          // parse cookies

/* ---------- DATABASE CONNECTION ---------- */
mongoose.connect("mongodb://127.0.0.1:27017/MERN")
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.error("DB connection error:", err.message));

/* ---------- ROUTES ---------- */
app.use("/user-api", userRouter);
app.use("/product-api", productRouter);

/* ---------- CENTRAL ERROR HANDLER ---------- */
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "error",
    reason: err.message
  });
});

/* ---------- SERVER ---------- */
app.listen(4000, () => {
  console.log("HTTP server running on port 4000");
});
