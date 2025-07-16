import React from "react";

/**
 * Triggers or renders Excel export UI
 * @param {Object[]} data
 * @param {function} onExport
 */
 // PUBLIC_INTERFACE
function ExportToExcel({ data, onExport }) {
  return (
    <button onClick={() => onExport && onExport(data)}>
      Download Excel
    </button>
  );
}

export default ExportToExcel;
