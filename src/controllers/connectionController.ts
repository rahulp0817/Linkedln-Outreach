import { Request, Response } from "express";
import { sendConnectionRequest } from "../services/connectionService";
import { authenticateAccount } from "../services/authService";

export const sendConnection = async (req: Request, res: Response) => {
  const { leadUrl } = req.body;
  const result = await sendConnectionRequest(leadUrl);
  res.status(200).json({ message: "Connection sent", result });
};

export const authenticate = async (_req: Request, res: Response) => {
  const cookies = _req.headers.cookie || "";
  await authenticateAccount(cookies);
  res.status(200).json({ message: "Authenticated with LinkedIn" });
};
