import React from "react";

/**
 * Shows most purchased products
 * @param {Object[]} products
 */
 // PUBLIC_INTERFACE
function TopProducts({ products = [] }) {
  return (
    <div>
      <h3>Top Products</h3>
      <ol>
        {products.map((p, idx) => (
          <li key={idx}>{p.name} ({p.quantitySold})</li>
        ))}
        {products.length === 0 && <li>No products</li>}
      </ol>
    </div>
  );
}

export default TopProducts;
