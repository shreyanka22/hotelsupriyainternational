import mongoose from "mongoose"

const enquirySchema = new mongoose.Schema({
  name:      { type: String, required: true, trim: true },
  email:     { type: String, required: true, trim: true, lowercase: true },
  phone:     { type: String, required: true, trim: true },
  roomType:  { type: String, required: true },
  checkIn:   { type: Date,   required: true },
  checkOut:  { type: Date,   required: true },
  guests:    { type: Number, default: 1 },
  message:   { type: String, trim: true },
  status: {
    type: String,
    enum: ["new", "contacted", "resolved"],
    default: "new",
  },
}, { timestamps: true })

export default mongoose.model("Enquiry", enquirySchema)