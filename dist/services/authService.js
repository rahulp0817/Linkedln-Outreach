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
exports.authenticateAccount = authenticateAccount;
const axios_1 = __importDefault(require("axios"));
function authenticateAccount(cookies) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a, _b, _c;
        try {
            const response = yield axios_1.default.post("https://api.unipile.com/v1/accounts/connect", {
                provider: "linkedin",
                data: {
                    cookies,
                },
            }, {
                headers: {
                    Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
                    "Content-Type": "application/json"
                },
            });
            if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.status) === "connected") {
                return "success";
            }
            return "failure";
        }
        catch (error) {
            if (((_b = error.response) === null || _b === void 0 ? void 0 : _b.status) === 401) {
                return "expired";
            }
            console.error("Authentication error:", ((_c = error.response) === null || _c === void 0 ? void 0 : _c.data) || error.message);
            return "failure";
        }
    });
}
