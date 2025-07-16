import React, { useState } from "react";

/**
 * Payment entry form for an invoice or customer.
 * @param {Object[]} customers
 * @param {Object[]} invoices
 * @param {function} onSave
 * @param {function} onCancel
 */
 // PUBLIC_INTERFACE
function PaymentEntry({ customers = [], invoices = [], onSave, onCancel }) {
  const [form, setForm] = useState({
    customerId: "",
    invoiceId: "",
    amount: "",
    method: ""
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Record Payment</h3>
      <div>
        <label htmlFor="payment-entry-customer">Customer</label>
        <select
          id="payment-entry-customer"
          name="customerId"
          value={form.customerId}
          onChange={handleChange}
          required
          aria-label="Customer"
        >
          <option value="">Select customer</option>
          {customers.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="payment-entry-invoice">Invoice</label>
        <select
          id="payment-entry-invoice"
          name="invoiceId"
          value={form.invoiceId}
          onChange={handleChange}
          aria-label="Invoice"
        >
          <option value="">Select invoice (optional)</option>
          {invoices.map(inv => <option value={inv.id} key={inv.id}>{inv.invoiceNumber}</option>)}
        </select>
      </div>
      <div>
        <label htmlFor="payment-entry-amount">Amount</label>
        <input
          id="payment-entry-amount"
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
          aria-label="Amount"
        />
      </div>
      <div>
        <label htmlFor="payment-entry-method">Payment Method</label>
        <select
          id="payment-entry-method"
          name="method"
          value={form.method}
          onChange={handleChange}
          required
          aria-label="Payment method"
        >
          <option value="">Payment method</option>
          <option value="cash">Cash</option>
          <option value="card">Card</option>
          <option value="upi">UPI</option>
          <option value="bank">Bank Transfer</option>
        </select>
      </div>
      <div style={{ marginTop: 12 }}>
        <button type="submit">Save Payment</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </form>
  );
}

export default PaymentEntry;
