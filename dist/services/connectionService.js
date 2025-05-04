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
const https_1 = __importDefault(require("https"));
const httpsAgent = new https_1.default.Agent({ rejectUnauthorized: false });
const getProviderIdFromUrl = (leadUrl, accountId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    try {
        const profileHandle = (_a = leadUrl.split('linkedin.com/in/')[1]) === null || _a === void 0 ? void 0 : _a.replace('/', '');
        if (!profileHandle)
            throw new Error('Invalid LinkedIn URL format.');
        const response = yield axios_1.default.get(`${process.env.UNIPILE_BASE_URL}/api/v1/users/${profileHandle}?account_id=${accountId}`, {
            headers: {
                Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
            },
            httpsAgent,
        });
        if ((_b = response.data) === null || _b === void 0 ? void 0 : _b.provider_id) {
            return response.data.provider_id;
        }
        throw new Error('Provider ID not found.');
    }
    catch (err) {
        throw new Error(`Failed to get provider ID: ${((_d = (_c = err.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || err.message}`);
    }
});
const sendConnectionRequest = (accountId, leadUrl) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const providerId = yield getProviderIdFromUrl(leadUrl, accountId);
        const response = yield axios_1.default.post(`${process.env.UNIPILE_BASE_URL}/api/v1/users/invite`, {
            account_id: accountId,
            provider_id: 'linkedin',
            lead_url: leadUrl,
        }, {
            headers: {
                Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
                'Content-Type': 'application/json',
            },
            httpsAgent,
        });
        if (((_a = response.data) === null || _a === void 0 ? void 0 : _a.status) === 'success') {
            return {
                success: true,
                message: 'Connection request sent successfully.',
            };
        }
        else {
            return {
                success: false,
                message: ((_b = response.data) === null || _b === void 0 ? void 0 : _b.message) || 'Unipile responded with an error.',
            };
        }
    }
    catch (err) {
        return {
            success: false,
            message: `Error: ${err.message || 'Connection request failed.'}`,
        };
    }
});
exports.sendConnectionRequest = sendConnectionRequest;
