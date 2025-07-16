import React from "react";

/**
 * Displays frequent purchase data per customer.
 * @param {Object[]} purchases
 */
 // PUBLIC_INTERFACE
function FrequentPurchase({ purchases = [] }) {
  return (
    <div>
      <h3>Frequent Purchases</h3>
      <ul>
        {purchases.map((p, idx) => (
          <li key={idx}>
            {p.customerName}: {p.productName} ({p.count} times)
          </li>
        ))}
        {purchases.length === 0 && <li>No data</li>}
      </ul>
    </div>
  );
}

export default FrequentPurchase;
