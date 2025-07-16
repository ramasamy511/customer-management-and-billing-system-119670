import React from "react";
import { Routes, Route } from "react-router-dom";

// Placeholder module components
const Customers = () => <div style={{ padding: 24 }}><h2>Customer Management</h2></div>;
const Invoices = () => <div style={{ padding: 24 }}><h2>Billing / Invoices</h2></div>;
const Payments = () => <div style={{ padding: 24 }}><h2>Payments</h2></div>;
const BalanceSheet = () => <div style={{ padding: 24 }}><h2>Balance Sheet</h2></div>;
const Analytics = () => <div style={{ padding: 24 }}><h2>Analytics & Dashboard</h2></div>;
const Reminders = () => <div style={{ padding: 24 }}><h2>Reminders & Exports</h2></div>;

// PUBLIC_INTERFACE
export const appRoutes = [
  { path: "/customers", label: "Customers", element: <Customers /> },
  { path: "/invoices", label: "Billing", element: <Invoices /> },
  { path: "/payments", label: "Payments", element: <Payments /> },
  { path: "/balance", label: "Balance", element: <BalanceSheet /> },
  { path: "/analytics", label: "Analytics", element: <Analytics /> },
  { path: "/reminders", label: "Reminders", element: <Reminders /> },
];

// PUBLIC_INTERFACE
function AppRouter() {
  /** Defines all main app routes based on appRoutes array */
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<Customers />} />
    </Routes>
  );
}

export default AppRouter;
