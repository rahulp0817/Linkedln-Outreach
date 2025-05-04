import { Request, Response } from "express";
import axios from "axios";

export const authenticateAccountController = async (req: Request, res: Response) => {
  try {
    let { cookies } = req.body;

    if (!cookies || typeof cookies !== "string") {
      return res.status(400).json({ message: "Cookies are required" });
    }

    const jsessionMatch = cookies.match(/JSESSIONID=([^;]+)/);
    if (jsessionMatch) {
      const jsessionValue = jsessionMatch[1].replace(/^"|"$/g, "");
      cookies = cookies.replace(/JSESSIONID=([^;]+)/, `JSESSIONID="${jsessionValue}"`);
    } else {
      return res.status(400).json({ message: "JSESSIONID (csrf-token) not found in cookies" });
    }

    const headers = {
      Cookie: cookies,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      Accept: "application/json",
      "csrf-token": jsessionMatch[1],
      "x-restli-protocol-version": "2.0.0",
    };

    const feedResponse = await axios.get("https://www.linkedin.com/feed/", {
      headers,
      maxRedirects: 0,
      validateStatus: (status) => status < 400,
    });

    const isLoggedIn = feedResponse.data.includes("feed") && !feedResponse.data.includes("signin");
    if (!isLoggedIn) {
      return res.status(401).json({ status: "failure", message: "Invalid LinkedIn cookies" });
    }

    const meResponse = await axios.get("https://www.linkedin.com/voyager/api/me", {
      headers,
    });

    const accountId = meResponse.data?.miniProfile?.publicIdentifier || meResponse.data?.id;

    return res.status(200).json({
      status: "success",
      message: "Authenticated successfully",
      accountId,
    });
  } catch (error: any) {
    console.error("LinkedIn authentication error:", error?.response?.data || error.message);
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
