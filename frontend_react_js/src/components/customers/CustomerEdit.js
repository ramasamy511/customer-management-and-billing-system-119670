import React, { useState } from "react";

/**
 * Edit (or create) a customer. Shows a form.
 * @param {Object} customer - Customer object for edit, or null for new.
 * @param {function} onSave - Called with (customerData).
 * @param {function} onCancel - Called on cancel action.
 */
 // PUBLIC_INTERFACE
function CustomerEdit({ customer, onSave, onCancel }) {
  const [form, setForm] = useState(customer || { name: "", email: "", company: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = e => {
    e.preventDefault();
    if (onSave) onSave(form);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>{customer?.id ? "Edit Customer" : "Add Customer"}</h3>
      <div>
        <label htmlFor="customer-edit-name">Name</label>
        <input id="customer-edit-name" name="name" value={form.name}
          onChange={handleChange} placeholder="Full Name" required aria-label="Customer name" />
      </div>
      <div>
        <label htmlFor="customer-edit-email">Email</label>
        <input id="customer-edit-email" name="email" value={form.email}
          onChange={handleChange} placeholder="Email" type="email" required aria-label="Customer email" />
      </div>
      <div>
        <label htmlFor="customer-edit-company">Company</label>
        <input id="customer-edit-company" name="company" value={form.company}
          onChange={handleChange} placeholder="Company" aria-label="Customer company" />
      </div>
      <div style={{ marginTop: 12 }}>
        <button type="submit">Save</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </form>
  );
}

export default CustomerEdit;
