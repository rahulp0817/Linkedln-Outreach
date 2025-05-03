import Lead from "../models/lead-models";

export const handleConnectionWebhook = async (data: any): Promise<void> => {
  try {
    const { event, profile_url, status } = data;


    console.log(`🔔 Webhook received: Event = ${event}, URL = ${profile_url}`);

    if (event === "connection_accepted") {
      await Lead.findOneAndUpdate(
        { leadUrl: profile_url },
        { status: "connected" },
        { new: true }
      );
      console.log(`✅ Connection accepted: ${profile_url}`);
    } else if (event === "connection_failed") {
      await Lead.findOneAndUpdate(
        { leadUrl: profile_url },
        { status: "failed" },
        { new: true }
      );
      console.warn(`❌ Connection failed: ${profile_url}`);
    } else {
      console.log(`ℹ️ Unhandled webhook event: ${event}`);
    }
  } catch (error) {
    console.error("⚠️ Error handling webhook:", error);
  }
};
