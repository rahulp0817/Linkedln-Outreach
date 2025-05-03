import { Request, Response } from "express";
import { authenticateAccount } from "../services/authService";
import { checkAccountSyncStatus } from "../services/syncService";

export const authenticateAccountController = async (req: Request, res: Response) => {
  const { cookies } = req.body;
  if (!cookies) return res.status(400).json({ message: "Cookies are required" });

  const status = await authenticateAccount(cookies);
  return res.status(200).json({ status });
};

export const checkSyncStatusController = async (req: Request, res: Response) => {
  const { accountId } = req.params;
  if (!accountId) return res.status(400).json({ message: "Account ID is required" });

  const status = await checkAccountSyncStatus(accountId);
  return res.status(200).json({ status });
};
