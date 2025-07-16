import React from "react";

/**
 * Triggers or renders PDF export UI
 * @param {Object[]} data
 * @param {function} onExport
 */
 // PUBLIC_INTERFACE
function ExportToPDF({ data, onExport }) {
  return (
    <button onClick={() => onExport && onExport(data)}>
      Download PDF
    </button>
  );
}

export default ExportToPDF;
