import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      default: "user",
    },
    wishlist: [
  {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    default: [],
  },
],
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);