import express from "express";
import dotenv from "dotenv";
import webhookRoutes from "./routes/webhookRoutes";
import connectionRoutes from "./routes/connectionRoutes";
import accountRoutes from "./routes/accountRoutes";
import connectDB from "./config/db";

dotenv.config();
connectDB();

const app = express();
const PORT = 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("LinkedIn Outreach API is running ✅");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok", time: new Date().toISOString() });
});

app.use("/api/webhooks", webhookRoutes);
app.use("/api/connections", connectionRoutes);
app.use("/api/accounts", accountRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
