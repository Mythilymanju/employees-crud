import { useEffect, useState } from "react";
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "./api";
import EmployeeForm from "./components/EmployeeForm";
import EmployeeList from "./components/EmployeeList";
import "./App.css";

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [editing, setEditing] = useState(null);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [message, setMessage] = useState("");

  const loadEmployees = async () => {
    try {
      const res = await getEmployees();
      setEmployees(res.data);
    } catch {
      setMessage("Could not load employees. Is the Laravel server running?");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const flash = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleSubmit = async (data) => {
    setSaving(true);
    setErrors({});
    try {
      if (editing) {
        await updateEmployee(editing.id, data);
        flash("Employee updated successfully");
        setEditing(null);
      } else {
        await createEmployee(data);
        flash("Employee created successfully");
      }
      await loadEmployees();
      return true;
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      } else {
        flash("Something went wrong. Please try again.");
      }
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    try {
      await deleteEmployee(id);
      flash("Employee deleted successfully");
      if (editing?.id === id) setEditing(null);
      await loadEmployees();
    } catch {
      flash("Delete failed. Please try again.");
    }
  };

  const handleEdit = (emp) => {
    setErrors({});
    setEditing(emp);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filtered = employees.filter((e) =>
    [e.name, e.email, e.department].some((v) =>
      v.toLowerCase().includes(search.toLowerCase())
    )
  );

  return (
    <div className="container">
      <header>
        <h1>Employee Management System</h1>
       
      </header>

      {message && <div className="toast">{message}</div>}

      <EmployeeForm
        editing={editing}
        onSubmit={handleSubmit}
        onCancel={() => { setEditing(null); setErrors({}); }}
        errors={errors}
        saving={saving}
      />

      <div className="card">
        <div className="list-head">
          <h2>Employees ({filtered.length})</h2>
          <input
            className="search"
            placeholder="Search by name, email, department..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <EmployeeList
          employees={filtered}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}