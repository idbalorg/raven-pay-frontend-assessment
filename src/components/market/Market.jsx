import { useState } from "react";
import TradingPairs from "./trading-pairs/TradingPairs";
import { ApexChart } from "./apex-chart/ApexChart";
import OrderBook from "./order-book/OrderBook";
import BuySellOrder from "../buy-sell-order/BuySellOrder";

export default function Markets() {
  const [selectedCoin, setSelectedCoin] = useState(null);

  return (
    <div>
      <h2>Markets</h2>

      <TradingPairs onSelect={setSelectedCoin} />
      {selectedCoin && (
        <>
          <ApexChart coin={selectedCoin} />
          <OrderBook />
          <BuySellOrder />
        </>
      )}
    </div>
  );
}
