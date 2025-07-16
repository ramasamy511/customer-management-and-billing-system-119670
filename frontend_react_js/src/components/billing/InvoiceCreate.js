import React, { useState } from "react";

/**
 * Invoice creation form (scaffold).
 * @param {Object[]} customers
 * @param {function} onSave
 * @param {function} onCancel
 */
 // PUBLIC_INTERFACE
function InvoiceCreate({ customers = [], onSave, onCancel }) {
  const [form, setForm] = useState({
    customerId: "",
    items: [],
    date: "",
    totalAmount: "",
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Create Invoice</h3>
      <div>
        <label htmlFor="invoice-create-customer">Customer</label>
        <select
          id="invoice-create-customer"
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
        {/* Placeholder for dynamic invoice items (product/qty/price) */}
        <small>Item entry UI for line items will go here</small>
      </div>
      <div>
        <label htmlFor="invoice-create-date">Date</label>
        <input
          id="invoice-create-date"
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          required
          aria-label="Invoice date"
        />
      </div>
      <div>
        <label htmlFor="invoice-create-total">Total Amount</label>
        <input
          id="invoice-create-total"
          name="totalAmount"
          type="number"
          value={form.totalAmount}
          onChange={handleChange}
          placeholder="Total Amount"
          required
          aria-label="Total amount"
        />
      </div>
      <div style={{ marginTop: 12 }}>
        <button type="submit">Save Invoice</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </form>
  );
}

export default InvoiceCreate;
