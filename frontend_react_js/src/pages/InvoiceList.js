import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";

export default function InvoiceList() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);

  async function load() {
    setLoading(true);
    const data = await api.listInvoices();
    setInvoices(data ?? []);
    setFiltered(data ?? []);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (query.trim()) {
      setFiltered(invoices.filter(i =>
         String(i.customer_id).includes(query) ||
         String(i.status ?? "").toLowerCase().includes(query.toLowerCase())
      ));
    } else setFiltered(invoices);
  }, [query, invoices]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this invoice and all items?")) return;
    await api.deleteInvoice(id);
    load();
  }

  return (
    <div>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <h2 className="page-title">Invoices</h2>
        <Link className="btn" to="/invoices/new">New Invoice</Link>
      </div>
      <input
        type="text"
        placeholder="Search: Customer, Status"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: 16, padding: 10, width: "100%", maxWidth: 320, borderRadius: 8, border: "1px solid var(--border-color)" }}
      />
      {loading ? <div>Loading...</div> :
        <table style={{ width:"100%", background:"white", borderCollapse:"collapse" }}>
          <thead>
            <tr>
              <th>#</th><th>Customer</th><th>Date</th><th>Status</th><th>Amount</th><th></th>
            </tr>
          </thead>
          <tbody>
          {filtered.map(inv => (
            <tr key={inv.id}>
              <td>{inv.id}</td>
              <td>{inv.customer_id}</td>
              <td>{inv.invoice_date?.slice(0,10)}</td>
              <td>{inv.status}</td>
              <td>{inv.total_amount}</td>
              <td>
                <Link className="btn" to={`/invoices/${inv.id}/edit`}>Edit</Link>
                <button className="btn" style={{marginLeft:8, background:"#e91e63"}} onClick={() => handleDelete(inv.id)}>Delete</button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && <tr><td colSpan={6}style={{textAlign:"center"}}>No invoices</td></tr>}
          </tbody>
        </table>
      }
    </div>
  );
}
