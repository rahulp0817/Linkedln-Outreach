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
exports.handleSendConnectionRequest = void 0;
const connectionService_1 = require("../services/connectionService");
const handleSendConnectionRequest = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lead_url } = req.body;
    const { accountId } = req.params;
    if (!lead_url || !accountId) {
        return res.status(400).json({ error: 'Missing leadUrl or accountId' });
    }
    try {
        const result = yield (0, connectionService_1.sendConnectionRequest)(accountId, lead_url);
        if (result.success) {
            return res.status(200).json({ message: result.message });
        }
        else {
            return res.status(400).json({ error: result.message });
        }
    }
    catch (err) {
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.handleSendConnectionRequest = handleSendConnectionRequest;
