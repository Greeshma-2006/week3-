import express from "express";
import { User } from "../models/UserModel.js";
import { hash, compare } from "bcryptjs";
import jwt from "jsonwebtoken";
import { verification } from "../middlewares/verifyToken.js";

export const userRouter = express.Router();

/* ---------- GET ALL USERS ---------- */
userRouter.get("/users", async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({
      message: "Users fetched successfully",
      payload: users
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- CREATE USER ---------- */
userRouter.post("/create-user", async (req, res, next) => {
  try {
    const userData = req.body;

    // hash password before saving
    userData.password = await hash(userData.password, 10);

    const newUser = new User(userData);
    const savedUser = await newUser.save();

    res.status(201).json({
      message: "User created successfully",
      payload: savedUser
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- USER AUTHENTICATION ---------- */
userRouter.post("/auth", async (req, res, next) => {
  try {
    const userCred = req.body;
    const { username, password } = userCred;

    // check username
    const userFromDB = await User.findOne({ username });
    if (!userFromDB) {
      return res.status(404).json({ message: "Invalid username" });
    }

    // compare password
    const isMatched = await compare(password, userFromDB.password);
    if (!isMatched) {
      return res.status(404).json({ message: "Invalid password" });
    }

    // generate JWT token
    const signedToken = jwt.sign(
      { username: userFromDB.username },
      "secret",
      { expiresIn: 30 }
    );

    // store token in cookie
    res.cookie("token", signedToken, {
      httpOnly: true,
      secure: false,
      sameSite: "lax"
    });

    res.status(200).json({
      message: "Login success"
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- UPDATE USER ---------- */
userRouter.put("/update-user/:id", async (req, res, next) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "User updated successfully",
      payload: updatedUser
    });
  } catch (err) {
    next(err);
  }
});

/* ---------- DELETE USER ---------- */
userRouter.delete("/delete-user/:id", async (req, res, next) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "User deleted successfully",
      payload: deletedUser
    });
  } catch (err) {
    next(err);
  }
});
//test route 
userRouter.get("/test", verification ,(req, res) => {
  res.json("test route ");
});
