import axios from "axios";

export async function authenticateAccount(cookies: string): Promise<"success" | "failure" | "expired"> {
  try {
    const response = await axios.post(
      "https://api.unipile.com/v1/accounts/connect",
      {
        provider: "linkedin",
        data: {
          cookies,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.UNIPILE_API_KEY}`,
          "Content-Type": "application/json"
        },
      }
    );

    if (response.data?.status === "connected") {
      return "success";
    }

    return "failure";
  } catch (error: any) {
    if (error.response?.status === 401) {
      return "expired";
    }

    console.error("Authentication error:", error.response?.data || error.message);
    return "failure";
  }
}
