import express from "express";
import { handleWebhookController } from "../controllers/webhookController";

const router = express.Router();

router.post("/", handleWebhookController);

export default router;
