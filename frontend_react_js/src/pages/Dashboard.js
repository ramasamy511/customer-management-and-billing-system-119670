import React, { useEffect, useState } from "react";
import { api } from "../api";

export default function Dashboard() {
  const [state, setState] = useState({
    customerCount: null,
    invoiceCount: null,
    totalReceivables: null,
    topProduct: null,
    loading: true,
  });

  useEffect(() => {
    // Fetch dashboard metrics (composed from real endpoints)
    async function loadDash() {
      setState(s => ({ ...s, loading: true }));
      let [customers, invoices, balances, analytics] = await Promise.all([
        api.listCustomers(),
        api.listInvoices(),
        api.balanceSheet(),
        api.frequentPurchases()
      ]);
      setState(s => ({
        ...s,
        loading: false,
        customerCount: customers ? customers.length : null,
        invoiceCount: invoices ? invoices.length : null,
        totalReceivables: balances && balances.total_receivable !== undefined
          ? balances.total_receivable : null,
        topProduct: analytics && analytics.top_item,
      }));
    }
    loadDash();
  }, []);

  if (state.loading) return <div>Loading...</div>;

  return (
    <div>
      <h2 className="page-title">Dashboard</h2>
      <div style={{ display: "flex", gap: "24px", flexWrap: "wrap", marginBottom: "24px"}}>
        <DashCard label="Customers" value={state.customerCount ?? "-"} icon="👤" />
        <DashCard label="Invoices" value={state.invoiceCount ?? "-"} icon="🧾" />
        <DashCard label="Total Receivable" value={state.totalReceivables ?? "-"} icon="💰" />
        <DashCard label="Top Product" value={state.topProduct ?? "-"} icon="⭐" />
      </div>
      <div style={{ marginTop: "32px" }}>
        <strong>Coming soon:</strong> Charts and trends for sales, payments, and reminders!
      </div>
    </div>
  );
}

function DashCard({ label, value, icon }) {
  return (
    <div style={{
      background: "var(--bg-secondary)",
      borderRadius: "14px",
      padding: "26px 30px",
      minWidth: "160px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      boxShadow: "0 1px 5px #0001",
      fontWeight: 500
    }}>
      <span style={{ fontSize: "2rem", marginBottom: "8px"}}>{icon}</span>
      <div style={{ fontSize: "1.6rem", color: "var(--primary)" }}>{value}</div>
      <div style={{ fontSize: "1.08rem", color: "var(--text-secondary)" }}>{label}</div>
    </div>
  );
}
