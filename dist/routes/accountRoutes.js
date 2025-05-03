"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const accountController_1 = require("../controllers/accountController");
const accountRouter = (0, express_1.Router)();
//@ts-ignore
accountRouter.post("/authenticate", accountController_1.authenticateAccountController);
//@ts-ignore
accountRouter.get("/:accountId/sync-status", accountController_1.checkSyncStatusController);
exports.default = accountRouter;
