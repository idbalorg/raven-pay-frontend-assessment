import { useState } from "react";
import TradingPairs from "./trading-pairs/TradingPairs";
import { ApexChart } from "./apex-chart/ApexChart";
import OrderBook from "./order-book/OrderBook";
import BuySellOrder from "../buy-sell-order/BuySellOrder";

import styles from "./Market.module.scss";
import OrdersPanel from "../order-panel/OrderPanel";

export default function Markets() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  return (
    <div>
      <TradingPairs onSelect={setSelectedCoin} />
      {selectedCoin && (
        <div className={styles.chartContainer}>
          <div className={styles["chartContainer__group"]}>
            <ApexChart coin={selectedCoin} />
            <OrderBook />
            <BuySellOrder />
          </div>
          <OrdersPanel />
        </div>
      )}
    </div>
  );
}
