"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const connectionController_1 = require("../controllers/connectionController");
const router = express_1.default.Router();
router.get("/auth", connectionController_1.authenticate);
router.post("/connect", connectionController_1.sendConnection);
exports.default = router;
