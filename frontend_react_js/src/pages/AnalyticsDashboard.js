import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function AnalyticsDashboard() {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.frequentPurchases().then(data => {
      setAnalytics(data);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h2 className="page-title">Analytics Dashboard</h2>
      {loading ? <div>Loading...</div> : (
        <div>
          {analytics && analytics.frequent_purchases ? (
            <table style={{background:"white", width:"100%"}}>
              <thead>
                <tr>
                  <th>Customer</th><th>Top Products</th>
                </tr>
              </thead>
              <tbody>
                {analytics.frequent_purchases.map((row, idx) => (
                  <tr key={idx}>
                    <td>{row.customer_id}</td>
                    <td>{row.product_names?.join(", ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : <div>No data available.</div>}
        </div>
      )}
    </div>
  );
}
