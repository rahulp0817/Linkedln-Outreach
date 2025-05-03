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
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleWebhookController = void 0;
const webhookService_1 = require("../services/webhookService");
const handleWebhookController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        // Optional: Log the received data for debugging purposes
        console.log(`Received webhook data: ${JSON.stringify(data)}`);
        // Validate the incoming data
        const { event, profile_url, status } = data;
        if (!event || !profile_url || !status) {
            console.error("Invalid webhook payload:", data);
            return res.status(400).send("Bad Request: Missing required fields");
        }
        yield (0, webhookService_1.handleConnectionWebhook)(data);
        res.status(200).send("Webhook received");
    }
    catch (error) {
        console.error("Error in webhook controller:", error);
        res.status(500).send("Internal Server Error");
    }
});
exports.handleWebhookController = handleWebhookController;
