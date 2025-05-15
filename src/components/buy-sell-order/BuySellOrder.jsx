import { useState } from "react";
import styles from "./BuySellOrder.module.scss";

export default function BuySellOrder() {
  const [tab, setTab] = useState("buy");
  const [orderType, setOrderType] = useState("limit");
  const [limitPrice, setLimitPrice] = useState("");
  const [amount, setAmount] = useState("");
  const [orderGoodTill, setOrderGoodTill] = useState("goodTillCancelled");
  const [postOnly, setPostOnly] = useState(true);

  const total = Number(limitPrice) * Number(amount) || 0;

  return (
    <div className={styles["order-box"]}>
      <div className={styles["order-box__tabs"]}>
        {["buy", "sell"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`${styles["order-box__tab"]} ${tab === t ? styles[`order-box__tab--${t}`] : ""}`}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      <div className={styles["order-box__types"]}>
        {["limit", "market", "stop-limit"].map((type) => (
          <button
            key={type}
            onClick={() => setOrderType(type)}
            className={`${styles["order-box__type"]} ${orderType === type ? styles["order-box__type--active"] : ""}`}
          >
            {type.replace("-", " ")}
          </button>
        ))}
      </div>

      {(orderType === "limit" || orderType === "stop-limit") && (
        <div className={styles["order-box__field"]}>
          <label>Limit Price</label>
          <input
            type="number"
            value={limitPrice}
            onChange={(e) => setLimitPrice(e.target.value)}
            placeholder="0.00 USD"
          />
        </div>
      )}

      <div className={styles["order-box__field"]}>
        <label>Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0.00 USD"
        />
      </div>

      <div className={styles["order-box__field"]}>
        <label>Type</label>
        <select
          value={orderGoodTill}
          onChange={(e) => setOrderGoodTill(e.target.value)}
        >
          <option value="goodTillCancelled">Good till cancelled</option>
          <option value="immediateOrCancel">Immediate or cancel</option>
          <option value="fillOrKill">Fill or kill</option>
        </select>
      </div>

      <div className={styles["order-box__checkbox"]}>
        <input
          type="checkbox"
          id="postOnly"
          checked={postOnly}
          onChange={(e) => setPostOnly(e.target.checked)}
        />
        <label htmlFor="postOnly">Post Only</label>
      </div>

      <div className={styles["order-box__total"]}>
        Total: <span>${total.toFixed(2)}</span>
      </div>

      <button className={styles["order-box__submit"]}>
        {tab === "buy" ? "Buy BTC" : "Sell BTC"}
      </button>

      <div className={styles["order-box__account"]}>
        <div>
          Total account value{" "}
          <select>
            <option>NGN</option>
            <option>USD</option>
          </select>
        </div>
        <div className={styles["order-box__account-details"]}>
          <div>
            <div>Open Orders</div>
            <div>0.00</div>
          </div>
          <div>
            <div>Available</div>
            <div>0.00</div>
          </div>
        </div>
        <button className={styles["order-box__deposit"]}>Deposit</button>
      </div>
    </div>
  );
}
