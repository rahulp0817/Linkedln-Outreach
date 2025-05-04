import { Request, Response } from "express";
import { handleConnectionWebhook } from "../services/webhookService";

export const handleWebhookController = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    
    console.log(`Received webhook data: ${JSON.stringify(data)}`);
    
    const { event, profile_url, status } = data;
    if (!event || !profile_url || !status) {
      console.error("Invalid webhook payload:", data);
      return res.status(400).send("Bad Request: Missing required fields");
    }

    await handleConnectionWebhook(data);
    res.status(200).send("Webhook received");
  } catch (error) {
    console.error("Error in webhook controller:", error);
    res.status(500).send("Internal Server Error");
  }
};
