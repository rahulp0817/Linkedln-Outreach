import axios from "axios";

export async function checkAccountSyncStatus(accountId: string): Promise<"valid" | "expired" | "re-auth-required"> {
  try {
    const response = await axios.get(
      `${process.env.UNIPILE_BASE_URL}/accounts/${accountId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
        },
      }
    );

    console.log("🔵 Unipile Response:", response.data);

    const accountStatus = response.data?.status; // adjust based on actual response shape

    if (accountStatus === "connected") return "valid";
    if (accountStatus === "expired") return "expired";

    return "re-auth-required";
  } catch (error: any) {
    if (error.response) {
      console.error("🔴 API Error Response:", error.response.data);
      console.error("🔴 Status:", error.response.status);
    } else {
      console.error("🔴 Error Message:", error.message);
    }
    return "re-auth-required";
  }
}
