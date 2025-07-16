import React, { useState, useEffect } from "react";
import { api } from "../api";
import { useNavigate, useParams } from "react-router-dom";

const emptyCustomer = { name: "", email: "", phone: "", address: "", gst_number: "" };

// PUBLIC_INTERFACE
export default function CustomerForm({ mode }) {
  const { id } = useParams();
  const [form, setForm] = useState(emptyCustomer);
  const [loading, setLoading] = useState(mode === "edit");
  const navigate = useNavigate();

  useEffect(() => {
    if (mode === "edit" && id) {
      api.getCustomer(id).then(data => setForm(data));
    }
  }, [mode, id]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return alert("Name required");
    if (mode === "create") await api.createCustomer(form);
    else await api.updateCustomer(id, form);
    navigate("/customers");
  }

  return (
    <div>
      <h2 className="page-title">{mode === "create" ? "Add Customer" : "Edit Customer"}</h2>
      <form className="card" onSubmit={handleSubmit} style={{maxWidth: 500, margin: "auto"}}>
        <label>Name*<input name="name" value={form.name} onChange={handleChange} required autoFocus /></label>
        <label>Email<input name="email" value={form.email} onChange={handleChange}/></label>
        <label>Phone<input name="phone" value={form.phone} onChange={handleChange}/></label>
        <label>Address<input name="address" value={form.address} onChange={handleChange}/></label>
        <label>GST Number<input name="gst_number" value={form.gst_number} onChange={handleChange}/></label>
        <button className="btn btn-large" type="submit" style={{marginTop: 20, minWidth: 120}}>
          {mode === "create" ? "Add" : "Update"}
        </button>
      </form>
    </div>
  );
}
