import React from "react";

/**
 * List invoices with summary, filters, and link to create.
 * @param {Object[]} invoices
 * @param {function} onCreate
 * @param {function} onView
 */
 // PUBLIC_INTERFACE
function InvoiceList({ invoices = [], onCreate, onView }) {
  return (
    <div>
      <h3>Invoices</h3>
      <button onClick={onCreate} style={{ marginBottom: 12 }}>Create Invoice</button>
      <table className="invoice-table">
        <thead>
          <tr>
            <th>Invoice No.</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map(inv => (
            <tr key={inv.id}>
              <td>{inv.invoiceNumber}</td>
              <td>{inv.customerName}</td>
              <td>{inv.date}</td>
              <td>{inv.totalAmount}</td>
              <td>{inv.status}</td>
              <td>
                <button onClick={() => onView(inv.id)}>View</button>
              </td>
            </tr>
          ))}
          {invoices.length === 0 &&
            <tr>
              <td colSpan={6}>No invoices found.</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  );
}

export default InvoiceList;
