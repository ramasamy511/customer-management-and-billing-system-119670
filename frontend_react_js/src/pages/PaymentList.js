import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function PaymentList() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const data = await api.listPayments();
    setPayments(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleDelete(id) {
    if (!window.confirm("Delete this payment?")) return;
    await api.deletePayment(id);
    load();
  }

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2 className="page-title">Payments</h2>
        <Link to="/payments/new" className="btn">Add Payment</Link>
      </div>
      {loading ? <div>Loading...</div> :
        <table style={{ width:"100%", background:"white", borderCollapse:"collapse" }}>
          <thead>
            <tr><th>Date</th><th>Customer</th><th>Invoice</th><th>Mode</th><th>Amount</th><th>Remark</th><th></th></tr>
          </thead>
          <tbody>
            {payments.map(p => (
              <tr key={p.id}>
                <td>{p.payment_date?.slice(0,10)}</td>
                <td>{p.customer_id}</td>
                <td>{p.invoice_id ?? "-"}</td>
                <td>{p.mode}</td>
                <td>{p.amount}</td>
                <td>{p.remark}</td>
                <td>
                  <Link to={`/payments/${p.id}/edit`} className="btn">Edit</Link>
                  <button className="btn" style={{marginLeft:8, background:"#e91e63"}} onClick={() => handleDelete(p.id)}>Delete</button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && <tr><td colSpan={7} style={{textAlign:"center"}}>No payments</td></tr>}
          </tbody>
        </table>
      }
    </div>
  );
}
