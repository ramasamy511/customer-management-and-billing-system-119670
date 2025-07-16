import React from "react";

/**
 * High-level overview dashboard.
 * @param {Object} props
 * @param {Object[]} props.overview
 */
 // PUBLIC_INTERFACE
function Dashboard({ overview }) {
  return (
    <div>
      <h3>Analytics Dashboard</h3>
      {overview ? (
        <div>
          <div><b>Total Customers:</b> {overview.totalCustomers}</div>
          <div><b>Outstanding Amount:</b> {overview.outstandingAmount}</div>
          <div><b>Total Invoices:</b> {overview.totalInvoices}</div>
          {/* Add top buyers/products display here */}
        </div>
      ) : (
        <div>Loading overview…</div>
      )}
    </div>
  );
}

export default Dashboard;
