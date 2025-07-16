import React, { useState } from "react";

/**
 * Triggers or schedules reminders (WhatsApp/Email).
 * @param {Object[]} customers
 * @param {function} onSendReminders
 */
 // PUBLIC_INTERFACE
function RemindersSend({ customers = [], onSendReminders }) {
  const [selectedIds, setSelectedIds] = useState([]);

  const toggleChecked = (id) =>
    setSelectedIds(selectedIds.includes(id)
      ? selectedIds.filter(i => i !== id)
      : [...selectedIds, id]);

  const send = () => {
    if (onSendReminders) onSendReminders(selectedIds);
  };

  return (
    <div>
      <h3>Send Payment Reminders</h3>
      <ul style={{ maxHeight: 220, overflow: "auto", padding: 0 }}>
        {customers.map((c) => (
          <li key={c.id} style={{ listStyle: "none", margin: "4px 0" }}>
            <label>
              <input
                type="checkbox"
                checked={selectedIds.includes(c.id)}
                onChange={() => toggleChecked(c.id)}
              />
              {c.name} ({c.email})
            </label>
          </li>
        ))}
        {customers.length === 0 && <li>No eligible customers found.</li>}
      </ul>
      <button onClick={send} disabled={selectedIds.length === 0}>
        Send Reminders
      </button>
    </div>
  );
}

export default RemindersSend;
