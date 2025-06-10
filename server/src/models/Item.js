import mongoose, { Types } from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { _id: false },
);

const itemSchema = new mongoose.Schema({
  ownerId: { type: Types.ObjectId, required: true, index: true },
  title: { type: String, required: true, index: true },
  category: {
    type: String,
    enum: [
      "Electronics",
      "Tools",
      "Transportation",
      "Gaming",
      "Books",
      "Entertainment",
      "Clothing",
      "Musical Instruments",
    ],
    required: true,
    index: true,
  },
  model: { type: String, default: "" },
  condition: {
    type: String,
    enum: ["Excellent", "Good", "Fair"],
    required: true,
    index: true,
  },
  borrowDuration: { type: Number, required: true, index: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  reviews: {
    averageRating: { type: Number, default: 0, min: 1, max: 5 },
    allReviews: [reviewSchema],
  },
  availability: { type: Boolean, default: true },
  borrowedUntil: { type: Date, default: null }, // null if available
  borrowedCount: { type: Number, default: 0 },
  value: { type: Number, required: true },
  price: { type: Number, required: true, index: true },
  createdAt: { type: Date, default: Date.now() },
});

const Item = mongoose.model("items", itemSchema);

export default Item;
