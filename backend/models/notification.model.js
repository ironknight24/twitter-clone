import mongoose from "mongoose";

const notificationsSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["like", "comment", "follow"],
      required: true,
    },
    read:{
      type: Boolean,
      default: false
    },
  },
  { timeseries: true }
);

export default mongoose.model("Notification", notificationsSchema);
