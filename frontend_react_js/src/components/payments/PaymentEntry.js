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
        <select name="customerId" value={form.customerId} onChange={handleChange} required>
          <option value="">Select customer</option>
          {customers.map(c => <option value={c.id} key={c.id}>{c.name}</option>)}
        </select>
      </div>
      <div>
        <select name="invoiceId" value={form.invoiceId} onChange={handleChange}>
          <option value="">Select invoice (optional)</option>
          {invoices.map(inv => <option value={inv.id} key={inv.id}>{inv.invoiceNumber}</option>)}
        </select>
      </div>
      <div>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          required
        />
      </div>
      <div>
        <select name="method" value={form.method} onChange={handleChange} required>
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
