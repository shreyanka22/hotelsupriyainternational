import mongoose from "mongoose"

const reviewSchema = new mongoose.Schema({
  guestName: { type: String, required: true, trim: true },
  rating:    { type: Number, required: true, min: 1, max: 5 },
  comment:   { type: String, required: true, trim: true },
  roomType:  { type: String, trim: true },
  avatar:    { type: String, default: "" },   // optional initials avatar
  featured:  { type: Boolean, default: false },
}, { timestamps: true })

export default mongoose.model("Review", reviewSchema)