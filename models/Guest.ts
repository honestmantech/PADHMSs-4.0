import mongoose from "mongoose"

const GuestSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: false,
    },
    address: {
      type: String,
      required: false,
    },
    idNumber: {
      type: String,
      required: false,
    },
    idType: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Guest || mongoose.model("Guest", GuestSchema)

