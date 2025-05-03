import { Router } from "express";
import {
  authenticateAccountController, 
  checkSyncStatusController,
} from "../controllers/accountController";

const accountRouter = Router();

//@ts-ignore
accountRouter.post("/authenticate", authenticateAccountController);

//@ts-ignore
accountRouter.get("/:accountId/sync-status", checkSyncStatusController);

export default accountRouter;
