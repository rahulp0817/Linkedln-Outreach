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
exports.sendConnectionRequest = void 0;
const axios_1 = __importDefault(require("axios"));
const lead_models_1 = __importDefault(require("../models/lead-models"));
const sendConnectionRequest = (leadUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const response = yield axios_1.default.post(`https://api.unipile.com/v1/connections/send`, {
            profile_url: leadUrl,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
                "Content-Type": "application/json",
            },
        });
        const result = response.data;
        yield lead_models_1.default.create({
            leadUrl,
            status: result.status || "pending",
        });
        if (result.status === "already_connected")
            return "already_connected";
        if (result.status === "invalid_url")
            return "invalid_url";
        if (result.status === "connected" || result.status === "pending")
            return "success";
        return "failure";
    }
    catch (error) {
        console.error("Send Connection Error:", ((_a = error.response) === null || _a === void 0 ? void 0 : _a.data) || error.message);
        return "failure";
    }
});
exports.sendConnectionRequest = sendConnectionRequest;
