"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSyncStatusController = exports.authenticateAccountController = void 0;
const authService_1 = require("../services/authService");
const syncService_1 = require("../services/syncService");
const authenticateAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { cookies } = req.body;
    if (!cookies)
        return res.status(400).json({ message: "Cookies are required" });
    const status = yield (0, authService_1.authenticateAccount)(cookies);
    return res.status(200).json({ status });
});
exports.authenticateAccountController = authenticateAccountController;
const checkSyncStatusController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { accountId } = req.params;
    if (!accountId)
        return res.status(400).json({ message: "Account ID is required" });
    const status = yield (0, syncService_1.checkAccountSyncStatus)(accountId);
    return res.status(200).json({ status });
});
exports.checkSyncStatusController = checkSyncStatusController;
