import express from "express";
import {
  sendConnection,
  authenticate,
} from "../controllers/connectionController";

const router = express.Router();

router.get("/auth", authenticate);
router.post("/connect", sendConnection);

export default router;
