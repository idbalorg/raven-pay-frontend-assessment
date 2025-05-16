import { useState } from "react";
import styles from "./OrderPanel.module.scss";

const TABS = ["Open Orders", "Positions", "Order History", "Trade History"];

function OrdersPanel() {
  const [activeTab, setActiveTab] = useState("Open Orders");

  return (
    <div className={styles["orders-panel"]}>
      <div className={styles["orders-panel__tabs"]}>
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`${styles["orders-panel__tab"]} ${
              activeTab === tab ? styles["orders-panel__tab--active"] : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className={styles["orders-panel__content"]}>
        <h3 className={styles["orders-panel__empty-title"]}>No {activeTab}</h3>
        <p className={styles["orders-panel__empty-subtitle"]}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          <br />
          Id pulvinar nullam sit imperdiet pulvinar.
        </p>
      </div>
    </div>
  );
}

export default OrdersPanel;
