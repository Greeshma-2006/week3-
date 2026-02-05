import express from "express";
import { Product } from "../models/ProductModel.js";

export const productRouter = express.Router();

/* ---------- GET ALL PRODUCTS ---------- */
productRouter.get("/products", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      message: "Products fetched successfully",
      payload: products
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- CREATE PRODUCT ---------- */
productRouter.post("/create-product", async (req, res, next) => {
  try {
    const product = new Product(req.body);
    const savedProduct = await product.save();

    res.status(201).json({
      message: "Product created successfully",
      payload: savedProduct
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- UPDATE PRODUCT ---------- */
productRouter.put("/update-product/:id", async (req, res, next) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Product updated successfully",
      payload: updatedProduct
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- DELETE PRODUCT ---------- */
productRouter.delete("/delete-product/:id", async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Product deleted successfully"
    });
  } catch (err) {
    next(err);
  }
});
