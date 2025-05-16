import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./TradingPairs.module.scss";
import { FiChevronDown } from "react-icons/fi";
import { FaClock, FaArrowUp, FaArrowDown, FaChartBar } from "react-icons/fa";

function TradingPairs({ onSelect }) {
  const [tickers, setTickers] = useState([]);
  const [symbolsMeta, setSymbolsMeta] = useState([]);
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedPair, setSelectedPair] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [tickerRes, infoRes] = await Promise.all([
          axios.get("http://localhost:5000/api/ticker"),
          axios.get("http://localhost:5000/api/exchangeInfo"),
        ]);

        setTickers(tickerRes.data);
        setSymbolsMeta(infoRes.data.symbols);

        const defaultSymbol = tickerRes.data.find(
          (s) => s.symbol === "BTCUSDT"
        );
        const meta = infoRes.data.symbols.find((s) => s.symbol === "BTCUSDT");

        setSelectedPair({
          ...defaultSymbol,
          baseAsset: meta.baseAsset,
          quoteAsset: meta.quoteAsset,
        });

        onSelect({
          ...defaultSymbol,
          baseAsset: meta.baseAsset,
          quoteAsset: meta.quoteAsset,
        });
      } catch (err) {
        console.error("Error fetching Binance data:", err);
      }
    };
    fetchData();
  }, [onSelect]);

  const filterByTab = (symbol) => {
    if (activeTab === "USD")
      return symbol.endsWith("USD") || symbol.endsWith("USDT");
    if (activeTab === "BTC") return symbol.endsWith("BTC");
    return true;
  };

  const getAssetIcon = (asset) =>
    `https://cryptoicons.org/api/icon/${asset.toLowerCase()}/32`;

  const filtered = tickers
    .filter((pair) => filterByTab(pair.symbol))
    .filter((pair) => pair.symbol.toLowerCase().includes(search.toLowerCase()))
    .map((pair) => {
      const meta = symbolsMeta.find((s) => s.symbol === pair.symbol);
      return {
        ...pair,
        baseAsset: meta?.baseAsset || "",
        quoteAsset: meta?.quoteAsset || "",
      };
    });

  const handlePairSelect = (pair) => {
    setSelectedPair(pair);
    setShowDropdown(false);
    onSelect(pair);
  };

  return (
    <div className={styles["trading-pairs"]}>
      {selectedPair && (
        <div
          className={styles["trading-pairs__summary"]}
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className={styles["trading-pairs__summary-pair"]}>
            <img src={getAssetIcon(selectedPair.baseAsset)} alt="base" />
            <img src={getAssetIcon(selectedPair.quoteAsset)} alt="quote" />
            <span>
              {selectedPair.baseAsset}/{selectedPair.quoteAsset}
            </span>
            <FiChevronDown />
          </div>
          <div className={styles["trading-pairs__summary-metrics"]}>
            <div>
              <div className={styles["trading-pairs__summary-metrics-icon"]}>
                <FaClock /> 24h change
              </div>
              <span>
                {Number(selectedPair.priceChange).toFixed(2)} (
                {Number(selectedPair.priceChangePercent).toFixed(2)}%)
              </span>
            </div>
            <div>
              <div className={styles["trading-pairs__summary-metrics-icon"]}>
                <FaArrowUp /> <span>24h high</span>
              </div>
              <span>{Number(selectedPair.highPrice).toFixed(2)}</span>
            </div>
            <div>
              <div className={styles["trading-pairs__summary-metrics-icon"]}>
                <FaArrowDown /> 24h low
              </div>
              <span>{Number(selectedPair.lowPrice).toFixed(2)}</span>
            </div>
            <div>
              <div className={styles["trading-pairs__summary-metrics-icon"]}>
                <FaChartBar /> 24h volume
              </div>
              <span>{Number(selectedPair.volume).toLocaleString()}</span>
            </div>
          </div>
        </div>
      )}

      {showDropdown && (
        <div className={styles["trading-pairs__dropdown"]}>
          <div className={styles["trading-pairs__header"]}>
            <input
              type="text"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles["trading-pairs__search"]}
            />
            <div className={styles["trading-pairs__tabs"]}>
              {["All", "USD", "BTC"].map((tab) => (
                <button
                  key={tab}
                  className={`${styles["trading-pairs__tab"]} ${
                    activeTab === tab
                      ? styles["trading-pairs__tab--active"]
                      : ""
                  }`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <ul className={styles["trading-pairs__list"]}>
            {filtered.slice(0, 20).map((pair) => (
              <li
                key={pair.symbol}
                onClick={() => handlePairSelect(pair)}
                className={styles["trading-pairs__item"]}
              >
                <div className={styles["trading-pairs__info"]}>
                  <img
                    src={getAssetIcon(pair.baseAsset)}
                    alt={pair.baseAsset}
                    width={24}
                  />
                  <img
                    src={getAssetIcon(pair.quoteAsset)}
                    alt={pair.quoteAsset}
                    width={24}
                  />
                  <div className={styles["trading-pairs__info-text"]}>
                    <strong>
                      {pair.baseAsset} / {pair.quoteAsset}
                    </strong>
                  </div>
                </div>
                <div>
                  <div className={styles["trading-pairs__price"]}>
                    ${Number(pair.lastPrice).toFixed(2)}
                  </div>
                  <div className={styles["trading-pairs__change"]}>
                    {Number(pair.priceChangePercent).toFixed(2)}%
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default TradingPairs;
