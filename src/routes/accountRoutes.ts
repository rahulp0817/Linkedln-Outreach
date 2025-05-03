import { Router } from "express";
import { authenticateAccountController } from "../controllers/accountController";

const router = Router();

// @ts-ignore
router.post("/authenticate", authenticateAccountController);

export default router;
