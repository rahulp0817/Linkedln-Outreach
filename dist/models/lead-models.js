"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const leadSchema = new mongoose_1.default.Schema({
    leadUrl: { type: String, required: true },
    connectionStatus: {
        type: String,
        enum: ["pending", "connected", "failed", "already_connected", "invalid_url"],
        default: "Pending",
    },
    timestamp: { type: Date, default: Date.now },
});
const Lead = mongoose_1.default.model("Lead", leadSchema);
exports.default = Lead;
