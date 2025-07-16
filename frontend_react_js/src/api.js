//
// API utility wrapping core endpoints for customer management and billing system.
//

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000"; // Override in .env if deployed

// Helper: simple parser for fetch responses
async function parseResponse(resp) {
  if (resp.status === 204) return null;
  try {
    const json = await resp.json();
    if (!resp.ok) throw new Error(json.detail ?? "API Error");
    return json;
  } catch (e) {
    throw new Error(`API error: ${resp.status}`);
  }
}

// PUBLIC_INTERFACE
export const api = {
  // Customers
  async listCustomers() {
    const resp = await fetch(`${BASE_URL}/customers`);
    return parseResponse(resp);
  },
  async getCustomer(id) {
    const resp = await fetch(`${BASE_URL}/customers/${id}`);
    return parseResponse(resp);
  },
  async createCustomer(data) {
    const resp = await fetch(`${BASE_URL}/customers`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async updateCustomer(id, data) {
    const resp = await fetch(`${BASE_URL}/customers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async deleteCustomer(id) {
    const resp = await fetch(`${BASE_URL}/customers/${id}`, { method: "DELETE" });
    return resp.status === 204;
  },

  // Invoices
  async listInvoices(customer_id) {
    const url = customer_id
      ? `${BASE_URL}/invoices?customer_id=${customer_id}`
      : `${BASE_URL}/invoices`;
    const resp = await fetch(url);
    return parseResponse(resp);
  },
  async getInvoice(id) {
    const resp = await fetch(`${BASE_URL}/invoices/${id}`);
    return parseResponse(resp);
  },
  async createInvoice(data) {
    const resp = await fetch(`${BASE_URL}/invoices`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async updateInvoice(id, data) {
    const resp = await fetch(`${BASE_URL}/invoices/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async deleteInvoice(id) {
    const resp = await fetch(`${BASE_URL}/invoices/${id}`, { method: "DELETE" });
    return resp.status === 204;
  },

  // Payments
  async listPayments({ customer_id, invoice_id } = {}) {
    let url = `${BASE_URL}/payments`;
    const params = [];
    if (customer_id) params.push(`customer_id=${customer_id}`);
    if (invoice_id) params.push(`invoice_id=${invoice_id}`);
    if (params.length) url += "?" + params.join("&");
    const resp = await fetch(url);
    return parseResponse(resp);
  },
  async getPayment(id) {
    const resp = await fetch(`${BASE_URL}/payments/${id}`);
    return parseResponse(resp);
  },
  async createPayment(data) {
    const resp = await fetch(`${BASE_URL}/payments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async updatePayment(id, data) {
    const resp = await fetch(`${BASE_URL}/payments/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async deletePayment(id) {
    const resp = await fetch(`${BASE_URL}/payments/${id}`, { method: "DELETE" });
    return resp.status === 204;
  },

  // Reminders
  async listReminders({ customer_id, status } = {}) {
    let url = `${BASE_URL}/reminders`;
    const params = [];
    if (customer_id) params.push(`customer_id=${customer_id}`);
    if (status) params.push(`status=${status}`);
    if (params.length) url += "?" + params.join("&");
    const resp = await fetch(url);
    return parseResponse(resp);
  },
  async createReminder(data) {
    const resp = await fetch(`${BASE_URL}/reminders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async updateReminder(id, data) {
    const resp = await fetch(`${BASE_URL}/reminders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return parseResponse(resp);
  },
  async deleteReminder(id) {
    const resp = await fetch(`${BASE_URL}/reminders/${id}`, { method: "DELETE" });
    return resp.status === 204;
  },

  // Analytics
  async frequentPurchases(customer_id) {
    let url = `${BASE_URL}/analytics/frequent-purchases`;
    if (customer_id) url += `?customer_id=${customer_id}`;
    const resp = await fetch(url);
    return parseResponse(resp);
  },
  // Reports
  async balanceSheet() {
    const resp = await fetch(`${BASE_URL}/balance-sheet`);
    return parseResponse(resp);
  },
  // Exports
  async exportBalanceSheet() {
    const resp = await fetch(`${BASE_URL}/exports/balance-sheet`);
    return parseResponse(resp);
  },
};
