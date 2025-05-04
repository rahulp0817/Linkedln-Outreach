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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkAccountSyncStatus = checkAccountSyncStatus;
const axios_1 = __importDefault(require("axios"));
function checkAccountSyncStatus(accountId) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const response = yield axios_1.default.get(`${process.env.UNIPILE_BASE_URL}/accounts/${accountId}`, {
                headers: {
                    Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
                },
            });
            console.log("🔵 Unipile Response:", response.data);
            const accountStatus = (_a = response.data) === null || _a === void 0 ? void 0 : _a.status;
            if (accountStatus === "connected")
                return "valid";
            if (accountStatus === "expired")
                return "expired";
            return "re-auth-required";
        }
        catch (error) {
            if (error.response) {
                console.error("🔴 API Error Response:", error.response.data);
                console.error("🔴 Status:", error.response.status);
            }
            else {
                console.error("🔴 Error Message:", error.message);
            }
            return "re-auth-required";
        }
    });
}
