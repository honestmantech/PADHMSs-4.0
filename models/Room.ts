import mongoose from "mongoose"

export enum RoomType {
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  TWIN = "TWIN",
  SUITE = "SUITE",
  DELUXE = "DELUXE",
}

export enum RoomStatus {
  AVAILABLE = "AVAILABLE",
  OCCUPIED = "OCCUPIED",
  MAINTENANCE = "MAINTENANCE",
  RESERVED = "RESERVED",
}

const RoomSchema = new mongoose.Schema(
  {
    roomNumber: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      enum: Object.values(RoomType),
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(RoomStatus),
      default: RoomStatus.AVAILABLE,
    },
    capacity: {
      type: Number,
      required: true,
    },
    amenities: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Room || mongoose.model("Room", RoomSchema)

