import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "../api";

const emptyPayment = {
  customer_id: "", invoice_id: "", payment_date: "", mode: "", amount: 0, remark: ""
};

export default function PaymentForm({ mode }) {
  const { id } = useParams();
  const [form, setForm] = useState(emptyPayment);
  const [customers, setCustomers] = useState([]);
  const [invoices, setInvoices] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.listCustomers().then(setCustomers);
    api.listInvoices().then(setInvoices);
    if (mode === "edit" && id) {
      api.getPayment(id).then(data => setForm({ ...data, customer_id: String(data.customer_id) }));
    }
  }, [mode, id]);

  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "amount") value = Number(value);
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.customer_id || !form.payment_date || !form.amount || !form.mode) {
      return alert("Fill required fields");
    }
    if (mode === "create") await api.createPayment(form);
    else await api.updatePayment(id, form);
    navigate("/payments");
  }

  return (
    <div>
      <h2>{mode==="create" ? "Add" : "Edit"} Payment</h2>
      <form className="card" onSubmit={handleSubmit} style={{maxWidth:500,margin:"auto"}}>
        <label>
          Customer*
          <select name="customer_id" value={form.customer_id} onChange={handleChange} required>
            <option value="">Select</option>
            {customers.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </label>
        <label>
          Invoice
          <select name="invoice_id" value={form.invoice_id ?? ""} onChange={handleChange}>
            <option value="">None</option>
            {invoices.map(i => <option key={i.id} value={i.id}>{i.id}</option>)}
          </select>
        </label>
        <label>
          Date*
          <input name="payment_date" type="date" value={form.payment_date?.slice(0,10) || ""} onChange={handleChange} required/>
        </label>
        <label>
          Payment Mode*
          <input name="mode" value={form.mode} onChange={handleChange} required/>
        </label>
        <label>
          Amount*
          <input name="amount" type="number" value={form.amount} min="0" onChange={handleChange} required/>
        </label>
        <label>
          Remark
          <input name="remark" value={form.remark} onChange={handleChange}/>
        </label>
        <button className="btn btn-large" type="submit" style={{marginTop:20}}>Save</button>
      </form>
    </div>
  );
}
