//
// Centralized API module for all backend requests.
// Exports PUBLIC_INTERFACE functions for CRUD and reporting
//
// PUBLIC_INTERFACE

const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8000"; // Adjust as needed

async function apiRequest(path, { method = "GET", body, headers = {}, params } = {}) {
  // Query string for GETs
  let url = API_BASE + path;
  if (params && typeof params === "object") {
    const usp = new URLSearchParams(params);
    url += "?" + usp.toString();
  }
  const opts = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...headers
    }
  };
  if (body) opts.body = JSON.stringify(body);

  const resp = await fetch(url, opts);
  if (!resp.ok) {
    const text = await resp.text();
    throw new Error(`API error (${resp.status}): ${text}`);
  }
  if (resp.status === 204) return null;
  // Try to parse JSON, fallback to text
  const ct = resp.headers.get("content-type") || "";
  if (ct.includes("application/json")) return await resp.json();
  return await resp.text();
}

// ========== Customers ==========

// PUBLIC_INTERFACE
export async function fetchCustomers(params) {
  return apiRequest("/customers/", { params });
}

// PUBLIC_INTERFACE
export async function fetchCustomerById(id) {
  return apiRequest(`/customers/${id}`, {});
}

// PUBLIC_INTERFACE
export async function createCustomer(data) {
  return apiRequest("/customers/", { method: "POST", body: data });
}

// PUBLIC_INTERFACE
export async function updateCustomer(id, data) {
  return apiRequest(`/customers/${id}`, { method: "PUT", body: data });
}

// PUBLIC_INTERFACE
export async function deleteCustomer(id) {
  return apiRequest(`/customers/${id}`, { method: "DELETE" });
}

// ========== Invoices ==========

// PUBLIC_INTERFACE
export async function fetchInvoices(params) {
  return apiRequest("/invoices/", { params });
}

// PUBLIC_INTERFACE
export async function fetchInvoiceById(id) {
  return apiRequest(`/invoices/${id}`, {});
}

// PUBLIC_INTERFACE
export async function createInvoice(data) {
  return apiRequest("/invoices/", { method: "POST", body: data });
}

// PUBLIC_INTERFACE
export async function updateInvoice(id, data) {
  return apiRequest(`/invoices/${id}`, { method: "PUT", body: data });
}

// PUBLIC_INTERFACE
export async function deleteInvoice(id) {
  return apiRequest(`/invoices/${id}`, { method: "DELETE" });
}

// ========== Payments ==========

// PUBLIC_INTERFACE
export async function fetchPayments(params) {
  return apiRequest("/payments/", { params });
}

// PUBLIC_INTERFACE
export async function fetchPaymentById(id) {
  return apiRequest(`/payments/${id}`, {});
}

// PUBLIC_INTERFACE
export async function recordPayment(data) {
  return apiRequest("/payments/", { method: "POST", body: data });
}

// ========== Analytics/Dashboard ==========

// PUBLIC_INTERFACE
export async function fetchDashboardOverview() {
  return apiRequest("/analytics/dashboard", {});
}

// PUBLIC_INTERFACE
export async function fetchTopBuyers(params) {
  return apiRequest("/analytics/top-buyers", { params });
}

// PUBLIC_INTERFACE
export async function fetchTopProducts(params) {
  return apiRequest("/analytics/top-products", { params });
}

// PUBLIC_INTERFACE
export async function fetchFrequentPurchases(params) {
  return apiRequest("/analytics/frequent-purchases", { params });
}

// ========== Balance Sheet & Exports ==========

// PUBLIC_INTERFACE
export async function fetchBalanceSheet(params) {
  return apiRequest("/balance/", { params });
}

// PUBLIC_INTERFACE
export async function exportBalanceToPDF(params) {
  return apiRequest("/exports/balance/pdf", { params });
}

// PUBLIC_INTERFACE
export async function exportBalanceToExcel(params) {
  return apiRequest("/exports/balance/excel", { params });
}

// ========== Reminders ==========

// PUBLIC_INTERFACE
export async function sendPaymentReminders(customerIds) {
  return apiRequest("/reminders/send", { method: "POST", body: { customer_ids: customerIds } });
}

