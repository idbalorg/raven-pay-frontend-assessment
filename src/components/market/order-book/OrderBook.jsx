import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./OrderBook.module.scss";

function OrderBook({ symbol = "BTCUSDT" }) {
  const [bids, setBids] = useState([]);
  const [asks, setAsks] = useState([]);
  const [limit, setLimit] = useState(10);

  const fetchOrderBook = async () => {
    try {
      const res = await axios.get(
        `/.netlify/functions/depth?symbol=${symbol}&limit=${limit}`
      );
      setBids(res.data.bids || []);
      setAsks(res.data.asks || []);
    } catch (err) {
      console.error("Order book error:", err.message);
    }
  };

  useEffect(() => {
    fetchOrderBook();
    const interval = setInterval(fetchOrderBook, 5000);
    return () => clearInterval(interval);
  }, [symbol, limit]);

  const formatNum = (num) =>
    Number(num).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6,
    });

  return (
    <div className={styles["order-book"]}>
      <div className={styles["order-book__header"]}>
        <div className={styles["order-book__tabs"]}>
          <button className={styles["active"]}>Order Book</button>
          <button>Recent trades</button>
        </div>
        <div className={styles["order-book__controls"]}>
          <button className={styles["order-book__view"]}></button>
          <button className={styles["order-book__view"]}></button>
          <button className={styles["order-book__view"]}></button>
          <select onChange={(e) => setLimit(e.target.value)} value={limit}>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
      </div>

      <div className={styles["order-book__labels"]}>
        <span>Price (USDT)</span>
        <span>Amounts (BTC)</span>
        <span>Total</span>
      </div>

      <ul className={styles["order-book__asks"]}>
        {asks.map(([price, qty], i) => (
          <li key={i} className={styles["order-book__ask"]}>
            <span>{formatNum(price)}</span>
            <span>{formatNum(qty)}</span>
            <span>{formatNum(price * qty)}</span>
          </li>
        ))}
      </ul>

      <div className={styles["order-book__mid-price"]}>
        <span className={styles["up"]}>36,641.20 ↑</span>
        <span className={styles["price"]}>36,641.20</span>
      </div>

      <ul className={styles["order-book__bids"]}>
        {bids.map(([price, qty], i) => (
          <li key={i} className={styles["order-book__bid"]}>
            <span>{formatNum(price)}</span>
            <span>{formatNum(qty)}</span>
            <span>{formatNum(price * qty)}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrderBook;
