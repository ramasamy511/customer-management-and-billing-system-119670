import React from "react";
import { api } from "../api";

export default function ExportsPage() {
  async function handleExport() {
    const result = await api.exportBalanceSheet();
    // In real case, result may be a download link or CSV string
    if (result && result.csv_data) {
      const blob = new Blob([result.csv_data], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "balance-sheet.csv";
      a.click();
      URL.revokeObjectURL(url);
    } else {
      alert("Export not available.");
    }
  }

  return (
    <div>
      <h2>Exports</h2>
      <div>
        <button className="btn btn-large" onClick={handleExport}>Export Balance Sheet as CSV</button>
      </div>
    </div>
  );
}
