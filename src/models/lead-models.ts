import mongoose from "mongoose";

const leadSchema = new mongoose.Schema({
  leadUrl: { type: String, required: true },
  connectionStatus: {
    type: String,
    enum: ["pending", "connected", "failed", "already_connected", "invalid_url"],
    default: "Pending",
  },
  timestamp: { type: Date, default: Date.now },
});

const Lead = mongoose.model("Lead", leadSchema);
export default Lead;
