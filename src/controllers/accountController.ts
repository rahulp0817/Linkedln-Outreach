import { Request, Response } from "express";
import axios from "axios";

export const authenticateAccountController = async (req: Request, res: Response) => {
  try {
    const { cookies } = req.body;
    if (!cookies) {
      return res.status(400).json({ message: "Cookies are required" });
    }

    const response = await axios.get("https://www.linkedin.com/feed/", {
      headers: {
        Cookie: cookies,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36",
      },
      maxRedirects: 0,
      validateStatus: (status) => status < 400,
    });

    if (response.data.includes("feed") && !response.data.includes("signin")) {
      return res.status(200).json({ status: "success", message: "Authenticated successfully" });
    }

    return res.status(401).json({ status: "failure", message: "Invalid LinkedIn cookies" });
  } catch (error) {
    if (error instanceof Error) {
      console.error("LinkedIn authentication error:", error.message);
    } else {
      console.error("LinkedIn authentication error:", error);
    }
    return res.status(500).json({ status: "error", message: "Internal server error" });
  }
};
