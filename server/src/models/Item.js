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
    }
  },
  { _id: false, timestamps: true },
);

const itemSchema = new mongoose.Schema({
  ownerId: { type: Types.ObjectId, required: true, index: true, ref: "User" },
  title: { type: String, required: true, index: true },
  category: {
    type: String,
    enum: [
      "Electronics",
      "Tools",
      "Transportation",
      "Gaming",
      "Books",
      "Media",
      "Clothing",
      "Musical Instruments",
    ],
    required: true,
    index: true,
  },
  model: { type: String, default: "N/A" },
  condition: {
    type: String,
    enum: ["Excellent", "Good", "Fair"],
    required: true,
    index: true,
  },
  borrowDuration: { type: Number, required: true, index: true, min: 1, max: 7 },
  description: { type: String, required: true },
  images: [{ type: String, required: true }],
  reviews: {
    averageRating: { type: Number, default: 0, min: 1, max: 5 },
    allReviews: [reviewSchema],
  },
  availability: { type: Boolean, default: true },
  visibility: { type: Boolean, default: true },
  borrowedUntil: { type: Date, default: null }, // null if available
  borrowedCount: { type: Number, default: 0 },
  value: { type: Number, required: true, min: 0 },
  price: { type: Number, required: true, index: true, min:0 }
}, { timestamps: true });

const Item = mongoose.model("items", itemSchema);

export default Item;
