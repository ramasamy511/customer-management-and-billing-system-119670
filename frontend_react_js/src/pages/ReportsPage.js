import React, { useState, useEffect } from "react";
import { api } from "../api";

export default function ReportsPage() {
  const [bal, setBal] = useState(null);

  useEffect(() => {
    api.balanceSheet().then(setBal);
  }, []);

  return (
    <div>
      <h2>Reports & Balance Sheet</h2>
      <div>
        {bal ?
          <pre style={{ whiteSpace: "pre-wrap", background: "#fff", padding: 16, borderRadius: 10, marginTop: 12 }}>
            {JSON.stringify(bal, null, 2)}
          </pre>
          : <div>Loading...</div>
        }
      </div>
    </div>
  );
}
