import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import {
  fetchCustomers,
  fetchInvoices,
  createInvoice,
  updateInvoice,
  fetchInvoiceById,
  fetchPayments,
  recordPayment,
  fetchDashboardOverview,
  fetchTopBuyers,
  fetchTopProducts,
  fetchFrequentPurchases,
  fetchBalanceSheet,
  exportBalanceToPDF,
  exportBalanceToExcel,
  sendPaymentReminders
} from "../api";

import { CustomerList, CustomerEdit, CustomerView } from "./customers";
import { InvoiceList, InvoiceCreate, InvoiceView } from "./billing";
import { PaymentEntry, PaymentMethods } from "./payments";
import { BalanceSheetView, ExportToPDF, ExportToExcel } from "./balance";
import { Dashboard, TopBuyers, TopProducts, FrequentPurchase } from "./analytics";
import { RemindersSend } from "./reminders";

// --- Customers Module ---
function CustomersModule() {
  // Example wiring for navigation between views is up to the final use
  const [page, setPage] = useState("list"); // "list" | "edit" | "view"
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  // Load all customers
  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);

  // View details
  const handleView = id => {
    setViewId(id);
    setPage("view");
    setSelectedCustomer(customers.find(c => c.id === id));
  };

  // Edit details
  const handleEdit = id => {
    setEditId(id);
    setPage("edit");
    setSelectedCustomer(customers.find(c => c.id === id));
  };

  // Save handler (create/update)
  const handleSave = async data => {
    if (editId) {
      await updateInvoice(editId, data);
    } else {
      await createInvoice(data);
    }
    setPage("list");
    fetchCustomers().then(setCustomers);
  };

  if (page === "edit") {
    return (
      <CustomerEdit
        customer={selectedCustomer}
        onSave={handleSave}
        onCancel={() => setPage("list")}
      />
    );
  }
  if (page === "view") {
    return (
      <CustomerView
        customer={selectedCustomer}
        onEdit={handleEdit}
        onBack={() => setPage("list")}
      />
    );
  }
  return (
    <CustomerList
      onView={handleView}
      onEdit={handleEdit}
    />
  );
}

// --- Billing / Invoices Module ---
function InvoicesModule() {
  const [page, setPage] = useState("list");
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // For "create" invoice form: fetch customers
  const [customers, setCustomers] = useState([]);
  useEffect(() => {
    fetchInvoices().then(setInvoices);
    fetchCustomers().then(setCustomers);
  }, []);

  const handleView = id => {
    fetchInvoiceById(id).then(inv => {
      setSelectedInvoice(inv);
      setPage("view");
    });
  };

  const handleCreate = () => setPage("create");

  const handleSave = async (form) => {
    await createInvoice(form);
    fetchInvoices().then(setInvoices);
    setPage("list");
  };

  if (page === "create") {
    return (
      <InvoiceCreate
        customers={customers}
        onSave={handleSave}
        onCancel={() => setPage("list")}
      />
    );
  }
  if (page === "view") {
    return (
      <InvoiceView
        invoice={selectedInvoice}
        onBack={() => setPage("list")}
      />
    );
  }
  return (
    <InvoiceList
      invoices={invoices}
      onCreate={handleCreate}
      onView={handleView}
    />
  );
}

// --- Payments Module ---
function PaymentsModule() {
  const [page, setPage] = useState("entry");
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchCustomers().then(setCustomers);
    fetchInvoices().then(setInvoices);
    fetchPayments().then(setPayments);
  }, []);

  const handleSavePayment = async (data) => {
    await recordPayment(data);
    fetchPayments().then(setPayments);
    setPage("entry");
  };

  // Could allow payment method management as separate tab in future
  return (
    <>
      <PaymentEntry
        customers={customers}
        invoices={invoices}
        onSave={handleSavePayment}
        onCancel={() => setPage("entry")}
      />
      {/* Could show a table of recent payments here */}
      {/* <PaymentList payments={payments} /> */}
      {/* Could have PaymentMethods tab in future */}
    </>
  );
}

// --- Balance Sheet Module ---
function BalanceSheetModule() {
  const [balances, setBalances] = useState([]);
  useEffect(() => {
    fetchBalanceSheet().then(setBalances);
  }, []);

  const handleExportPDF = () => {
    exportBalanceToPDF().then((res) => {
      // Handle res (likely a binary or URL for download); this is scaffold logic.
      alert("Balance Sheet PDF export triggered (see backend output)");
    });
  };
  const handleExportExcel = () => {
    exportBalanceToExcel().then((res) => {
      alert("Balance Sheet Excel export triggered (see backend output)");
    });
  };
  return (
    <BalanceSheetView
      balances={balances}
      onExportPDF={handleExportPDF}
      onExportExcel={handleExportExcel}
    />
  );
}

// --- Analytics Dashboard Module ---
function AnalyticsModule() {
  const [overview, setOverview] = useState(null);
  const [topBuyers, setTopBuyers] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [frequent, setFrequent] = useState([]);
  useEffect(() => {
    fetchDashboardOverview().then(setOverview);
    fetchTopBuyers().then(setTopBuyers);
    fetchTopProducts().then(setTopProducts);
    fetchFrequentPurchases().then(setFrequent);
  }, []);
  return (
    <div>
      <Dashboard overview={overview} />
      <TopBuyers buyers={topBuyers} />
      <TopProducts products={topProducts} />
      <FrequentPurchase purchases={frequent} />
    </div>
  );
}

// --- Reminders Module ---
function RemindersModule() {
  const [customers, setCustomers] = useState([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);
  const handleSendReminders = async (ids) => {
    await sendPaymentReminders(ids);
    setSent(true);
    setTimeout(() => setSent(false), 2000);
  };
  return (
    <div>
      <RemindersSend customers={customers} onSendReminders={handleSendReminders} />
      {sent && <div style={{ color: "green", marginTop: 12 }}>Reminders sent!</div>}
    </div>
  );
}

// PUBLIC_INTERFACE
export const appRoutes = [
  { path: "/customers", label: "Customers", element: <CustomersModule /> },
  { path: "/invoices", label: "Billing", element: <InvoicesModule /> },
  { path: "/payments", label: "Payments", element: <PaymentsModule /> },
  { path: "/balance", label: "Balance", element: <BalanceSheetModule /> },
  { path: "/analytics", label: "Analytics", element: <AnalyticsModule /> },
  { path: "/reminders", label: "Reminders", element: <RemindersModule /> },
];

// PUBLIC_INTERFACE
function AppRouter() {
  /** Defines all main app routes based on appRoutes array */
  return (
    <Routes>
      {appRoutes.map((route) => (
        <Route key={route.path} path={route.path} element={route.element} />
      ))}
      <Route path="*" element={<CustomersModule />} />
    </Routes>
  );
}

export default AppRouter;
