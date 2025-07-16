import React from "react";

/**
 * Shows/edits available payment methods per customer.
 * @param {Object[]} methods, @param {function} onAdd, @param {function} onRemove
 */
 // PUBLIC_INTERFACE
function PaymentMethods({ methods = [], onAdd, onRemove }) {
  return (
    <div>
      <h3>Payment Methods</h3>
      <button onClick={onAdd}>Add Method</button>
      <ul>
        {methods.length === 0 && <li>No payment methods saved.</li>}
        {methods.map((m, idx) => (
          <li key={idx}>
            {m.type}: {m.details}
            <button onClick={() => onRemove(idx)} style={{ marginLeft: 8 }}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PaymentMethods;
