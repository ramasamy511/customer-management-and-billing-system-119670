import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function ReminderList() {
  const [reminders, setReminders] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await api.listReminders();
    setReminders(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  return (
    <div>
      <h2 className="page-title">Reminders</h2>
      {loading ? <div>Loading...</div> :
        <table style={{ width:"100%", background:"white", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Invoice</th>
              <th>Message</th>
              <th>Status</th>
              <th>Sent At</th>
            </tr>
          </thead>
          <tbody>
            {reminders.map(rem => (
              <tr key={rem.id}>
                <td>{rem.id}</td>
                <td>{rem.customer_id}</td>
                <td>{rem.invoice_id ?? "-"}</td>
                <td>{rem.message}</td>
                <td>{rem.status}</td>
                <td>{rem.sent_at?.slice(0,10) ?? "-"}</td>
              </tr>
            ))}
            {reminders.length === 0 && <tr><td colSpan={6} style={{textAlign:"center"}}>No reminders found.</td></tr>}
          </tbody>
        </table>
      }
    </div>
  );
}
