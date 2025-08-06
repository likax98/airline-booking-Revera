import type { NextApiRequest, NextApiResponse } from "next";

const API_URL = "https://airline-booking-nine.vercel.app/api/booking";
const SECRET_AUTH_KEY = "EsjanIsAMountainInIceland";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-key": SECRET_AUTH_KEY,
      },
      body: JSON.stringify(req.body),
    });

    const data = await response.json();

    return res.status(response.status).json(data);
  } catch (error) {
    console.error("Server error:", error);

    return res.status(500).json({ error: "Internal server error" });
  }
}
