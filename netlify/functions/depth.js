import axios from "axios";

export async function handler(event) {
  const { symbol = "BTCUSDT", limit = 5 } = event.queryStringParameters;

  try {
    const res = await axios.get("https://api.binance.com/api/v3/depth", {
      params: { symbol, limit },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch depth" }),
    };
  }
}
