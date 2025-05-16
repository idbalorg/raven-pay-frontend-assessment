import axios from "axios";

export async function handler(event) {
  const {
    symbol = "BTCUSDT",
    interval = "1h",
    limit = 200,
  } = event.queryStringParameters;

  try {
    const res = await axios.get("https://api.binance.com/api/v3/klines", {
      params: { symbol, interval, limit },
    });

    return {
      statusCode: 200,
      body: JSON.stringify(res.data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch klines" }),
    };
  }
}
