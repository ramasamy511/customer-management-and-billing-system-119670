import React from "react";

/**
 * Shows top buyers
 * @param {Object[]} buyers
 */
 // PUBLIC_INTERFACE
function TopBuyers({ buyers = [] }) {
  return (
    <div>
      <h3>Top Buyers</h3>
      <ol>
        {buyers.map((b, idx) => (
          <li key={idx}>{b.name} (₹{b.totalPurchases})</li>
        ))}
        {buyers.length === 0 && <li>No buyers</li>}
      </ol>
    </div>
  );
}

export default TopBuyers;
