import { useEffect, useState } from "react";

const empty = { name: "", email: "", phone: "", department: "" };

export default function EmployeeForm({ editing, onSubmit, onCancel, errors, saving }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    setForm(editing ? editing : empty);
  }, [editing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await onSubmit(form);
    if (ok) setForm(empty);
  };

  const fields = [
    { name: "name", label: "Full Name", type: "text" },
    { name: "email", label: "Email", type: "email" },
    { name: "phone", label: "Phone", type: "text" },
    { name: "department", label: "Department", type: "text" },
  ];

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>{editing ? "Update Employee" : "Add Employee"}</h2>

      {fields.map((f) => (
        <div className="field" key={f.name}>
          <label htmlFor={f.name}>{f.label}</label>
          <input
            id={f.name}
            name={f.name}
            type={f.type}
            value={form[f.name]}
            onChange={handleChange}
            placeholder={f.label}
          />
          {errors[f.name] && <small className="error">{errors[f.name][0]}</small>}
        </div>
      ))}

      <div className="actions">
        <button type="submit" className="btn primary" disabled={saving}>
          {saving ? "Saving..." : editing ? "Update" : "Create"}
        </button>
        {editing && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}