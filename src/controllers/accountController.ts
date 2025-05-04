import { Request, Response } from "express";
import axios from "axios";

export const authenticateAccountController = async (req: Request, res: Response) => {
  try {
    const { cookies } = req.body;
    if (!cookies) {
      return res.status(400).json({ message: "Cookies are required" });
    }

    const feedResponse = await axios.get("https://www.linkedin.com/feed/", {
      headers: {
        Cookie: cookies,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      },
      maxRedirects: 0,
      validateStatus: (status) => status < 400,
    });

    const isValid = feedResponse.data.includes("feed") && !feedResponse.data.includes("signin");
    if (!isValid) {
      return res.status(401).json({ status: "failure", message: "Invalid LinkedIn cookies" });
    }

    const meResponse = await axios.get("https://www.linkedin.com/voyager/api/me", {
      headers: {
        Cookie: cookies,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
        "Accept": "application/json",
      },
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
