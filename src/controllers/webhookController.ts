import { Request, Response } from "express";
import { handleConnectionWebhook } from "../services/webhookService";

export const handleWebhookController = async (req: Request, res: Response) => {
  await handleConnectionWebhook(req.body);
  res.status(200).send("Webhook received");
};
