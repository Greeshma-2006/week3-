import { Schema, model } from "mongoose";

/* ---------- USER SCHEMA ---------- */
const userSchema = new Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    minlength: 4,
    maxlength: 15
  },
  password: {
    type: String,
    required: [true, "Password is required"]
  },
  age: {
    type: Number,
    required: true,
    min: 18,
    max: 25
  }
});

/* ---------- USER MODEL ---------- */
export const User = model("User", userSchema);
