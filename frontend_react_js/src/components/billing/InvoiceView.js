import React from "react";

/**
 * View details of a selected invoice.
 * @param {Object} invoice
 * @param {function} onBack
 */
 // PUBLIC_INTERFACE
function InvoiceView({ invoice, onBack }) {
  if (!invoice) return <div>No invoice found.</div>;
  return (
    <div>
      <h3>Invoice #{invoice.invoiceNumber}</h3>
      <div><b>Customer:</b> {invoice.customerName}</div>
      <div><b>Date:</b> {invoice.date}</div>
      <div><b>Total:</b> {invoice.totalAmount}</div>
      <div><b>Status:</b> {invoice.status}</div>
      {/* Items table */}
      <div>
        <h4>Items</h4>
        {invoice.items && invoice.items.length > 0 ? (
          <ul>
            {invoice.items.map((item, idx) => (
              <li key={idx}>{item.productName} × {item.quantity} @ {item.price}</li>
            ))}
          </ul>
        ) : (
          <div>No items</div>
        )}
      </div>
      <div style={{ marginTop: 12 }}>
        {onBack && <button onClick={onBack}>Back</button>}
      </div>
    </div>
  );
}

export default InvoiceView;
