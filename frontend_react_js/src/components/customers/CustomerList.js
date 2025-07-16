import React, { useEffect, useState } from "react";
import { fetchCustomers } from "../../api";

/**
 * Lists all customers. Displays summary table and supports search/filter.
 * Fetches customers from backend using centralized API.
 * @param {function} onView - Called with customerId when viewing customer.
 * @param {function} onEdit - Called with customerId for editing.
 */
// PUBLIC_INTERFACE
function CustomerList({ onView, onEdit }) {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomers().then(setCustomers).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h3>Customer List</h3>
      {loading ? (
        <div>Loading customers…</div>
      ) : (
        <table className="customer-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Company</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.company || "-"}</td>
                <td>
                  <button onClick={() => onView(c.id)}>View</button>
                  <button onClick={() => onEdit(c.id)}>Edit</button>
                </td>
              </tr>
            ))}
            {customers.length === 0 && (
              <tr>
                <td colSpan={4}>No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CustomerList;
