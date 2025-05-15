// components/Market/TradingPairs.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TradingPairs.module.scss";

function TradingPairs({ onSelect }) {
  const [tickers, setTickers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/ticker")
      .then((res) => setTickers(res.data))
      .catch((err) => console.error("Error fetching Binance tickers:", err));
  }, []);

  // Optional: filter for USDT pairs only
  const usdtPairs = tickers.filter((item) => item.symbol.endsWith("USDT"));

  const filtered = usdtPairs.filter((pair) =>
    pair.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles["trading-pairs"]}>
      <input
        type="text"
        placeholder="Search pair (e.g. btcusdt)"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles["trading-pairs__search"]}
      />

      <ul className={styles["trading-pairs__list"]}>
        {filtered.slice(0, 20).map((pair) => (
          <li
            key={pair.symbol}
            onClick={() => onSelect(pair)}
            className={styles["trading-pairs__item"]}
          >
            <div className={styles["trading-pairs__info"]}>
              <div>
                <strong>{pair.symbol}</strong> – $
                {Number(pair.lastPrice).toFixed(2)}
                <br />
                Vol: {Number(pair.volume).toLocaleString()}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TradingPairs;
