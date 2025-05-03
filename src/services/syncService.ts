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

    const accountStatus = response.data.status;

    if (accountStatus === "connected") return "valid";
    if (accountStatus === "expired") return "expired";

    return "re-auth-required";
  } catch (error: any) {
    console.error("🔴 Sync check failed:", error?.response?.data || error.message);
    return "re-auth-required";
  }
}
