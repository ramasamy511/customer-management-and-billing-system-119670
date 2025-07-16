import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "../api";

// Invoice item: product_name, quantity, unit_price, amount
function ItemRow({ idx, item, setItem, remove }) {
  function handleChange(e) {
    let { name, value } = e.target;
    if (name === "quantity" || name === "unit_price") value = Number(value);
    setItem(idx, { ...item, [name]: value, amount: (item.quantity || 0) * (item.unit_price || 0) });
  }
  return (
    <tr>
      <td><input name="product_name" value={item.product_name} placeholder="Product/Service" onChange={handleChange}/></td>
      <td><input name="quantity" type="number" value={item.quantity} min="0" style={{width:60}} onChange={handleChange}/></td>
      <td><input name="unit_price" type="number" value={item.unit_price} min="0" style={{width:80}} onChange={handleChange}/></td>
      <td>{item.amount || 0}</td>
      <td><button onClick={() => remove(idx)} style={{background:"#e91e63",color:"white"}}>Remove</button></td>
    </tr>
  );
}

/**
 * Invoice Form for create/edit mode.
 * @param {{mode: "create"|"edit"}} param0
 * @returns
 */
// PUBLIC_INTERFACE
export default function InvoiceForm({ mode }) {
  const { id } = useParams();
  const [form, setForm] = useState({
    customer_id: "", invoice_date: "", due_date: "", status: "", remark: "", items: [],
    total_amount: 0
  });
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    api.listCustomers().then(setCustomers);
    if (mode === "edit" && id) {
      api.getInvoice(id).then(inv => setForm({ ...inv, customer_id: String(inv.customer_id) }));
    }
  }, [mode, id]);

  function setItem(idx, item) {
    const updated = form.items.map((it, i) => i === idx ? item : it);
    setForm(f => ({
      ...f,
      items: updated,
      total_amount: updated.reduce((sum, it) => sum + (it.amount || 0), 0)
    }));
  }
  function addItem() {
    setForm(f => ({
      ...f,
      items: [...f.items, { product_name:"", quantity:0, unit_price:0, amount:0 }]
    }));
  }
  function remove(idx) {
    const updated = form.items.filter((_, i) => i !== idx);
    setForm(f => ({
      ...f,
      items: updated,
      total_amount: updated.reduce((sum, it) => sum + (it.amount || 0), 0)
    }));
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }
  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.customer_id || !form.invoice_date || !form.due_date || form.items.length === 0) {
      return alert("Please fill required fields.");
    }
    if (mode === "create") await api.createInvoice(form);
    else await api.updateInvoice(id, form);
    navigate("/invoices");
  }

  return (
    <div>
      <h2>{mode === "create" ? "New" : "Edit"} Invoice</h2>
      <form className="card" onSubmit={handleSubmit} style={{maxWidth:650,margin:"auto"}}>
        <label>
          Customer*
          <select name="customer_id" value={form.customer_id} onChange={handleChange} required>
            <option value="">Select</option>
            {customers.map(c=>(
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </label>
        <label>
          Invoice Date*
          <input name="invoice_date" type="date" value={form.invoice_date?.slice(0,10)} onChange={handleChange} required/>
        </label>
        <label>
          Due Date*
          <input name="due_date" type="date" value={form.due_date?.slice(0,10)} onChange={handleChange} required/>
        </label>
        <label>
          Status
          <input name="status" value={form.status} onChange={handleChange}/>
        </label>
        <label>
          Remark
          <input name="remark" value={form.remark} onChange={handleChange}/>
        </label>
        <table style={{width:"100%",background:"white",marginBottom:10}}>
          <thead>
            <tr>
              <th>Product/Service*</th><th>Qty*</th><th>Unit Price*</th><th>Amount</th><th></th>
            </tr>
          </thead>
          <tbody>
            {form.items.map((item, idx) => (
              <ItemRow key={idx} idx={idx} item={item} setItem={setItem} remove={remove}/>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn" onClick={addItem}>Add Item</button>
        <div style={{textAlign:"right",marginTop:"14px",fontWeight:700}}>
          Total: {form.total_amount}
        </div>
        <button type="submit" className="btn btn-large" style={{marginTop:20}}>Save</button>
      </form>
    </div>
  );
}
