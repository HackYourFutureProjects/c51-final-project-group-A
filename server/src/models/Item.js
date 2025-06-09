import mongoose, { Types } from "mongoose";

const itemSchema = new mongoose.Schema({
  ownerId: { type: Types.ObjectId, required: true, index: true },
  title: { type: String, required: true, index: true },
  category: {
    type: String,
    enum: ["Electronics", "Home Appliances", "Vehicles"],
    required: true,
    index: true,
  }, // Temporary enumerated categories, subject to change
  model: { type: String, default: "" },
  condition: {
    type: String,
    enum: ["Excellent", "Good", "Fair"],
    required: true,
    index: true,
  }, // Temporary enumerated conditions, subject to change
  borrowDuration: { type: Number, required: true, index: true },
  description: { type: String, required: true },
  images: { type: [String], required: true }, // implicit default value of []
  reviews: { type: [Object], required: true }, // implicit default value of []
  availability: { type: Boolean, default: true },
  borrowedUntil: { type: Date, default: null }, // null if available
  borrowedCount: { type: Number, default: 0 },
  value: { type: Number, required: true },
  price: { type: Number, required: true, index: true },
  createdAt: { type: Date, default: Date.now() },
});

const Item = mongoose.model("items", itemSchema);

export default Item;
