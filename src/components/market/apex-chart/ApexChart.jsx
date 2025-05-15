import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import styles from "./ApexChart.module.scss";

export const ApexChart = ({ coin }) => {
  const [candles, setCandles] = useState([]);
  const [interval, setInterval] = useState("1d");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!coin) return;

    // const symbol = coin.symbol.toUpperCase();
    const symbol = coin.symbol.toUpperCase().endsWith("USDT")
      ? coin.symbol.toUpperCase()
      : `${coin.symbol.toUpperCase()}USDT`;
    const fetchInterval = interval;

    setLoading(true);
    setError("");

    fetch(
      `http://localhost:5000/api/klines?symbol=${symbol}&interval=${fetchInterval}&limit=100`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data))
          throw new Error("Unexpected response from Binance");

        const formatted = data.map((d) => ({
          x: new Date(d[0]),
          y: [+d[1], +d[2], +d[3], +d[4]],
        }));

        setCandles(formatted);
      })
      .catch((err) => {
        console.error("Failed to fetch Binance chart data:", err);
        setError("Unable to load chart.");
      })
      .finally(() => setLoading(false));
  }, [coin, interval]);

  const options = {
    chart: {
      type: "candlestick",
      height: 500,
      toolbar: { show: false },
      background: "#0d1117",
    },
    xaxis: {
      type: "datetime",
      labels: { style: { colors: "#8b949e" } },
    },
    yaxis: {
      tooltip: { enabled: true },
      labels: {
        style: { colors: "#8b949e" },
        formatter: (val) => val.toFixed(2),
      },
    },
    tooltip: {
      theme: "dark",
      x: { format: "dd MMM yyyy HH:mm" },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: "#00ff7f",
          downward: "#ff4c4c",
        },
        wick: {
          useFillColor: false,
          width: 2,
        },
      },
    },
    grid: {
      borderColor: "#21262d",
      strokeDashArray: 4,
    },
    theme: { mode: "dark" },
  };

  return (
    <div className={styles["chart-container"]}>
      <div className={styles["chart-controls"]}>
        <label>
          Interval:
          <select
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
          >
            <option value="1h">1H</option>
            <option value="2h">2H</option>
            <option value="4h">4H</option>
            <option value="1d">1D</option>
            <option value="1w">1W</option>
          </select>
        </label>
      </div>

      {loading && <p>Loading chart...</p>}
      {error && <p className={styles["error"]}>{error}</p>}

      {!loading && candles.length > 0 && (
        <ReactApexChart
          options={options}
          series={[{ data: candles }]}
          type="candlestick"
          height={500}
        />
      )}
    </div>
  );
};
