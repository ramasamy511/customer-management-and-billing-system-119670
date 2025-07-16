import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import AppShell from "./AppShell";

// Lazy-load feature pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const CustomerList = React.lazy(() => import("./pages/CustomerList"));
const CustomerForm = React.lazy(() => import("./pages/CustomerForm"));
const InvoiceList = React.lazy(() => import("./pages/InvoiceList"));
const InvoiceForm = React.lazy(() => import("./pages/InvoiceForm"));
const PaymentList = React.lazy(() => import("./pages/PaymentList"));
const PaymentForm = React.lazy(() => import("./pages/PaymentForm"));
const AnalyticsDashboard = React.lazy(() => import("./pages/AnalyticsDashboard"));
const ReportsPage = React.lazy(() => import("./pages/ReportsPage"));
const ExportsPage = React.lazy(() => import("./pages/ExportsPage"));
const ReminderList = React.lazy(() => import("./pages/ReminderList"));

function App() {
  const [theme, setTheme] = useState(
    window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <Router>
      <AppShell theme={theme} toggleTheme={toggleTheme}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route path="/customers/new" element={<CustomerForm mode="create" />} />
            <Route path="/customers/:id/edit" element={<CustomerForm mode="edit" />} />
            <Route path="/invoices" element={<InvoiceList />} />
            <Route path="/invoices/new" element={<InvoiceForm mode="create" />} />
            <Route path="/invoices/:id/edit" element={<InvoiceForm mode="edit" />} />
            <Route path="/payments" element={<PaymentList />} />
            <Route path="/payments/new" element={<PaymentForm mode="create" />} />
            <Route path="/payments/:id/edit" element={<PaymentForm mode="edit" />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/exports" element={<ExportsPage />} />
            <Route path="/reminders" element={<ReminderList />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </React.Suspense>
      </AppShell>
    </Router>
  );
}

export default App;
