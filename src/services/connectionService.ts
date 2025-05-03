import axios from "axios";
import Lead from "../models/lead-models";

export type RequestStatus = "success" | "already_connected" | "invalid_url" | "failure";

export const sendConnectionRequest = async (leadUrl: string): Promise<RequestStatus> => {
  try {
    const response = await axios.post(
      `https://api.unipile.com/v1/connections/send`,
      {
        profile_url: leadUrl,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const result = response.data;

    // Store in DB
    await Lead.create({
      leadUrl,
      status: result.status || "pending", 
    });

    // Check response and return status
    if (result.status === "already_connected") return "already_connected";
    if (result.status === "invalid_url") return "invalid_url";
    if (result.status === "connected" || result.status === "pending") return "success";

    return "failure";
  } catch (error: any) {
    console.error("Send Connection Error:", error.response?.data || error.message);
    return "failure";
  }
};
