import axios from "axios";

export async function handler() {
  try {
    const res = await axios.get("https://api.binance.com/api/v3/ticker/24hr");
    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch ticker" }),
    };
  }
}
