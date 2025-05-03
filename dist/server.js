"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const webhookRoutes_1 = __importDefault(require("./routes/webhookRoutes"));
const connectionRoutes_1 = __importDefault(require("./routes/connectionRoutes"));
const accountRoutes_1 = __importDefault(require("./routes/accountRoutes"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send("LinkedIn Outreach API is running ✅");
});
app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok", time: new Date().toISOString() });
});
app.use("/api/webhooks", webhookRoutes_1.default);
app.use("/api/connections", connectionRoutes_1.default);
app.use("/api/accounts", accountRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
