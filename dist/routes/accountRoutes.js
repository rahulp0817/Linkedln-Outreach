"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const router = (0, express_1.Router)();
// @ts-ignore
router.post("/authenticate", accountController_1.authenticateAccountController);
exports.default = router;
