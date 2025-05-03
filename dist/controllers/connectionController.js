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
exports.authenticate = exports.sendConnection = void 0;
const connectionService_1 = require("../services/connectionService");
const authService_1 = require("../services/authService");
const sendConnection = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { leadUrl } = req.body;
    const result = yield (0, connectionService_1.sendConnectionRequest)(leadUrl);
    res.status(200).json({ message: "Connection sent", result });
});
exports.sendConnection = sendConnection;
const authenticate = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cookies = _req.headers.cookie || "";
    yield (0, authService_1.authenticateAccount)(cookies);
    res.status(200).json({ message: "Authenticated with LinkedIn" });
});
exports.authenticate = authenticate;
