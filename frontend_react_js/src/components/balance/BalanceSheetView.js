import React from "react";

/**
 * Shows balance sheet (summary of credits/debits per customer).
 * @param {Object[]} balances
 * @param {function} onExportPDF
 * @param {function} onExportExcel
 */
 // PUBLIC_INTERFACE
function BalanceSheetView({ balances = [], onExportPDF, onExportExcel }) {
  return (
    <div>
      <h3>Balance Sheet</h3>
      <div>
        <button onClick={onExportPDF}>Export to PDF</button>
        <button onClick={onExportExcel} style={{ marginLeft: 8 }}>Export to Excel</button>
      </div>
      <table className="balance-table">
        <thead>
          <tr>
            <th>Customer</th>
            <th>Credit</th>
            <th>Debit</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {balances.map((b, idx) => (
            <tr key={idx}>
              <td>{b.customerName}</td>
              <td>{b.credit}</td>
              <td>{b.debit}</td>
              <td>{b.balance}</td>
            </tr>
          ))}
          {balances.length === 0 && (
            <tr>
              <td colSpan={4}>No records</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BalanceSheetView;
