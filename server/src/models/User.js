import mongoose, { Types } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, default: "" },
    lastName: { type: String, default: "" },
    phone: { type: String, default: "" },
    city: { type: String, default: "" },
    ownedItems: [{ type: Types.ObjectId, ref: "Item" }],
    borrowedItems: [{ type: Types.ObjectId, ref: "Item" }],
    active: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const User = mongoose.model("users", userSchema);

export default User;
