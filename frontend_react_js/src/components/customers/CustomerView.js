import React from "react";

/**
 * View details of selected customer.
 * @param {Object} customer
 * @param {function} onEdit (optional)
 * @param {function} onBack (optional)
 */
 // PUBLIC_INTERFACE
function CustomerView({ customer, onEdit, onBack }) {
  if (!customer) return <div>No customer selected.</div>;
  return (
    <div>
      <h3>Customer Details</h3>
      <div><b>Name:</b> {customer.name}</div>
      <div><b>Email:</b> {customer.email}</div>
      <div><b>Company:</b> {customer.company}</div>
      {/* Add more fields as needed */}
      <div style={{ marginTop: 12 }}>
        {onEdit && <button onClick={() => onEdit(customer.id)}>Edit</button>}
        {onBack && <button onClick={onBack} style={{ marginLeft: 8 }}>Back</button>}
      </div>
    </div>
  );
}

export default CustomerView;
