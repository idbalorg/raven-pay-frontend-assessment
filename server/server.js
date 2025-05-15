import express from "express";
import axios from "axios";
import cors from "cors";

const app = express();
app.use(cors());

const BINANCE_API = "https://api.binance.com/api/v3";

app.get("/api/ticker", async (req, res) => {
  const response = await axios.get(`${BINANCE_API}/ticker/24hr`);
  res.json(response.data);
});

app.get("/api/depth", async (req, res) => {
  const { symbol = "BTCUSDT", limit = 5 } = req.query;
  const response = await axios.get(
    `${BINANCE_API}/depth?symbol=${symbol}&limit=${limit}`
  );
  res.json(response.data);
});

// app.get("/api/klines", async (req, res) => {
//   // const { symbol = "BTCUSDT", interval = "1m" } = req.query;
//   const { symbol = "BTCUSDT", interval = "1h", limit = 200 } = req.query;

//   const response = await axios.get(
//     `${BINANCE_API}/klines?symbol=${symbol}&interval=${interval}`
//   );
//   res.json(response.data);
// });

app.get("/api/klines", async (req, res) => {
  const { symbol = "BTCUSDT", interval = "1h", limit = 200 } = req.query;

  try {
    const response = await axios.get(`${BINANCE_API}/klines`, {
      params: { symbol, interval, limit },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Binance klines error:", error.message);
    res.status(500).json({ error: "Failed to fetch klines from Binance" });
  }
});

app.listen(5000, () => {
  console.log("Proxy server running on http://localhost:5000");
});
