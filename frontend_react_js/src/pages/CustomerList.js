import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api";

export default function CustomerList() {
  const [customers, setCustomers] = useState([]);
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function load() {
    setLoading(true);
    try {
      const data = await api.listCustomers();
      setCustomers(data || []);
      setFiltered(data || []);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(); }, []);

  useEffect(() => {
    if (query.trim()) {
      setFiltered(customers.filter(c =>
        c.name.toLowerCase().includes(query.toLowerCase()) ||
        String(c.gst_number || "").toLowerCase().includes(query.toLowerCase())
      ));
    } else setFiltered(customers);
  }, [query, customers]);

  async function handleDelete(id) {
    if (!window.confirm("Delete this customer?")) return;
    await api.deleteCustomer(id);
    load();
  }

  return (
    <div>
      <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <h2 className="page-title">Customers</h2>
        <Link className="btn" to="/customers/new">Add New</Link>
      </div>
      <input
        type="text"
        placeholder="Search customers"
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ marginBottom: 16, padding: 10, width: "100%", maxWidth: 320, borderRadius: 8, border: "1px solid var(--border-color)" }}
      />
      {loading ? <div>Loading...</div> : (
        <table style={{ width: "100%", background: "white", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th>Name</th><th>Email</th><th>Phone</th><th>Address</th><th>GST</th><th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(c => (
              <tr key={c.id}>
                <td>{c.name}</td>
                <td>{c.email}</td>
                <td>{c.phone}</td>
                <td>{c.address}</td>
                <td>{c.gst_number}</td>
                <td>
                  <Link className="btn" to={`/customers/${c.id}/edit`}>Edit</Link>
                  <button className="btn" onClick={() => handleDelete(c.id)} style={{marginLeft: 8, background: "#e91e63"}}>Delete</button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (<tr><td colSpan={6} style={{textAlign: "center"}}>No customers found.</td></tr>)}
          </tbody>
        </table>
      )}
    </div>
  );
}
