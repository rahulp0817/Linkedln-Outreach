"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleConnectionWebhook = void 0;
const lead_models_1 = __importDefault(require("../models/lead-models"));
const handleConnectionWebhook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { event, profile_url, status } = data;
        console.log(`🔔 Webhook received: Event = ${event}, URL = ${profile_url}`);
        if (event === "connection_accepted") {
            yield lead_models_1.default.findOneAndUpdate({ leadUrl: profile_url }, { status: "connected" }, { new: true });
            console.log(`✅ Connection accepted: ${profile_url}`);
        }
        else if (event === "connection_failed") {
            yield lead_models_1.default.findOneAndUpdate({ leadUrl: profile_url }, { status: "failed" }, { new: true });
            console.warn(`❌ Connection failed: ${profile_url}`);
        }
        else {
            console.log(`ℹ️ Unhandled webhook event: ${event}`);
        }
    }
    catch (error) {
        console.error("⚠️ Error handling webhook:", error);
    }
});
exports.handleConnectionWebhook = handleConnectionWebhook;
