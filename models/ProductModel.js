import { Schema, model } from "mongoose";

/* ---------- PRODUCT SCHEMA ---------- */
const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"]
  },
  price: {
    type: Number,
    required: [true, "Product price is required"]
  },
  category: {
    type: String,
    required: [true, "Product category is required"]
  }
});

/* ---------- PRODUCT MODEL ---------- */
export const Product = model("Product", productSchema);
