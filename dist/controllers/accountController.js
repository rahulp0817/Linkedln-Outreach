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
exports.authenticateAccountController = void 0;
const axios_1 = __importDefault(require("axios"));
const authenticateAccountController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        let { cookies } = req.body;
        if (!cookies || typeof cookies !== "string") {
            return res.status(400).json({ message: "Cookies are required" });
        }
        // Extract and quote JSESSIONID
        const jsessionMatch = cookies.match(/JSESSIONID=([^;]+)/);
        if (jsessionMatch) {
            const jsessionValue = jsessionMatch[1].replace(/^"|"$/g, "");
            cookies = cookies.replace(/JSESSIONID=([^;]+)/, `JSESSIONID="${jsessionValue}"`);
        }
        else {
            return res.status(400).json({ message: "JSESSIONID (csrf-token) not found in cookies" });
        }
        const headers = {
            Cookie: cookies,
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
            Accept: "application/json",
            "csrf-token": jsessionMatch[1], // include the JSESSIONID value as csrf-token
            "x-restli-protocol-version": "2.0.0",
        };
        const feedResponse = yield axios_1.default.get("https://www.linkedin.com/feed/", {
            headers,
            maxRedirects: 0,
            validateStatus: (status) => status < 400,
        });
        const isLoggedIn = feedResponse.data.includes("feed") && !feedResponse.data.includes("signin");
        if (!isLoggedIn) {
            return res.status(401).json({ status: "failure", message: "Invalid LinkedIn cookies" });
        }
        const meResponse = yield axios_1.default.get("https://www.linkedin.com/voyager/api/me", {
            headers,
        });
        const accountId = ((_b = (_a = meResponse.data) === null || _a === void 0 ? void 0 : _a.miniProfile) === null || _b === void 0 ? void 0 : _b.publicIdentifier) || ((_c = meResponse.data) === null || _c === void 0 ? void 0 : _c.id);
        return res.status(200).json({
            status: "success",
            message: "Authenticated successfully",
            accountId,
        });
    }
    catch (error) {
        console.error("LinkedIn authentication error:", ((_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) || error.message);
        return res.status(500).json({ status: "error", message: "Internal server error" });
    }
});
exports.authenticateAccountController = authenticateAccountController;
